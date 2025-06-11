const models = require('../models')
const bcrypt = require('bcrypt') //resolver depois
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

function dbResponseToObject(dbResponse) {
    const userScout = new models.userRegister(dbResponse.name, dbResponse.password, dbResponse.privilege)
    userScout.id = dbResponse.id
    return userScout
}
async function createUserScout(user, dbInstance) {
    
        const existing = await getUserScoutByName(user.name, dbInstance)
        if (existing) {
            throw new Error(`Scout user with name ${user.name} already exists`)
        }
            const hashedPassword = await bcrypt.hash(user.password, Number(process.env.HASH_SALT))
            const query = `INSERT INTO users_scout (name, password) VALUES (?, ?)`
            const result = await dbInstance.run(query, [user.name, hashedPassword])
            return { id: result.lastID, ...user }
       
    
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
        return null
    }
}

async function authUserScout(userScoutName, userScoutPassword, dbInstance) {
    const user = await getUserScoutByName(userScoutName, dbInstance)
    if (!user) {
        return null
    }
    const isPasswordValid = await bcrypt.compare(userScoutPassword, user.password)
    if (!isPasswordValid) {
        return null
    }
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '10h' })
    return { token }
}

async function decodedJwtToObject(decoded) {
    const userScout = new models.userRegister(decoded.name, null)
    return userScout
}



async function jwtTokenVerify(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decodedJwtToObject(decoded)
    } catch (error) {
        console.error('Error verifying JWT token:', error)
        throw new Error('Invalid token')
    }
}






module.exports = {
    createUserScout,
    updateUserScout,
    deleteUserScout,
    getUserScoutById,
    getUserScoutByName,
    authUserScout,
    jwtTokenVerify
}