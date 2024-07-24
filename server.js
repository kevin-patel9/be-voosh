const { connectDatabase } = require("./config/database");
const express = require("express");
const { json, urlencoded } = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require('dotenv').config({ path: "./config/config.env" });

// middlewares
app.use(cors({ origin: "*"}));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

connectDatabase();

const user = require("./routes/UserRoute");
const task = require("./routes/TaskRoute");

app.get("/", (req, res) => {
    return res.status(200).send("API is running");
});

app.use("/api/v1/user", user);
app.use("/api/v1/task", task);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
