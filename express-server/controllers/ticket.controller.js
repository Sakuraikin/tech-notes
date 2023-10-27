const Ticket = require('../models/Ticket.model')
const User = require('../models/User.model')
const asyncHandler = require('express-async-handler')

// @desc Get all tickets
// @route GET /tickets
// @access Private
const getAllTickets = asyncHandler(async(req, res) => {
    const allTickets = await Ticket.find().lean()
    if (!allTickets?.length) {
        return res.status(400).json({message: "No tickets exist yet"})
    }

    const allTicketsWithUser = await Promise.all(
        allTickets.map(async(ticket) => {
            const user = await User.findById(ticket.user).lean().exec()
            return {...ticket, username: user.username}
        })
    )

    res.json(allTicketsWithUser)
})

// @desc Create a ticket
// @route POST /tickets
// @access Private
const createTicket = asyncHandler(async(req, res) => {
    // Get user, title, and body from 'create ticket' form
    const { user, title, body } = req.body

    // Ensure ticket title doesn't already exist
    const potentialTicket = await Ticket.findOne({ title }).lean().exec()
    if (potentialTicket) {
        res.status(409).json({message: "Ticket title is already in use"})
    }
    // Create new ticket and include it in response
    const newTicket = await Ticket.create({user, title, body})
    if (newTicket) {
        return res.status(201).json(newTicket)
    }
    // If ticket can't be created, respond with 400 bad request
    res.status(400).json({message: "Ticket could not be created"})
})

// @desc Update ticket
// @route PATCH /tickets
// @access Private
const updateTicket = asyncHandler(async(req, res) => {

})

// @desc Delete ticket
// @route DELETE /tickets
// @access Private
const removeTicket = asyncHandler(async(req, res) => {

})

module.exports = {
    getAllTickets,
    createTicket,
    updateTicket,
    removeTicket
}