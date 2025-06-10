const matchPerformanceService = require('./services/matchPerformaceService.js')
const db = require('./database/db')
const models = require('./models.js')

async function main() {
    const dbInstance = await db.openDb()

    dbInstance.exec('DROP TABLE IF EXISTS match_performance;')

    await db.createTables(dbInstance)
    try {
        // 1. Create match performance
        const newMatch = new models.matchRegister(
            1, // match_number
            'red', // alliance_color
            'specimen', // starting_position
            2, // auto_high_specimens
            1, // auto_low_specimens
            0, // auto_high_baskets
            1, // auto_low_baskets
            true, // auto_park
            3, // teleop_high_specimens
            2, // teleop_low_specimens
            1, // teleop_high_baskets
            0, // teleop_low_baskets
            true, // ascent
            0, // penalty
            '', // penalty_description
            'Good match', // description
            24557, // team_number
            1 // user_scout_id
        )
        const created = await matchPerformanceService.createMatchPerformance(newMatch, dbInstance)
        console.log('Created:', created)

        // 2. Fetch by ID
        const fetched = await matchPerformanceService.getMatchPerformanceById(created.id, dbInstance)
        console.log('Fetched by ID:', fetched)

        // 3. Update
        fetched.description = 'Updated match description'
        const updated = await matchPerformanceService.updateMatchPerformance(fetched, dbInstance)
        console.log('Updated:', updated)

        // 4. Fetch by team number
        const byTeam = await matchPerformanceService.getMatchPerformanceByTeamNumber(fetched.team_number, dbInstance)
        console.log('Fetched by team number:', byTeam)

        // 5. Delete
        const deleted = await matchPerformanceService.deleteMatchPerformance(fetched, dbInstance)
        console.log('Deleted:', deleted)
    } catch (error) {
        console.error('Error during match performance operations:', error)
    } finally {
        await dbInstance.close()
    }
}

main()