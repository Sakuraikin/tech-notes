const express = require("express")
const router = express.Router()
const path = require("path")

// User can request root path, /index, or /index.html
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html" ))
})

module.exports = router