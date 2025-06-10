const db = require('../database/db')
const models = require('../modles.js')

function dbResponseToObject(dbResponse) {
    const team = new models.teamRegister(dbResponse.name, dbResponse.number)
    return team
}


async function createTeam(team, dbInstance){
    const query = `INSERT INTO teams (name, number) VALUES (?, ?)`
    try {
        const result = await dbInstance.run(query, [team.name, team.number])
        return { id: result.lastID, ...team }
    } catch (error) {
        console.error('Error creating team:', error)
        throw error
    } 
}

async function updateTeam(team, dbInstance) {
    const query = `UPDATE teams SET name = ? WHERE number = ?`
    try {
        await dbInstance.run(query, [team.name, team.number])
        return team
    } catch (error) {
        console.error('Error updating team:', error)
        throw error
    } 
}

async function deleteTeam(team, dbInstance){
    const query = `DELETE FROM teams WHERE number = ?`
    try {
        await dbInstance.run(query, [team.number])
        return { message: `Team ${team.number} deleted successfully` }
    } catch (error) {
        console.error('Error deleting team:', error)
        throw error
    }
}

async function getTeamByNumber(teamNumber, dbInstance) {
    const query = `SELECT * FROM teams WHERE number = ?`
    try {
        const team = await dbInstance.get(query, [teamNumber])
        if (!team) {
            throw new Error(`Team with number ${teamNumber} not found`)
        }
        return dbResponseToObject(team)
    } catch (error) {
        console.error('Error fetching team:', error)
        throw error
    }
}

async function getAllTeams(dbInstance) {
    const query = `SELECT * FROM teams`
    try {
        const teams = await dbInstance.all(query)
        return teams.map(dbResponseToObject)
    } catch (error) {
        console.error('Error fetching all teams:', error)
        throw error
    }
}