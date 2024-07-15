const UserModel = require('../models/userModel');
const { validationResult } = require('express-validator');
const userModel = new UserModel();

// Retrieve all users
async function getAllUsers(req, res, next) {
    try {
        const { rows } = await userModel.getAllUsers();
        res.json({
            success: true,
            message: 'Users retrieved successfully',
            total: rows.length,
            data: rows
        });
    } catch (error) {
        next(error);
    }
}

// Retrieve specific user by ID
async function getUserById(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    const userId = req.params.id;
    try {
        const { user } = await userModel.getUserById(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
}

// Create a new user
async function createUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }

    const userData = req.body;
    try {
        const { id } = await userModel.createUser(userData);
        res.status(201).json({ success: true, message: 'User created successfully', id });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser
};
