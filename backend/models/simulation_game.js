const mongoose = require("mongoose")

const simulation_schema = new mongoose.Schema({
    abbrKey: {
        type: String,
        unique: true
    },
    home_abbr: { 
        type: String
    },
    away_abbr: { 
        type: String
    },
    home_total_score: { 
        type: Number,
    },
    home_first_quarter_score: { 
        type: Number,
    },
    home_second_quarter_score: { 
        type: Number,
    },
    home_third_quarter_score: { 
        type: Number,
    },
    home_fourth_quarter_score: { 
        type: Number,
    },
    away_total_score: { 
        type: Number,
    },
    away_first_quarter_score: { 
        type: Number,
    },
    away_second_quarter_score: { 
        type: Number,
    },
    away_third_quarter_score: { 
        type: Number,
    },
    away_fourth_quarter_score: { 
        type: Number,
    },
    clock: { 
        type: String,
    }, 
    qtr: { 
        type: String,
    }




}, { timestamps: true })
const game = mongoose.model("simulation_game", simulation_schema);

module.exports = game