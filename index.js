const pitPerformanceService = require('./services/pitPerformanceService.js')
const db = require('./database/db')
const models = require('./models.js')
const userScoutService = require('./services/userScoutService.js')
const express = require('express')

const scoutUserController = require('./controllers/scoutUserController.js')
const pitPerformanceController = require('./controllers/pitPerformanceController.js')

const app = express()
const cookieParser = require('cookie-parser')
const { authMiddleware } = require('./middleware.js')
const dotenv = require('dotenv')
dotenv.config()
let dbInstance





(async () => {

    dbInstance = await db.openDb()
  

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })


    app.post('/register', scoutUserController.register(dbInstance))

    app.post('/login', scoutUserController.login(dbInstance))

    app.post('/pit-performance', authMiddleware, pitPerformanceController.createPitPerformance(dbInstance))


})()

app.use(express.json())
app.use(cookieParser())

