const userScoutService = require('../services/userScoutService')


const register = (dbInstance) => async (req, res) => {
    const { user, password } = req.body
    try {
        const newUser = await userScoutService.createUserScout({ name: user, password }, dbInstance)
        res.status(201).json(newUser)
    } catch (error) {
        console.error('Error registering user:', error)
        res.status(500).json({ error: "user already exists or other error" })
    }
}



const login = (dbInstance) => async (req, res) => {
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
}

module.exports = {
    register,
    login
}