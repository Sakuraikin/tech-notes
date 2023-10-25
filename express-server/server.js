// package & function imports
require('dotenv').config()
require('./config/mongoose.config')
const https = require('https')
const fs = require('fs')
const express = require("express")
const app = express()
const path = require("path")
const { eventLogger } = require('./middleware/eventLogger')
const errorHandler = require('./middleware/errrorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3500

// Middleware
app.use(eventLogger,
    express.json(),
    express.urlencoded({extended: true}),
    cors(corsOptions),
    cookieParser()
    )
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(('/', require("./routes/root.js")))

// Todo: Fix bug causing POST requests to receive 404 page in response
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', 'notFound.html'))
    } else if (req.accepts('json')) {
        res.json({message: "404 Page Not Found"})
    } else {
        res.type('text').send('404 Not Found')
    }
})
// If errors occur within middleware, handle them appropriately
app.use(errorHandler)

const UserRoutes = require('./routes/user.routes')
UserRoutes(app)

// Create HTTPS server, listen for requests on assigned port
https
    .createServer({
        key: fs.readFileSync("localhost+3-key.pem"),
        cert: fs.readFileSync("localhost+3.pem")
    }, app)
        .listen(PORT, () => {
            console.log(`Express server is running on port ${PORT}`)
        })