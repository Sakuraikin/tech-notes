const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const TicketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxLength: [64, 'Title must be 64 characters or less']
    },
    body: {
        type: String,
        required: [true, "Ticket body is required"],
        minLength: [12, "Ticket body must be at least 12 characters"],
        maxLength: [220, "Ticket body must be 220 characters or less"]
    },
    isComplete: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

TicketSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: ticketNums,
    start_seq: 4269
})

module.exports = mongoose.model('ticket', TicketSchema)