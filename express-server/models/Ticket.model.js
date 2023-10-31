const mongoose = require('mongoose')
const autoIncrement = require('mongoose-plugin-autoinc')

const TicketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    body: {
        type: String
    },
    isComplete: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

TicketSchema.plugin(autoIncrement.autoIncrement, {
    model: 'Ticket',
    field: 'ticketNums',
    startAt: 4269
})

module.exports = mongoose.model('ticket', TicketSchema)