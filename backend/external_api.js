const axios = require('axios')
const mongoose = require('mongoose');
const NBAGame = require("./models/NBAGame")
const NBATeam = require("./models/NBATeam");
const NFLGame = require('./models/NFLGame');
const NFLTeam = require('./models/NFLGame')
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://AdamLeonHoulton:AdamLeonHoulton@sportssiren.rrbya.mongodb.net/SportsSiren?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;


// Get NFL Schedule 
const getSchedule = async function (week, key) {
    let url = 'https://api.sportradar.us/nfl/official/trial/v6/en/games/2020/REG/' + week + '/schedule.json?api_key=' + key;
    const result = await axios({
        method: "get",
        url: url,
    });
    return result.data;
}

// NFL Live Scores
const getLiveNFLScores = async function () {
    let url = 'https://static.nfl.com/liveupdate/scorestrip/ss.xml'
    const result = await axios({
        method: "get",
        url: url,
    });
    // Gonna need to parse the XML 
    console.log(result.data);
    return result.data;

}

// Better NFL Live Scores
const getBetterLiveNFLScores = async function () {
    let url = 'http://static.nfl.com/liveupdate/scores/scores.json'
    const result = await axios({
        method: "get",
        url: url,
    });
    console.log(result.data);
    return result.data;

}


// iSports Api 
const getLiveSoccerScores = async function (key) {
    let url = 'http://api.isportsapi.com/sport/football/livescores?api_key=' + key
    const result = await axios({
        method: "get",
        url: url,
    });
    return result.data;
}

// iSports Api 
const getLiveBasketBallScores = async function (key) {
    let url = 'http://api.isportsapi.com/sport/basketball/livescores?api_key=' + key
    const result = await axios({
        method: "get",
        url: url,
    });
    return result.data;
}

// NCAA Football Scores
const getNCAAFootballScores = async function (week) {
    let url = "https://api.collegefootballdata.com/games?year=2020&week=" + week + "&seasonType=regular"
    const result = await axios({
        method: "get",
        url: url,
    });
    return result.data;

}

// Doesn't work
const getNBASimulation = async function () {
    let url = "http://api.sportradar.us/nba/simulation/trial/en/games/2017/SIM/schedule.json?api_key=3ay8mfgvvthzhdcdb6tc3y54"
}



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
                    homeAbbr: game.home.alias,
                    awayAbbr: game.away.alias,
                    abbrKey: `${game.home.alias}-${game.away.alias}`
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


const updateStandingsNFL = async function updateStandingsNFL(req, res) {
    try {
        let currentStandings = await axios.get('http://api.sportradar.us/nfl/official/trial/v6/en/seasons/2020/standings.json?api_key=7kks4khpf5zepeq5gzh7wgxv', {})

        let teamArr = []
        console.log(currentStandings)
        //load standings into array
        currentStandings.data.conferences.forEach((conference) => {
            conference.divisions.forEach((division) => {
                division.teams.forEach((team) => {
                    teamArr.push(team)


                })


            })
        }
        )
        teamArr.forEach(async (team) => {
            try {
                //update records in which team in array was the home team
                NFLGame.updateMany({ homeTeam: `${team.market} ${team.name}` }, { $set: { homeWins: team.wins, homeLosses: team.losses, homeTies: team.ties } }, (err) => {
                    if (err) {
                        console.log(err.toString())
                    }
                })
                //update records in which team in array was the away team
                NFLGame.updateMany({ awayTeam: `${team.market} ${team.name}` }, { $set: { awayWins: team.wins, awayLosses: team.losses, awayTies: team.ties } },
                    (err) => {
                        if (err) {
                            console.log(err.toString())
                        }
                    })

            } catch (err) {
                console.log(err.toString())
            }


        })
        res.json({
            message: "records Updated Succesfully"
        })


    } catch (err) {
        res.json({
            message: err.toString()
        })

    }



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

//gets most recent scheduled game that has not been started
async function getMostRecentGame(req, res) {

    try {
        let game = await NFLGame.find({ "scheduled": {"$gte": new Date()}, status: "scheduled"}  ).sort({ date: -1 }).limit(4).exec()
        
        console.log("most recent"); 
        //console.log(game)
        res.json({
            game: game
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
module.exports.getSchedule = getSchedule;
module.exports.getLiveNFLScores = getLiveNFLScores;
module.exports.getBetterLiveNFLScores = getBetterLiveNFLScores;
module.exports.getLiveSoccerScores = getLiveSoccerScores;
module.exports.getLiveBasketBallScores = getLiveBasketBallScores;
module.exports.getNCAAFootballScores = getNCAAFootballScores;
module.exports.getNBASimulation = getNBASimulation;
module.exports.updateStandingsNFL = updateStandingsNFL
module.exports.getMostRecentGame = getMostRecentGame