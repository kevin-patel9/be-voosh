const User = require("../models/UserModel");

exports.register = async (req, res) => {
    try {
        const { name, userId, password } = req.body;

        // Check if userId already exists
        const checkUserIdExist = await User.findOne({ userId: userId.toLowerCase() });

        if (checkUserIdExist) {
            return res.status(400).send({
                message: "User already exists. Try another unique User ID",
            });
        }

        // Create new user object
        const newUser = new User({
            userId: userId.toLowerCase(),
            name,
            password,
        });

        // Save new user to database
        await newUser.save();

        return res.status(201).send({
            message: "New user created successfully"
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { userId, password } = req.body;

        // Find user by userId
        const user = await User.findOne({ userId: userId.toLowerCase() }).select("+password");

        if (!user) {
            return res.status(400).send({
                message: "User does not exist",
            });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).send({
                message: "Incorrect password",
            });
        }

        // Clear the password before sending the response
        user.password = undefined;

        // Generate token
        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        // Send token in a cookie
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