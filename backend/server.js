const express = require('express')
require('dotenv').config()
const path = require('path');
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://AdamLeonHoulton:AdamLeonHoulton@sportssiren.rrbya.mongodb.net/SportsSiren?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;
const User = require("./models/User")
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
let jwt = require('jsonwebtoken');
const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

let twilioInstance = new twilio(accountSid, authToken)

db.once('open', function () {
    console.log('wereConnected')
});

// parse application/json
app.use(bodyParser.json())
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../build')))


app.get('/api', (req, res) => {

    res.send('Dis da Server')
})



app.post('/api/registerUser', async (req, res) => {
    try {
        bcrypt.hash(req.body.password, 10, async function (err, hash) {

            let user = new User({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                phone: req.body.phone,
                password: hash
            })

            try {
                await user.save()
                res.json({
                    message: "User Added"
                })

            } catch (e) {
                res.json({
                    message: e.toString()
                })
            }
        })
    } catch (e) {
        res.json({
            message: e.toString()
        })

    }

})

app.post('/api/login', async (req, res) => {
    console.log(req.body)
    let currentUser = await User.findOne({ email: req.body.email }).exec();
    if (currentUser == undefined) {
        res.status(400)
        res.json({
            message: "No user associated with email"
        })
    } else if (req.body.password == undefined) {
        res.status(400)
        res.json({
            message: "wrong password"
        })
        return
    }



    bcrypt.compare(req.body.password, currentUser.password, function (err, result) {
        if (!result || err) {
            res.status(400)
            res.json({
                message: "Their was an error with your password"
            })
        } else {
            let token = jwt.sign({ email: req.body.email }, 'daSecretToken', { expiresIn: '1h' });

            res.status(200)
            res.json({
                token: token,
                email: req.body.email,
                fname: currentUser.fname,
                lname: currentUser.lname,
                phone: currentUser.phone
            })
        }
    });
})


// to use a protected route you must include token in the body of the request
// inside a protected route you need to check if a token has been included and is correct
app.get('/api/sampleProtectedRoute', async (req, res) => {

    if (req.body.token == undefined) {
        res.json({
            message: "You need to login to use this route"
        })
    }
    try {
        let decoded = jwt.verify(req.body.token, 'daSecretToken');
        res.json({
            message: "ya did it"
        })

    } catch (err) {
        res.json({
            message: "wrong token"
        })
    }
})


app.delete('/api/deleteAccount', async (req, res) => {
    console.log(req.body, "here")
    try {
        await User.deleteOne({ email: req.body.email }, function (err) {
            if (err) { console.log(err.toString()) };
        });
        res.json({ message: "user deleted" });


    } catch (err) {
        res.json({ message: err.toString() })



    }


})

app.put('/api/updatePassword', async (req, res) => {

    try {
        bcrypt.hash(req.body.oldPassword, 10, async function (err, hash) {
            try {
                const newHash = bcrypt.hashSync(req.body.newPassword, 10);
                console.log(newHash)
                console.log(hash)
                await User.updateOne({ email: req.body.email }, { $set: { password: newHash } }, (err) => {
                    if (err) {
                        console.log(err)

                    }
                }
                );
                res.json({ message: "password changed" });

            } catch (err) {
                res.json({ message: err.toString() })

            }
        })
    } catch (e) {
        res.json({
            message: e.toString()
        })

    }
})



app.put('/api/updatePhone', async (req, res) => {

    try {
        await User.updateOne({ email: req.body.email }, { $set: { phone: req.body.phone } });
        res.json({ message: "phone changed" });

    } catch (err) {
        res.json({ message: "There was an error with your phone" })

    }

})






app.get('/api/sendNotification', async (req, res) => {

    if (req.body.token == undefined) {
        res.json({
            message: "You need to login to use this route"
        })
    }
    try {
        let decoded = jwt.verify(req.body.token, 'daSecretToken');

        let msg = await twilioInstance.messages.create({
            body: req.body.message,
            to: req.body.phone,  // Text this number
            from: '+18285200670' // The number we bought
        })
        console.log(msg)
        console.log(decoded)

        res.json({
            error: msg.error_message,
            status: msg.status
        })




    } catch (err) {
        res.json({
            message: err.toString()
        })
    }
})

//get routes from GameController
const { dailyGamesNBA } = require('./GameController.js')
app.get('/api/dailyGamesNBA', (req, res) => dailyGames(req, res))

const { gameInDBNBA } = require('./GameController.js')
app.get('/api/gameInDBNBA/:gameId', (req, res) => gameInDBNBA(req, res))

const { loadNFlSZN } = require('./GameController.js')
app.get('/api/loadNFLSZN', (req, res) => loadNFLSZN(req, res))

const { getWeeklyNFLGames } = require('./GameController.js')
app.get('/api/getWeeklyNFLGames/:week', (req, res) => getWeeklyNFLGames(req, res))





// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(['/', '/*'], (req, res) => {
    console.log(path.join(__dirname, '../build/index.html'))
    res.sendFile(path.join(__dirname, '../build/index.html'));
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


exports.app = app
exports.db = db

function sendText(home_object, away_object, game_time) {
    /* 
        home_object = { 
            score: 15, 
            team: "Patriots", 
        }

    */
    // Grab user preferences 
    let user_threshold_score = 1;
    let user_threshold_time = "15:00";

    let score_difference = Math.abs(home_object.score - away_object.score);
    let score_threshold_sent = True;
    if (score_difference <= user_threshold_score) {
        // 
        let message = `Sports Siren Alert!! ${home_object.team} vs. ${away_object.team} is within ${user_threshold_score} points! Current score: 
       ${home_object.score} to ${away_object.score}. Tune into the game now!`;
        // Fire twilio message
        score_threshold_sent = False;
    }
    if (game_time < user_threshold_time && score_threshold_sent) {
        let message = `Sports Siren Alert!! ${home_object.team} vs. ${away_object.team} has ${game_time} left to go! Tune into the game now!`;
        // Fire twilio message

    }
}