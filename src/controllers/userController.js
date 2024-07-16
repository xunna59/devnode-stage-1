const UserModel = require('../models/userModel');
const { validationResult } = require('express-validator');
const userModel = new UserModel();


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
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
}

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


async function updateUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }

    const userId = req.params.id;
    const userData = req.body;

    try {
        const user = await userModel.getUserById(userId);
        if (!user) {
            const error = new Error('User does not exist.');
            error.statusCode = 404;
            throw error;
        }

        const result = await userModel.updateUser(userData, userId);
        res.status(200).json({ success: true, message: 'User updated successfully', id: userId });
    } catch (error) {
        next(error);
    }
}

async function deleteUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }

    const userId = req.params.id;

    try {
        const user = await userModel.getUserById(userId);
        if (!user) {
            const error = new Error('User does not exist.');
            error.statusCode = 404;
            throw error;
        }

        const result = await userModel.deleteUser(userId);
        res.status(200).json({ success: true, message: 'User dleted successfully' });
    } catch (error) {
        next(error);
    }

}





module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
