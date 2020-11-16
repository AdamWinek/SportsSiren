const axios = require('axios')
const mongoose = require('mongoose');
const NBAGame = require("./models/NBAGame")
const NBATeam = require("./models/NBATeam");
const NFLGame = require('./models/NFLGame');
const NFLTeam = require('./models/NFLGame')
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://AdamLeonHoulton:AdamLeonHoulton@sportssiren.rrbya.mongodb.net/SportsSiren?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

let test = async function (game) {

    let awayLogo = await NBATeam.findOne({ name: game.away.name }).exec()
    let homeLogo = await NBATeam.findOne({ name: game.away.name }).exec()
    console.log(awayLogo)
    console.log(homeLogo)
}

//api/dailyGames
let dailyGamesNBA = async function (req, res) {
    try {
        let today = new Date();
        today.setFullYear(2019)
        today.setMonth(11);
        today.setDate(25)
        let apiKey = '3ay8mfgvvthzhdcdb6tc3y54';
        let url = `http://api.sportradar.us/nba/trial/v7/en/games/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}/schedule.json?api_key=${apiKey}`

        console.log(url)
        let games = await axios.get(url, {

        }
        )
        console.log(games.data)
        games.data.games.forEach(element => {
            addGameToDB(element)
        });

        res.json({
            message: "games added to DB succesfully"
        })
    } catch (err) {
        res.json({
            message: err.toString()
        })
    }
}


// /api/gameInDBNBA/:gameId
let gameInDBNBA = async function (req, res) {
    console.log(req.params.gameId)

    let game = await NBAGame.findOne({ gameId: req.params.gameId }).exec()
    console.log(game)
    res.json(game)




}



//adds game to DB
let addGameToDBNBA = async function (game) {

    let awayLogo = await NBATeam.findOne({ name: game.away.name }).exec()
    let homeLogo = await NBATeam.findOne({ name: game.home.name }).exec()

    let gameToAdd = new NBAGame({
        gameId: game.id,
        homeTeam: game.home.name,
        awayTeam: game.away.name,
        status: game.status,
        scheduled: new Date(game.scheduled),
        homePoints: game.home_points,
        awayPoints: game.away_points,
        awayLogoUrl: awayLogo.imgUrl,
        homeLogoUrl: homeLogo.imgUrl,

    })
    try {
        await gameToAdd.save()
    } catch (err) {
        console.log(err.toString())
    }

}

//Loads in NFL 2020 SZN
async function loadNFLSZN(req, res) {
    let games = await axios.get('http://api.sportradar.us/nfl/official/trial/v6/en/games/2020/REG/schedule.json?api_key=7kks4khpf5zepeq5gzh7wgxv', {})

    let weeks = games.data.weeks
    weeks.forEach((week) => {
        let weeklyGames = week.games
        weeklyGames.forEach(async (game) => {

            try {
                let current = new NFLGame({
                    gameId: game.id,
                    week: week.sequence,
                    homeTeam: game.home.name,
                    awayTeam: game.away.name,
                    status: game.status,
                    scheduled: game.scheduled,
                    utcOffset: game.utc_offset,
                    homePoints: (game.scoring ? game.scoring.home_points : 0),
                    awayPoints: (game.scoring ? game.scoring.away_points : 0),
                    awayLogoUrl: "none Rn",
                    homeLogoUrl: "none Rn"
                })
                await current.save()
            } catch (err) {
                res.json({
                    message: err.toString()
                })

            }

        })
    })
}
//api/getWeeklyNFLgames/week:
async function getWeeklyNFLGames(req, res) {

    try {
        let gamesThisWeek = await NFLGame.find({ week: req.params.week })
        res.json({
            games: gamesThisWeek
        })

    } catch (err) {
        res.json({
            message: err.toString()
        })
    }
}
module.exports.dailyGamesNBA = dailyGamesNBA;
module.exports.gameInDBNBA = gameInDBNBA
module.exports.loadNFLSZN = loadNFLSZN;
module.exports.getWeeklyNFLGames = getWeeklyNFLGames;