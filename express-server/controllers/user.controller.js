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