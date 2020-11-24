const mongoose = require("mongoose")
const TeamsJson = require("../static/NBALogos.json")
const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    imgUrl: {
        type: String
    }



}, { timestamps: true })
const NBATeam = mongoose.model("NBATeam", gameSchema);

module.exports = NBATeam


async function loadTeams() {
    let teams = TeamsJson.teams;
   //console.log('running')
    teams.forEach(async (team) => {
        let currentTeam = new NBATeam({
            name: `${team.region} ${team.name}`,
            imgUrl: team.imgURL
        })
        try {
            await currentTeam.save()
        } catch (err) {
           //console.log(err.toString())
        }


    })




}

