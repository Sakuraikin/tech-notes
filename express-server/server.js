const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 3500

app.listen(PORT, () => console.log(`Express server is running on port ${PORT}`))
app.use('/', express.static(path.join(__dirname, '/public')))