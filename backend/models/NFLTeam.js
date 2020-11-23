const mongoose = require("mongoose")
const NFLTeamSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },



}, { timestamps: true })
const NFLTeam = mongoose.model("NFLTeam", NFLTeamSchema);

module.exports = NFLTeam

