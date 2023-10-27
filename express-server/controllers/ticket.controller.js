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
    const { id, user, title, body, isComplete } = req.body
    if (!id || typeof isComplete !== 'boolean') {
        return res.status(400).json({message: "All ticket fields are required"})
    }

    // Ensure that ticket exists before trying to update
    const ticket = await Ticket.findById(id).exec()
    if (!ticket) {
        return res.status(400).json({message: "Specified ticket doesn't exist"})
    }

    // Ensure ticket title isn't taken
    const potentialUpdatedTicket = await Ticket.findOne({title}).lean().exec()
    
    // Allow only original ticket to be modified
    if (potentialUpdatedTicket && potentialUpdatedTicket?._id.toString() !== id) {
        return res.status(409).json({message: "Ticket title is already in use"})
    }

    // Update ticket with new values from form
    ticket.user = user
    ticket.title = title
    ticket.body = body
    ticket.isComplete = isComplete

    // Save update(s) to ticket and respond with a message and the updated ticket
    const updatedTicket = await ticket.save()
    res.status(200).json({message: `${updatedTicket.title} updated successfully`, updatedTicket})
})

// @desc Delete ticket
// @route DELETE /tickets
// @access Private
const removeTicket = asyncHandler(async(req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({message: "Ticket ID is required"})
    }
    const ticket = await Ticket.findById(id).exec()
    if (!ticket) {
        return res.status(400).json({message: "Ticket not found"})
    }

    const result = await ticket.deleteOne()
    const reply = `Ticket ${result.title} with ID ${result._id}`
    res.json(reply)
})

module.exports = {
    getAllTickets,
    createTicket,
    updateTicket,
    removeTicket
}