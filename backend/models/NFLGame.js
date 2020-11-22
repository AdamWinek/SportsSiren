const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
    gameId: {
        type: String,
        unique: true
    },
    week: {
        type: Number
    },
    homeTeam: {
        type: String
    },
    homeAbbr: {
        type: String
    },
    awayAbbr: {
        type: String
    },
    abbrKey: {
        type: String,
        unique: true
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
    utcOffset: {
        type: Number
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
    },
    homeRecord: {
        type: String
    },
    awayRecord: {
        type: String
    },
    homeWins: {
        type: Number
    },
    awayWins: {
        type: Number
    },
    homeLosses: {
        type: Number
    },
    awayLosses: {
        type: Number
    },
    homeTies: {
        type: Number
    },
    awayTies: {
        type: Number
    }, homeTotalScore: {
        type: Number,
    },
    homeFirstQuarterScore: {
        type: Number,
    },
    homeSecondQuarterScore: {
        type: Number,
    },
    homeThirdQuarterScore: {
        type: Number,
    },
    homeFourthQuarterScore: {
        type: Number,
    },
    awayTotalScore: {
        type: Number,
    },
    awayFirstQuarterScore: {
        type: Number,
    },
    awaySecondQuarterScore: {
        type: Number,
    },
    awayThirdQuarterScore: {
        type: Number,
    },
    awayFourthQuarterScore: {
        type: Number,
    },
    clock: {
        type: String,
    },
    qtr: {
        type: String,
    }








}, { timestamps: true })
const NFLGame = mongoose.model("NFLGame", gameSchema);

module.exports = NFLGame