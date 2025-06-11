const pitPerformanceService = require('./services/pitPerformanceService.js')
const db = require('./database/db')
const models = require('./models.js')
const userScoutService = require('./services/userScoutService.js')
const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()
let dbInstance



(async () => {
    dbInstance = await db.openDb()
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})()

app.use(express.json())

app.post('/register', async (req, res) => {
    const {user, password} = req.body
    try {
        const newUser = await userScoutService.createUserScout({name: user, password}, dbInstance)
        res.status(201).json(newUser)
    } catch (error) {
        console.error('Error registering user:', error)
        res.status(500).json({error: "user already exists or other error"})
    }
})