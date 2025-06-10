const models = require('../models')
const bcrypt = require('bcrypt') //resolver depois


function dbResponseToObject(dbResponse) {
    const userScout = new models.userRegister(dbResponse.name, dbResponse.password)
    userScout.id = dbResponse.id
    return userScout
}
async function createUserScout(userScout, dbInstance) {
    const query = `INSERT INTO users_scout (name, password) VALUES (?, ?)`
    try {
        const result = await dbInstance.run(query, [userScout.name, userScout.password])
        return { id: result.lastID, ...userScout }
    } catch (error) {
        console.error('Error creating scout user:', error)
        throw error
    }
}

async function updateUserScout(userScout, dbInstance) {
    const query = `UPDATE users_scout SET name = ?, password = ? WHERE id = ?`
    try {
        await dbInstance.run(query, [userScout.name, userScout.password, userScout.id])
        return userScout
    } catch (error) {
        console.error('Error updating scout user:', error)
        throw error
    }
}
async function deleteUserScout(userScout, dbInstance) {
    const query = `DELETE FROM users_scout WHERE id = ?`
    try {
        await dbInstance.run(query, [userScout.id])
        return { message: `Scout user ${userScout.name} deleted successfully` }
    } catch (error) {
        console.error('Error deleting scout user:', error)
        throw error
    }
}

async function getUserScoutById(userScoutId, dbInstance) {
    const query = `SELECT * FROM users_scout WHERE id = ?`
    try {
        const scoutUser = await dbInstance.get(query, [userScoutId])
        if (!scoutUser) {
            throw new Error(`Scout user with ID ${userScoutId} not found`)
        }
        return dbResponseToObject(scoutUser)
    } catch (error) {
        console.error('Error fetching scout user:', error)
        throw error
    }
}


async function getUserScoutByName(userScoutName, dbInstance) {
    const query = `SELECT * FROM users_scout WHERE name = ?`

    try {
        const scoutUser = await dbInstance.get(query, [userScoutName])
        if (!scoutUser) {
            throw new Error(`Scout user with name ${userScoutName} not found`)
        }
        return dbResponseToObject(scoutUser)
    } catch (error) {
        console.error('Error fetching scout user by name:', error)
        throw error
    }
}
module.exports = {
    createUserScout,
    updateUserScout,
    deleteUserScout,
    getUserScoutById,
    getUserScoutByName
}