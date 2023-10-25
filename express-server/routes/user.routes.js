const UserController = require('../controllers/user.controller')

module.exports = app => {
    app.post('/api/users/new', UserController.registerUser)
}