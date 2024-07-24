const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Please enter user ID"],
        index: true,
    },
    name: String,
    avatar: String,
    password: {
        type: String,
        required: [true, "Please enter a password"],
        select: false,
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.KEY);
};

module.exports = mongoose.model("User", userSchema);
