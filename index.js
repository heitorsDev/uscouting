const pitPerformanceService = require('./services/pitPerformanceService.js')
const db = require('./database/db')
const models = require('./models.js')
const userScoutService = require('./services/userScoutService.js')




async function main() {
    const dbInstance = await db.openDb()
    await dbInstance.exec(`DROP TABLE IF EXISTS users_scout`);
    await db.createTables(dbInstance)
    const userScout = new models.userRegister('JohnDoe', 'password123')
    const createdUserScout = await userScoutService.createUserScout(userScout, dbInstance)
    console.log('User Scout Created:', createdUserScout)
    const token = await userScoutService.authUserScout(createdUserScout.name, 'password123', dbInstance)
    console.log('Auth Token:', token)
    const decodedUserScout = await userScoutService.jwtTokenVerify(token.token)
    console.log('Decoded User Scout:', decodedUserScout)
}
main()