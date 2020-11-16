const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
    gameId: {
        type: String,
        unique: true
    },
    homeTeam: {
        type: String
    },
    awayTeam: {
        type: String,
    },
    status: {
        type: String
    },
    scheduled: {
        type: Date
    },
    homePoints: {
        type: Number
    },
    awayPoints: {
        type: Number
    },
    awayLogoUrl: {
        type: String
    },
    homeLogoUrl: {
        type: String
    }



}, { timestamps: true })
const NBAGame = mongoose.model("NBAGame", gameSchema);

module.exports = NBAGame