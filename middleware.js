const userScoutService = require('./services/userScoutService.js')


function authMiddleware(
    req, 
    res, 
    next
) {
    const token = req.cookies.token.token
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    userScoutService.jwtTokenVerify(token)
        .then(user => {
            req.user = user
            next()
        })
        .catch(error => {
            console.error('Token verification failed:', error)
            res.status(401).json({ error: 'Unauthorized' })
        })
}

module.exports = { authMiddleware }