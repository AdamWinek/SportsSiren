const axios = require('axios')
const mongoose = require('mongoose');
const NFLGame = require('../models/NFLGame.js')

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://AdamLeonHoulton:AdamLeonHoulton@sportssiren.rrbya.mongodb.net/SportsSiren?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

module.exports = (agenda) => {
    agenda.define("poll_external_live", async (job, done) => {
        let url = 'http://static.nfl.com/liveupdate/scores/scores.json'
        const result = await axios({
            method: "get",
            url: url,
        });
        let game_scores = result.data;
        //console.log(game_scores); 
        for (game in game_scores) {
            try {
                if (typeof game !== null) {
                    //console.log("game " + game_scores[game].home.score.T);
                    if (game_scores[game].away.abbr == "NE") {
                        //console.log(game_scores[game])
                        //console.log(game_scores[game].clock)
                        //console.log(game_scores[game].qtr)
                    }
                    let id_to_user = game_scores[game].home.abbr + "-" + game_scores[game].away.abbr;
                    let updated_obj = await NFLGame.findOneAndUpdate(
                        { abbrKey: id_to_user },
                        {
                            $set: {
                                homeAbbr: game_scores[game].home.abbr,
                                awayAbbr: game_scores[game].away.abbr,
                                homeTotalScore: game_scores[game].home.score.T,
                                homeFirstQuarterScore: game_scores[game].home.score[1],
                                homeSecondQuarterScore: game_scores[game].home.score[2],
                                homeThirdQuarterScore: game_scores[game].home.score[3],
                                homeFourthQuarterScore: game_scores[game].home.score[4],
                                awayTotalScore: game_scores[game].away.score.T,
                                awayFirstQuarterScore: game_scores[game].away.score[1],
                                awaySecondQuarterScore: game_scores[game].away.score[1],
                                awayThirdQuarterScore: game_scores[game].away.score[1],
                                awayFourthQuarterScore: game_scores[game].away.score[1],
                                clock: game_scores[game].clock,
                                qtr: game_scores[game].qtr,
                            },
                        },
                        { safe: true, upsert: true, new: true },
                        function (err, model) {
                            //console.log(err);
                        }
                    );
                    // post obj to update/handleNotifications

                    let methodUrl = "https://sports-siren.herokuapp.com/api/";
                    if (process.env.REACT_APP_DEV_ENV == "development") {
                        methodUrl = "http://localhost:3000/api/";
                    }
                    //methodUrl = "http://localhost:3000/api/";
                    let notification_response = await axios({
                        method: "PUT",
                        url: methodUrl + "update/handleNotifications",
                        data: {
                            game: updated_obj
                        },
                    });



                }
            } catch (err) {
                console.log(err.toString());
                res.json({
                    message: err.toString()
                })
            }
        }
        done();

    })






}