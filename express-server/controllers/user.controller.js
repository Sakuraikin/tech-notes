const User = require('../models/User.model')
const Ticket = require('../models/Ticket.model')
const SECRET_KEY = process.env.SECRET_KEY
const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')

module.exports.registerUser = async (req, res) => {
    try {
        if (potentialUser) {
            res.status(418).json({error: {
                errors: {
                    username: {
                        message: "This username already exists! Please log in."
                    }
                }
            }})
        } else {
            const newUser = await User.create(req.body)
            const userToken = jsonWebToken.sign({_id: newUser._id}, SECRET_KEY, {expiresIn: '2h'})
            res.status(201).cookie('userToken', userToken, {httpOnly: true, secure: true, sameSite: 'strict', maxAge: 2 * 60 * 60 * 1000}).json(newUser)
        }
    } catch(err) {
        res.status(400).json({error: err, message: "User could not be created"})
    }
}