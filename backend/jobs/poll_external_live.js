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
            for(game in game_scores) { 
                try { 
                    if(typeof game !== null) {
                        //console.log("game " + game_scores[game].home.score.T);
                        let id_to_user = game_scores[game].home.abbr + "-" + game_scores[game].away.abbr;
                        await NFLGame.findOneAndUpdate(
                            {gameId: id_to_user}, 
                            {
                                $set: {
                                    gameId: game, 
                                    home_abbr: game_scores[game].home.abbr , 
                                    away_abbr: game_scores[game].away.abbr,   
                                    home_total_score: game_scores[game].home.score.T, 
                                    home_first_quarter_score: game_scores[game].home.score[1] , 
                                    home_second_quarter_score: game_scores[game].home.score[2], 
                                    home_third_quarter_score: game_scores[game].home.score[3], 
                                    home_fourth_quarter_score: game_scores[game].home.score[4], 
                                    away_total_score: game_scores[game].away.score.T, 
                                    away_first_quarter_score: game_scores[game].away.score[1], 
                                    away_second_quarter_score: game_scores[game].away.score[1], 
                                    away_third_quarter_score: game_scores[game].away.score[1], 
                                    away_fourth_quarter_score: game_scores[game].away.score[1], 
                                    clock: game.clock, 
                                    qtr: game.qtr, 
                                    },
                            },
                            { safe: true, upsert: true, new: true },
                            function (err, model) {
                                //console.log(err);
                            }
                        );
                    }
                } catch(err) { 
                    console.log(err.toString());
                    res.json({
                        message: err.toString()
                    })    
                }
            }
            done();

        })
        
        


    

}