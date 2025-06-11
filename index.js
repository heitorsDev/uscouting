const pitPerformanceService = require('./services/pitPerformanceService.js')
const db = require('./database/db')
const models = require('./models.js')
const userScoutService = require('./services/userScoutService.js')
const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()
let dbInstance



app.use(express.json())
(async () => {
    dbInstance = await db.openDb()
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})

