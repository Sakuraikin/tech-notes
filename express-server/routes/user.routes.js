const express = require("express")
const router = express.Router()
const UserController = require('../controllers/user.controller')

router.route('/')
    .get(UserController.getAllUsers)
    .post(UserController.createUser)
    .patch(UserController.updateUser)
    .delete(UserController.removeUser)

module.exports = router