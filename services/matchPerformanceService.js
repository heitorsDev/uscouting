const db = require('../database/db')
const models = require('../models.js')

function dbResponseToObject(dbResponse) {
    const matchPerformance = new models.matchRegister(
        dbResponse.match_number,
        dbResponse.alliance_color,
        dbResponse.starting_position,
        dbResponse.auto_high_specimens,
        dbResponse.auto_low_specimens,
        dbResponse.auto_high_baskets,
        dbResponse.auto_low_baskets,
        dbResponse.auto_park,
        dbResponse.teleop_high_specimens,
        dbResponse.teleop_low_specimens,
        dbResponse.teleop_high_baskets,
        dbResponse.teleop_low_baskets,
        dbResponse.ascent,
        dbResponse.penalty,
        dbResponse.penalty_description,
        dbResponse.description,
        dbResponse.team_number,
        dbResponse.user_scout_id
    );
    matchPerformance.id = dbResponse.id;
    return matchPerformance;
}
async function createMatchPerformance(matchPerformance, dbInstance) {
    const query = `INSERT INTO match_performance (match_number, alliance_color, starting_position, auto_high_specimens, auto_low_specimens, auto_high_baskets, auto_low_baskets, auto_park, teleop_high_specimens, teleop_low_specimens, teleop_high_baskets, teleop_low_baskets, ascent, penalty, penalty_description, description, team_number, user_scout_id) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    try {
        const result = await dbInstance.run(query, [
            matchPerformance.match_number,
            matchPerformance.alliance_color,
            matchPerformance.starting_position,
            matchPerformance.auto_high_specimens,
            matchPerformance.auto_low_specimens,
            matchPerformance.auto_high_baskets,
            matchPerformance.auto_low_baskets,
            matchPerformance.auto_park,
            matchPerformance.teleop_high_specimens,
            matchPerformance.teleop_low_specimens,
            matchPerformance.teleop_high_baskets,
            matchPerformance.teleop_low_baskets,
            matchPerformance.ascent,
            matchPerformance.penalty,
            matchPerformance.penalty_description,
            matchPerformance.description,
            matchPerformance.team_number,
            matchPerformance.user_scout_id
        ]);
        return { id: result.lastID, ...matchPerformance };
    } catch (error) {
        console.error('Error creating match performance:', error);
        throw error;
    }
}

async function updateMatchPerformance(matchPerformance, dbInstance) {
    const query = `UPDATE match_performance SET match_number = ?, alliance_color = ?, starting_position = ?, auto_high_specimens = ?, auto_low_specimens = ?, auto_high_baskets = ?, auto_low_baskets = ?, auto_park = ?, teleop_high_specimens = ?, teleop_low_specimens = ?, teleop_high_baskets = ?, teleop_low_baskets = ?, ascent = ?, penalty = ?, penalty_description = ?, description = ?, team_number = ? WHERE id = ?`;
    try {
        await dbInstance.run(query, [
            matchPerformance.match_number,
            matchPerformance.alliance_color,
            matchPerformance.starting_position,
            matchPerformance.auto_high_specimens,
            matchPerformance.auto_low_specimens,
            matchPerformance.auto_high_baskets,
            matchPerformance.auto_low_baskets,
            matchPerformance.auto_park,
            matchPerformance.teleop_high_specimens,
            matchPerformance.teleop_low_specimens,
            matchPerformance.teleop_high_baskets,
            matchPerformance.teleop_low_baskets,
            matchPerformance.ascent,
            matchPerformance.penalty,
            matchPerformance.penalty_description,
            matchPerformance.description,
            matchPerformance.team_number, 
            matchPerformance.id
        ]);
        return matchPerformance;
    } catch (error) {
        console.error('Error updating match performance:', error);
        throw error;
    }
}

async function deleteMatchPerformance(matchPerformance, dbInstance) {
    const query = `DELETE FROM match_performance WHERE id = ?`;
    try {
        await dbInstance.run(query, [matchPerformance.id]);
        return { message: `Match performance with ID ${matchPerformance.id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting match performance:', error);
        throw error;
    }
}

async function getMatchPerformanceById(matchPerformanceId, dbInstance) {
    const query = `SELECT * FROM match_performance WHERE id = ?`;
    try {
        const matchPerformance = await dbInstance.get(query, [matchPerformanceId]);
        if (!matchPerformance) {
            throw new Error(`Match performance with ID ${matchPerformanceId} not found`);
        }
        return dbResponseToObject(matchPerformance);
    } catch (error) {
        console.error('Error fetching match performance:', error);
        throw error;
    }
}
async function getMatchPerformanceByTeamNumber(teamNumber, dbInstance) {
    const query = `SELECT * FROM match_performance WHERE team_number = ?`;
    try {
        const matchPerformances = await dbInstance.all(query, [teamNumber]);
        return matchPerformances.map(dbResponseToObject);
    } catch (error) {
        console.error('Error fetching match performances by team number:', error);
        throw error;
    }
}
async function getAllMatchPerformances(dbInstance) {
    const query = `SELECT * FROM match_performance`;
    try {
        const matchPerformances = await dbInstance.all(query);
        return matchPerformances.map(dbResponseToObject);
    } catch (error) {
        console.error('Error fetching all match performances:', error);
        throw error;
    }
}

async function getMatchPerformanceByMatchNumber(matchNumber, dbInstance) {
    const query = `SELECT * FROM match_performance WHERE match_number = ?`;
    try {
        const matchPerformances = await dbInstance.all(query, [matchNumber]);
        return matchPerformances.map(dbResponseToObject);
    } catch (error) {
        console.error('Error fetching match performances by match number:', error);
        throw error;
    }
}

module.exports = {
    createMatchPerformance,
    updateMatchPerformance,
    deleteMatchPerformance,
    getMatchPerformanceById,
    getMatchPerformanceByTeamNumber,
    getAllMatchPerformances,
    getMatchPerformanceByMatchNumber
}