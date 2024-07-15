const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /users - Retrieve all users
router.get('/', userController.getAllUsers);

// GET /users/:id - Retrieve specific user by ID
router.get('/:id',
    param('id').isInt().withMessage('ID must be an integer'),
    userController.getUserById
);

// POST /users - Create a new user
router.post('/',
    body('first_name').notEmpty().withMessage('First Name is required'),
    body('last_name').notEmpty().withMessage('Last Name is required'),
    body('email').isEmail().withMessage('Email is required'),
    userController.createUser
);

module.exports = router;
