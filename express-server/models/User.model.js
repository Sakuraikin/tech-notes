const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String
    },
    roles: {
        type: [String],
        default: ["employee"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    }]
}, {timestamps: true})

// * Mongoose Middleware
// Set virtual confirmPassword field to value in form input
// UserSchema.virtual('confirmPassword')

    // .get(function() {
    //     return this.confirmPassword
    // })
    // .set(function(val) {
    //     this.confirmPassword = val
    // })

// Validate that passwords match
// ! Remember to re-enable confirmPassword validation after form is connected
// ! confirmPassword is undefined without connected form
// ToDo: check response code for non-matching confirmPassword values
// UserSchema.pre('validate', function(next) {
//     if (this.password !== this.confirmPassword) {
//         this.invalidate(('confirmPassword', 'Passwords must match'))
//     }
//     next()
// })

// Hash password and reset password value to hash value before saving
UserSchema.pre('save', async function(next) {
    const hash = bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

module.exports = mongoose.model('user', UserSchema)