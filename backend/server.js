const express = require('express')
require('dotenv/config')
const mongoose = require('mongoose')
const colors = require('colors')
const cors = require('cors')

const port = process.env.PORT

// server

const app = express()

app.use(express.json())

app.use(cors())
app.use(express.urlencoded({extended : false}))

// Middleware
app.use('/api', require('./routes/route'))
app.use('/api', require('./routes/courseRoute'))

const collectionDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongodb : ${conn.connection.host}`.cyan.underline)

    } catch(error) {
        console.error(error)
        process.exit(1)
    }
}

collectionDB()

// Server port lisrening

app.listen(port,
    () => console.log(`server is running on port: ${port}`))