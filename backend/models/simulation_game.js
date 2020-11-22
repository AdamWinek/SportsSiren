const mongoose = require("mongoose")

const simulation_game = new mongoose.Schema({
    abbrKey: {
        type: String,
        unique: true
    },
    homeAbbr: { 
        type: String
    },
    awayAbbr: { 
        type: String
    },
    homeTotalScore: { 
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
const schema = mongoose.model("simulation_game", simulation_game);

module.exports = schema