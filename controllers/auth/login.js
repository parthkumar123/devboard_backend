"user strict";
const User = require("../../models/users");
const bcrypt = require("bcrypt");

// Handle user login
async function handleUserLogin(req, res) {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });

        // If the user doesn't exist, return an error
        if (!user) {
            return res.status(401).send("User not found.");
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Passwords match
            res.send({
                status: 'success',
                message: 'User logged in successfully.',
                user: {
                    id: user._id,
                    username: user.username,
                }
            });
        } else {
            // Passwords don't match
            res.status(401).send({
                status: 'error',
                message: 'Invalid password. Please try again.',
            });
        }
    } catch (error) {
        // Handle errors
        res.status(500).send({
            status: 'error',
            message: 'An error occurred while logging in the user.'
        });
    }
}

module.exports = {
    handleUserLogin,
}