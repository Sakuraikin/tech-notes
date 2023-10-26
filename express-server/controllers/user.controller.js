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

})


// @desc Create a user
// @route POST /users
// @access Private
const createUser = asyncHandler(async (req, res) => {
    
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