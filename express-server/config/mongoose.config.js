const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Database connection established')
})
.catch((err) => {
    console.log("Connection to Databse failed", err)
})