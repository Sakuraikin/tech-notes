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
    if (!allUsers?.length) {
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
        res.status(201).json({message: `New user ${username} created`,
        createdUser: {
            id: newUser._id,
            username: newUser.username,
            roles: newUser.roles,
            isActive: newUser.isActive,
            createdAt: newUser.createdAt
        }
    })
    } else {
        res.status(400).json({message: "User could not be created"})
    }
})


// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, isActive, password } = req.body

    // Validate data that isn't already validated in mongoose model
    if (!id || !Array.isArray(roles) || !roles.length || typeof isActive !== 'boolean'){
        return res.status(400).json({message: "All fields are required"})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({message: "Specified user doesn't exist"})
    }

    // Make sure duplicates don't exist
    const potentialUpdatedUser = await User.findOne({ username }).lean().exec()

    // Only allow updates to original user
    if (potentialUpdatedUser && potentialUpdatedUser?._id.toString() !== id) {
        return res.status(409).json({message: "Someone else is using that username. Please try again."})
    }

    user.username = username
    user.roles = roles
    user.isActive = isActive
    user.password = password

    const updatedUser = await user.save()

    res.status(200).json({message: `${updatedUser.username} updated successfully`, updatedUser: {
        _id: updatedUser.id,
        username: updatedUser.username,
        roles: updatedUser.roles,
        isActive: updatedUser.isActive,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt
    }})
})


// @desc Remove a user
// @route DELETE /users
// @access Private
const removeUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({message: "User ID is required"})
    }
    const ticket = await Ticket.findOne({
        user: id
    }).lean().exec()

    if (ticket) {
        return res.status(400).json({message: "Unable to delete users with open tickets assigned"})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({message: "User not found"})
    }

    const result = await user.deleteOne()
    const reply = `Username ${result.username} deleted successfully`
    res.status(200).json(reply)
})

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    removeUser
}