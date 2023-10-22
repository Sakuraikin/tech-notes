const express = require("express")
const app = express()
const path = require("path")
const { eventLogger } = require('./middleware/eventLogger')
const errorHandler = require('./middleware/errrorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3500

// Middleware
app.use(eventLogger,
    express.json(),
    cors(),
    cookieParser()
    )
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(('/', require("./routes/root.js")))
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
app.use(errorHandler)

// Server startup
app.listen(PORT, () => console.log(`Express server is running on port ${PORT}`))