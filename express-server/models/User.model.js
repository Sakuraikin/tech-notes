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

// * Mongoose Middleware
// Set virtual confirmPassword field to value in form input
UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set(val => this.confirmPassword = val)

// Validate that passwords match
UserSchema.pre('validate', (next) => {
    if (this.password !== this.confirmPassword) {
        this.invalidate(('confirmPassword', 'Passwords must match'))
    }
    next()
})

// Save User
UserSchema.pre('save', (next) => {
    bcrypt.hash(this.password, 10)
        .then((hash) => {
            this.password = hash
            next()
        })
})

module.exports = mongoose.model('User', UserSchema)