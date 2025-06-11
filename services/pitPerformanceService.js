/*
 CREATE TABLE IF NOT EXISTS pit_performance (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                
                auto_high_specimens INTEGER,
                auto_low_specimens INTEGER,
                auto_high_baskets INTEGER,
                auto_low_baskets INTEGER,
                auto_park BOOLEAN NOT NULL,

                teleop_high_specimens INTEGER,
                teleop_low_specimens INTEGER,
                teleop_high_baskets INTEGER,
                teleop_low_baskets INTEGER,

                ascent INTEGER,

                team_number INTEGER NOT NULL,
                user_scout_id INTEGER NOT NULL,
                FOREIGN KEY(team_number) REFERENCES teams(number),
                FOREIGN KEY(user_scout_id) REFERENCES users_scout(id)
            );
            */
const { pitRegister } = require('../models');

function dbResponseToObject(dbResponse) {
    const pitPerformance = new pitRegister(
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
        dbResponse.team_number,
        dbResponse.user_scout_id
    );
    pitPerformance.id = dbResponse.id;
    return pitPerformance;
}
async function createPitPerformance(pitPerformance, dbInstance) {
    const query = `INSERT INTO pit_performance (auto_high_specimens, auto_low_specimens, auto_high_baskets, auto_low_baskets, auto_park, teleop_high_specimens, teleop_low_specimens, teleop_high_baskets, teleop_low_baskets, ascent, team_number, user_scout_id) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?)`
    try {
        const result = await dbInstance.run(query, [
            pitPerformance.auto_high_specimens,
            pitPerformance.auto_low_specimens,
            pitPerformance.auto_high_baskets,
            pitPerformance.auto_low_baskets,
            pitPerformance.auto_park,
            pitPerformance.teleop_high_specimens,
            pitPerformance.teleop_low_specimens,
            pitPerformance.teleop_high_baskets,
            pitPerformance.teleop_low_baskets,
            pitPerformance.ascent,
            pitPerformance.team_number,
            pitPerformance.user_scout_id
        ]);
        return { id: result.lastID, ...pitPerformance };
    } catch (error) {
        console.error('Error creating pit performance:', error);
        throw error;
    }
}
async function updatePitPerformance(pitPerformance, dbInstance) {
    const query = `UPDATE pit_performance SET 
        auto_high_specimens = ?, auto_low_specimens = ?, auto_high_baskets = ?, auto_low_baskets = ?, auto_park = ?, 
        teleop_high_specimens = ?, teleop_low_specimens = ?, teleop_high_baskets = ?, teleop_low_baskets = ?, 
        ascent = ?, team_number = ?, user_scout_id = ? WHERE id = ?`;
    try {
        await dbInstance.run(query, [
            pitPerformance.auto_high_specimens,
            pitPerformance.auto_low_specimens,
            pitPerformance.auto_high_baskets,
            pitPerformance.auto_low_baskets,
            pitPerformance.auto_park,
            pitPerformance.teleop_high_specimens,
            pitPerformance.teleop_low_specimens,
            pitPerformance.teleop_high_baskets,
            pitPerformance.teleop_low_baskets,
            pitPerformance.ascent,
            pitPerformance.team_number,
            pitPerformance.user_scout_id,
            pitPerformance.id
        ]);
        return pitPerformance;
    } catch (error) {
        console.error('Error updating pit performance:', error);
        throw error;
    }
}

async function deletePitPerformance(pitPerformance, dbInstance) {
    const query = `DELETE FROM pit_performance WHERE id = ?`;
    try {
        await dbInstance.run(query, [pitPerformance.id]);
        return { message: `Pit performance with ID ${pitPerformance.id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting pit performance:', error);
        throw error;
    }
}

async function getPitPerformanceById(id, dbInstance) {
    const query = `SELECT * FROM pit_performance WHERE id = ?`;
    try {
        const pit = await dbInstance.get(query, [id]);
        if (!pit) throw new Error(`Pit performance with ID ${id} not found`);
        return dbResponseToObject(pit);
    } catch (error) {
        console.error('Error fetching pit performance by id:', error);
        throw error;
    }
}

async function getPitPerformanceByTeamNumber(teamNumber, dbInstance) {
    const query = `SELECT * FROM pit_performance WHERE team_number = ?`;
    try {
        const pits = await dbInstance.all(query, [teamNumber]);
        return pits.map(dbResponseToObject);
    } catch (error) {
        console.error('Error fetching pit performances by team number:', error);
        throw error;
    }
}

async function getAllPitPerformances(dbInstance) {
    const query = `SELECT * FROM pit_performance`;
    try {
        const pits = await dbInstance.all(query);
        return pits.map(dbResponseToObject);
    } catch (error) {
        console.error('Error fetching all pit performances:', error);
        throw error;
    }
}

module.exports = {
    createPitPerformance,
    updatePitPerformance,
    deletePitPerformance,
    getPitPerformanceById,
    getPitPerformanceByTeamNumber,
    getAllPitPerformances
}