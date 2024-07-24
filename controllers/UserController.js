const User = require("../models/UserModel");

exports.register = async (req, res) => {
    try {
        const { name, userId, password } = req.body;

        const checkUserIdExist = await User.findOne({ userId });

        if (checkUserIdExist) {
            return res.status(400).send({
                message: "User already exist. Try another unique User ID",
            });
        }

        const newUser = {
            userId: userId.toLowerCase(),
            name,
            // avatar,
            password,
        };

        await User.create(newUser);

        return res.status(200).send({
            message: "New user created successfully"
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        let { userId, password } = req.body;

        userId = userId.toLowerCase();

        const user = await User.findOne({ userId }).select("+password");
        if (!user) {
            return res.status(400).send({
                message: "User does not exist",
            });
        }
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).send({
                message: "incorrect password",
            });
        }

        user.password = "";

        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000),
        };
        return res.status(200).cookie("token", token, options).send({
            user,
            token,
        });
    } catch (err) {
            return res.status(500).send({
            message: err.message,
        });
    }
};
