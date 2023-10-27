const express = require("express")
const router = express.Router()
const TicketController = require('../controllers/user.ticket')

router.route('/')
    .get(TicketController.getAllTickets)
    .post(TicketController.createTicket)
    .patch(TicketController.updateTicket)
    .delete(TicketController.removeTicket)

module.exports = router