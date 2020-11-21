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
const { dailyGamesNBA } = require("./GameController.js");
const { gameInDBNBA } = require("./GameController.js");
const { loadNFlSZN } = require("./GameController.js");
const { getWeeklyNFLGames } = require("./GameController.js");
const {setNotificationThresholds} = require("./internal_api.js");
const {setNotificationPreferences} = require("./internal_api.js");
const {setFollowingTeams} = require("./internal_api.js");
const {deleteFollowingTeams} = require("./internal_api.js");
const {updateFollowingGames} = require("./internal_api.js");
const {deleteFollowingGames} = require("./internal_api.js");
const {login} = require("./internal_api.js");
const {sendNotification} = require("./internal_api.js");
const {registerUser} = require("./internal_api.js");



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
app.post("/api/delete/user/following_teams", async (req, res) => deleteFollowingTeams(req, res))

// will change to:
// /api/update/login
app.post("/api/login", async (req, res) => login(req, res))

// to use a protected route you must include token in the body of the request
// inside a protected route you need to check if a token has been included and is correct
app.get("/api/sampleProtectedRoute", async (req, res) => {
  if (req.body.token == undefined) {
    res.json({
      message: "You need to login to use this route",
    });
  }
  try {
    let decoded = jwt.verify(req.body.token, "daSecretToken");
    res.json({
      message: "ya did it",
    });
  } catch (err) {
    res.json({
      message: "wrong token",
    });
  }
});

// will change to:
// /api/create/sendNotification
app.get("/api/sendNotification", async (req, res) => sendNotification(req, res));


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

