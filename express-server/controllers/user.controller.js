const User = require('../models/User.model')
const SECRET_KEY = process.env.SECRET_KEY
const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')