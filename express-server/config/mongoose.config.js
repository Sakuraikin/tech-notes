const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/TicTechGoDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Database connection established')
})
.catch((err) => {
    console.log("Connection to Databse failed", err)
})