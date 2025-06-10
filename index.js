const scoutUserService = require('./services/scoutUserService.js')
const db = require('./database/db')
const models = require('./models.js')

async function main() {
    const dbInstance = await db.openDb()

    try {
        // 1. Create user
        const newUser = new models.userRegister('TestUserr', 'testpass')
        const createdUser = await scoutUserService.createUserScout(newUser, dbInstance)
        console.log('Created user:', createdUser)

        // 2. Fetch user
        const fetchedUser = await scoutUserService.getUserScoutByName('TestUserr', dbInstance)
        console.log('Fetched user:', fetchedUser)

        // 3. Update user
        fetchedUser.password = 'newpass'
        const updatedUser = await scoutUserService.updateUserScout(fetchedUser, dbInstance)
        console.log('Updated user:', updatedUser)

        // 4. Delete user
        const deleteResult = await scoutUserService.deleteUserScout(fetchedUser, dbInstance)
        console.log('Delete result:', deleteResult)
    } catch (error) {
        console.error('Error during operations:', error)
    } finally {
        await dbInstance.close()
    }
}

main()