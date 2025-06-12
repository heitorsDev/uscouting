const userScoutService = require('./services/userScoutService.js')

async function authMiddleware(
    req, 
    res, 
    next
) {
    const token = req.cookies.token.token
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    try {
        const user = await userScoutService.jwtTokenVerify(token)
        console.log(user)
        req.userId = user.id      
        req.userName = user.name  
        req.privilege = user.privilege
        
        next()
    } catch(error) {
        console.error('Token verification failed:', error)
        res.status(401).json({ error: 'Unauthorized' })
    }
}

module.exports = { authMiddleware }