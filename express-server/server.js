const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 3500

// Middleware
app.use('/', express.static(path.join(__dirname, '/public')))
app.use(('/', require("./routes/root.js")))
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', 'notFound.html'))
    }
})

// Server startup
app.listen(PORT, () => console.log(`Express server is running on port ${PORT}`))