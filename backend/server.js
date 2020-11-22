const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.connect(
    "mongodb+srv://AdamLeonHoulton:AdamLeonHoulton@sportssiren.rrbya.mongodb.net/SportsSiren?retryWrites=true&w=majority",
    { useNewUrlParser: true }
);
mongoose.set("useFindAndModify", true);
const db = mongoose.connection;
const User = require("./models/User");
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const bodyParser = require("body-parser");

let twilioInstance = new twilio(accountSid, authToken);

//get routes from GameController
const { dailyGamesNBA } = require("./external_api.js");
const { gameInDBNBA } = require("./external_api.js");
const { loadNFlSZN } = require("./external_api.js");
const { getWeeklyNFLGames } = require("./external_api.js");
const { setNotificationThresholds } = require("./internal_api.js");
const { setNotificationPreferences } = require("./internal_api.js");
const { setFollowingTeams } = require("./internal_api.js");
const { deleteFollowingTeams } = require("./internal_api.js");
const { updateFollowingGames } = require("./internal_api.js");
const { deleteFollowingGames } = require("./internal_api.js");
const { login } = require("./internal_api.js");
const { sendNotification } = require("./internal_api.js");
const { registerUser } = require("./internal_api.js");
const { updateStandingsNFL } = require("./external_api.js")
const { getMostRecentGame } = require("./external_api")

let agenda = require("./agenda_singleton"); 
let agenda_instance = agenda.getInstance(); 

db.once("open", function () {
    console.log("wereConnected");
});


// parse application/json
app.use(bodyParser.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../build")));

app.get("/api", (req, res) => {
    res.send("Dis da Server");
});

// will change to:
// /api/create/registerUser
app.post("/api/registerUser", async (req, res) => registerUser(req, res));

// Expects object
//     let thresholdObject = {
//          "score_threshold": 3, 
//          "time_threshold": 10
// };
app.post("/api/update/user/notification_thresholds", async (req, res) => setNotificationThresholds(req, res));




// Expects object
// parameter_obj = {
//              "phone_preference": true,
//              "email_preference": false
//      };
app.post("/api/update/user/notification_preferences", async (req, res) => setNotificationPreferences(req, res));

// Adds following teams
// Need to figure out how to actually pass in the teams
// Expects an array with names of team names 
app.post("/api/update/user/following_teams", async (req, res) => setFollowingTeams(req, res));


// Expects an array with the teams to unfollow 
app.post("/api/delete/user/following_teams", async (req, res) => deleteFollowingTeams(req, res));



// Adds following games
// Need to figure out how to actually pass in the games
// Expects an array with names of games ids 
app.post("/api/update/user/following_games", async (req, res) => updateFollowingGames(req, res));

// Deletes following games
// Expects an array with the teams to unfollow 
app.post("/api/delete/user/following_games", async (req, res) => deleteFollowingGames(req, res))

// will change to:
// /api/update/login
app.post("/api/login", async (req, res) => login(req, res))



app.put('/api/update/NFLStandings', async (req, res) => updateStandingsNFL(req, res))





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


app.get('/api/get/nextUpcomingGame', (req, res) => getMostRecentGame(req, res))





// will change to:
// /api/get/dailyGamesNBA
app.get("/api/dailyGamesNBA", (req, res) => dailyGames(req, res));


// will change to:
// /api/get/gameInDBNBA/:gameId
app.get("/api/gameInDBNBA/:gameId", (req, res) => gameInDBNBA(req, res));


// will change to:
// /api/get/loadNFLSZN
app.get("/api/loadNFLSZN", (req, res) => loadNFLSZN(req, res));


// will change to:
// /api/get/getWeeklyNFLGames/:week
app.get("/api/getWeeklyNFLGames/:week", (req, res) =>
    getWeeklyNFLGames(req, res)
);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(["/", "/*"], (req, res) => {
    console.log(path.join(__dirname, "../build/index.html"));
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

exports.app = app;
exports.db = db;

