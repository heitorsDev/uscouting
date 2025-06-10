const sql = require("sqlite3")
const { open } = require('sqlite')

async function openDb() {
    try {
        return await open({
            filename: './database/database.db',
            driver: sql.Database
        });
    } catch (error) {
        console.error('Error opening database:', error);
        throw error;
    }
}

async function createTables(db) {
    try {
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users_scout (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS teams (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                number TEXT UNIQUE NOT NULL
            );

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

            CREATE TABLE IF NOT EXISTS match_performance (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                alliance_color TEXT CHECK(alliance_color IN ('red', 'blue')),
                starting_position TEXT CHECK(starting_position IN ('specimen', 'basket')),
                
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

                penalty INTEGER NOT NULL,
                penalty_description TEXT,

                description TEXT,

                match_number INTEGER NOT NULL,

                team_number INTEGER NOT NULL,
                user_scout_id INTEGER NOT NULL,
                FOREIGN KEY(team_number) REFERENCES teams(number),
                FOREIGN KEY(user_scout_id) REFERENCES users_scout(id)
            );
        `);
    } catch (error) {
        console.error('Error creating tables:', error);
    }
}


(async () => {
    const db = await openDb()
    await createTables(db)
})();

module.exports = {
    openDb,
    createTables
}
