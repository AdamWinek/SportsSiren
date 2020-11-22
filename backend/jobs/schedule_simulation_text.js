const axios = require('axios')
const mongoose = require('mongoose');
const data = require("../example_api_responses/example_live_scores_full.json");
const simulation_game = require("../models/simulation_game");
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://AdamLeonHoulton:AdamLeonHoulton@sportssiren.rrbya.mongodb.net/SportsSiren?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

module.exports = (agenda) => {
    agenda.define("schedule_simulate_text", async (job, done) => {

        try {
            
            await simulation_game.findOneAndUpdate(
                { abbrKey: id_to_user },
                {
                    $set: {
                        homeAbbr: game_scores[game][unique].home.abbr,
                        awayAbbr: game_scores[game][unique].away.abbr,
                        homeTotalScore: game_scores[game][unique].home.score.T,
                        homeFirstQuarterScore: game_scores[game][unique].home.score[1],
                        homeSecondQuarterScore: game_scores[game][unique].home.score[2],
                        homeThirdQuarterScore: game_scores[game][unique].home.score[3],
                        homeFourthQuarterScore: game_scores[game][unique].home.score[4],
                        awayTotalScore: game_scores[game][unique].away.score.T,
                        awayFirstQuarterScore: game_scores[game][unique].away.score[1],
                        awaySecondQuarterScore: game_scores[game][unique].away.score[1],
                        awayThirdQuarterScore: game_scores[game][unique].away.score[1],
                        awayFourthQuarterScore: game_scores[game][unique].away.score[1],
                        clock: game_scores[game][unique].clock,
                        qtr: game_scores[game][unique].qtr,
                    },
                },
                { safe: true, upsert: true, new: true },
                function (err, model) {
                    //console.log(err);
                }
            );

        } catch (err) {
            console.log(err.toString());
            res.json({
                message: err.toString()
            })
        }



        done();

    })






}