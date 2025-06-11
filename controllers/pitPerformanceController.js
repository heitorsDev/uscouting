const models = require('../models');
const pitPerformanceService = require('../services/pitPerformanceService.js');



const createPitPerformance = (dbInstance) => async (req, res) => {
    console.log(req.userId)
    const pitPerformanceData = req.body
    const pitPerformanceObject = new models.pitRegister(
        pitPerformanceData.auto_high_specimens,
        pitPerformanceData.auto_low_specimens,
        pitPerformanceData.auto_high_baskets,
        pitPerformanceData.auto_low_baskets,
        pitPerformanceData.auto_park,
        pitPerformanceData.teleop_high_specimens,
        pitPerformanceData.teleop_low_specimens,
        pitPerformanceData.teleop_high_baskets,
        pitPerformanceData.teleop_low_baskets,
        pitPerformanceData.ascent,
        pitPerformanceData.team_number,
        req.userId
    )

    /*test req.body
    {
        auto_high_specimens: 5,
        auto_low_specimens: 3,
        auto_high_baskets: 2,
        auto_low_baskets: 1,
        auto_park: true,
        teleop_high_specimens: 10,
        teleop_low_specimens: 4,
        teleop_high_baskets: 3,
        teleop_low_baskets: 2,
        ascent: 1,
        team_number: 1234
        

    }*/


    try {
        const pitPerformance = await pitPerformanceService.createPitPerformance(pitPerformanceObject, dbInstance);
        res.status(201).json(pitPerformance);
    } catch (error){
        console.error('Error creating pit performance:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
    
}
module.exports = {
    createPitPerformance
}