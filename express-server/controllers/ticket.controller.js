const Ticket = require('../models/Ticket.model')
const User = require('../models/User.model')
const asyncHandler = require('express-async-handler')
const validator = require('../validations/ticket.validations')

// @desc Get all tickets
// @route GET /tickets
// @access Private
const getAllTickets = asyncHandler(async(req, res) => {

    // Query DB for all tickets
    const allTickets = await Ticket.find().lean()

    // Ensure tickets exist; if they dont, return 400 bad req
    if (!allTickets?.length) {
        return res.status(400).json({message: "No tickets exist yet"})
    }

    // Map over tickets and pull each ticket's user, returning each ticket along with it's user's username
    const allTicketsWithUser = await Promise.all(
        allTickets.map(async(ticket) => {
            const user = await User.findById(ticket.user).lean().exec()
            return {...ticket, username: user.username}
        })
    )
    
    // send response with tickets and their users
    res.status(200).json(allTicketsWithUser)
})

// @desc Create a ticket
// @route POST /tickets
// @access Private
const createTicket = asyncHandler(async(req, res) => {
    try {
        const { user, title, body } = req.body

        // Validate data
        validator.user(user, res)
        validator.title(title, res)
        validator.body(body, res)

        // Ensure ticket title doesn't already exist
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
            // Update user's tickets by pushing newly created ticket id into their tickets[] array
            try {
                // Ensure user exists
                const user = await User.findOne({_id: req.body.user})

                // If user exists, create new ticket
                if (user) {
                    const newTicket = await Ticket.create(req.body)

                    // Update ticket's user by pushing the new ticket's id into it's user's tickets[] array
                    await User.findOneAndUpdate( {_id: req.body.user}, {$push: {tickets: newTicket}})

                    // Send back response with new Ticket
                    return res.status(201).json(newTicket)
                } else {
                    // If user from req.body.user can't be found
                    return res.status(400).json({message: "Specified user ID doesn't exist"})
                }
                // If ticket was able to be created but wasn't related to a user (shouldn't be possible anyway, but just making sure)
            }  catch(err) {
                res.status(400).json({message: "Ticket was created, but couldn't be related to a User", error: err})
            }
        }
    // If ticket was unable to be created
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

    // Validate all fields using functions from ticket.validations.js
    validator.id(id, res)
    validator.user(user, res)
    validator.title(title, res)
    validator.body(body, res)
    validator.isComplete(isComplete, res)

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

    // Save update(s) to ticket and respond with a success message and the updated ticket
    const updatedTicket = await ticket.save()
    res.status(200).json({message: `${updatedTicket.title} updated successfully`, updatedTicket})
})


// @desc Delete ticket
// @route DELETE /tickets
// @access Private 
const removeTicket = asyncHandler(async(req, res) => {
    try {
        // Pull id from request body
        const { id } = req.body

        // Only attempt to fetch ticket if id is provided
        if (id) {
            const ticket = await Ticket.findById(id)

            // If ticket is found, remove it's reference from the user's tickets array
            if (ticket) {
                await User.findOneAndUpdate({_id: ticket.user},
                    {$pull: {
                        tickets: ticket._id
                    }})

                // Delete ticket
                const result = await ticket.deleteOne()
                const reply = `Ticket "${result.title}" with ID ${result._id} has been deleted successfully`
                res.status(200).json(reply)
            } else {
                // If ticket id is provided but no match is found
                return res.status(400).json({message: "Ticket not found"})
            }
        } else {
            // If no ticket id is provided
            return res.status(400).json({message: "Ticket ID is required"})
        }
    } catch(err) {
        console.log(err)
    }
})

module.exports = {
    getAllTickets,
    updateTicket,
    removeTicket,
    createTicket
}