const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const UserSchema = new Schema({

}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)