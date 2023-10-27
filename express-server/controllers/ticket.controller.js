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
    res.json(allUsers)
})

// @desc Create a ticket
// @route POST /tickets
// @access Private
const createTicket = asyncHandler(async(req, res) => {

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