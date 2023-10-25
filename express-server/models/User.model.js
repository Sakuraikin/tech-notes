const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [8, "Username must be at least 8 characters"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [12, "Password must be at least 12 characters"]
    },
    roles: [{
        type: String,
        default: "employee"
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)