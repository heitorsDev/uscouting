const pitPerformanceService = require('./services/pitPerformanceService.js')
const db = require('./database/db')
const models = require('./models.js')
const userScoutService = require('./services/userScoutService.js')
const express = require('express')
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
})()

app.use(express.json())
app.use(cookieParser())

app.post('/register', async (req, res) => {
    const { user, password } = req.body
    try {
        const newUser = await userScoutService.createUserScout({ name: user, password }, dbInstance)
        res.status(201).json(newUser)
    } catch (error) {
        console.error('Error registering user:', error)
        res.status(500).json({ error: "user already exists or other error" })
    }
})

app.post('/login', async (req, res) => {
    const { user, password } = req.body
    try {
        const token = await userScoutService.authUserScout(user, password, dbInstance)
        if (token) {
            res.status(200).cookie("token", token).json({
                message: 'Login successful'
            })
        } else {
            res.status(401).json({ error: 'Invalid credentials' })
        }
    } catch (error) {
        console.error('Error logging in:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.post('/pit-performance', authMiddleware, async (req, res) => {
    console.log(req.userObj)
    res.status(200).json({ message: 'Pit performance endpoint is working' })
})