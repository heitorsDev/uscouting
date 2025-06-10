const teamService = require('./services/teamService')
const db = require('./database/db')
const models = require('./models.js')
const newTeam = new models.teamRegister('Unimate', 24557)


const dbInstance = db.openDb()


dbInstance.then(async (db) => {
    const team = teamService.getAllTeams(db)
    team.then((teamData) => {
        console.log('Team Data:', teamData)
    })
})


