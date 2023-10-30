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
    try {
        const { user, title, body } = req.body
        if (!user || !title || !body){
            res.status(400).json({message: "All fields are required"})
        }
        const potentialTicket = await Ticket.findOne({ title })
        if (potentialTicket) {
            return res.status(409).json({error: {
                errors: {
                    title: {
                        message: "That ticket title already exists. Please choose a different title."
                    }
                }
            }})
        } else {
            // Update user's tickets by pushing newly created ticket into their tickets array
            try {
                const user = await User.findOne({_id: req.body.user})
                if (user) {
                    const newTicket = await Ticket.create(req.body)
                    await User.findOneAndUpdate( {_id: req.body.user}, {$push: {tickets: newTicket}})

                    // Send back response with new Ticket
                    return res.status(201).json(newTicket)
                } else {
                    return res.status(400).json({message: "Specified user ID doesn't exist"})
                }

            }  catch(err) {
                console.log(err)
                res.status(400).json({message: "Ticket was created, but couldn't be related to a User", error: err})
            }
        }
    } catch(err) {
        console.log(err)
        res.status(400).json({message: "Unable to create ticket", error: err})
    }
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
    updateTicket,
    removeTicket,
    createTicket
}