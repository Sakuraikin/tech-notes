const User = require('../models/User.model')
const Ticket = require('../models/Ticket.model')
const SECRET_KEY = process.env.SECRET_KEY
const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const allUsers = await User.find().select('-password').lean()
    if (!allUsers) {
        return res.status(400).json({message: "No users exist yet"})
    }
    res.json(allUsers)
})


// @desc Create a user
// @route POST /users
// @access Private
const createUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body

    // Confirm Data
    // ! Validations already built into mongoose model
    
    // Ensure user doesn't already exist
    const potentialUser = await User.findOne({username}).lean().exec()
    if (potentialUser) {
        return res.status(409).json({message: "Username already exists. Please log in to continue."})
    }

    // Hash password before sending
    // ! Password hashing built into mongoose model ( .pre() middleware )

    const newUser = await User.create({ username, password, roles })
    if (newUser) {
        res.status(201).json({message: `New user ${username} created`})
    } else {
        res.status(400).json({message: "User could not be created"})
    }
})


// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    
})


// @desc Remove a user
// @route DELETE /users
// @access Private
const removeUser = asyncHandler(async (req, res) => {
    
})

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    removeUser
}