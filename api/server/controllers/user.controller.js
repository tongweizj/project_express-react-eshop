import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';

// Create a new user
const create = async (req, res) => {
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                error: 'Email already exists',
            });
        }

        const user = new User(req.body);
        await user.save();
        return res.status(200).json({
            message: "User successfully created!",
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

// Get list of all users
const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created');
        res.json(users);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

// Middleware to get user by ID
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if (!user)
            return res.status(400).json({
                error: "User not found",
            });
        req.profile = user;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve user",
        });
    }
};

// Read user info
const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

// Update user info
const update = async (req, res) => {
    try {
        let user = req.profile;
        user = extend(user, req.body);
        user.updated = Date.now();
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

// Delete a user and their listings
const remove = async (req, res) => {
    try {
        let user = req.profile;
        await Listing.deleteMany({ postedBy: user._id });
        let deletedUser = await user.deleteOne();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

// Reset password to a default value
const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.password = "123456789"; // Triggers the virtual field setter
        user.updated = Date.now();
        await user.save();

        res.json({ message: "Password reset successfully to 123456789" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Could not reset password" });
    }
};

// Delete all users and their listings
const removeAll = async (req, res) => {
    try {
        const users = await User.find().select('_id');
        const userIds = users.map((user) => user._id);
        await User.deleteMany();

        await Listing.deleteMany({ postedBy: { $in: userIds } });

        res.json({
            message: "Successfully deleted all users and their associated listings",
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

export default { create, userByID, read, list, remove, update, removeAll, resetPassword };
