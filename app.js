require('dotenv').config()
const express = require('express')

const toursRouter = require('./routes/toursRoute')

const app = express()

app.use(express.json())
app.use('/api/v1/tours', toursRouter)

module.exports = app
