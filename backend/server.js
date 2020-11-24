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

// External
const { dailyGamesNBA } = require("./external_api.js");
const { gameInDBNBA } = require("./external_api.js");
const { loadNFLSZN } = require("./external_api.js");
const { getWeeklyNFLGames } = require("./external_api.js");
const { updateStandingsNFL } = require("./external_api.js")
const { getMostRecentGame } = require("./external_api")
const { sendSimulationText } = require("./external_api")
const { sendSimulationEmail } = require("./external_api")
const { sendEmail } = require("./external_api")
const { sendNotification } = require("./external_api")

// Internal 
const { setNotificationThresholds, getAllTeams, newSubscription } = require("./internal_api.js");
const { deleteSubscription } = require("./internal_api.js");
const { setNotificationPreferences } = require("./internal_api.js");
const { setFollowingTeams } = require("./internal_api.js");
const { deleteFollowingTeams } = require("./internal_api.js");
const { updateFollowingGames } = require("./internal_api.js");
const { deleteFollowingGames } = require("./internal_api.js");
const { login } = require("./internal_api.js");
const { registerUser } = require("./internal_api.js");
const { createSubscription } = require("./internal_api")
const { getUserSubscriptions } = require("./internal_api")
const { getGameById } = require("./internal_api")
const { updateSubscription } = require("./internal_api")
const { deleteAccount } = require("./internal_api")
const { updatePassword } = require("./internal_api")
const { updatePhone } = require("./internal_api")
const { searchTeams } = require("./internal_api")
const { handleNotifications } = require("./internal_api")

// parse application/json
app.use(bodyParser.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../build")));
app.get("/api", (req, res) => { res.send("Dis da Server"); });
app.post("/api/login", async (req, res) => login(req, res))


// Create: 
app.post("/api/create/registerUser", async (req, res) => registerUser(req, res));
app.post('/api/create/sendNotification', async (req, res) => sendNotification(req, res))
app.post('/api/create/sendEmail', async (req, res) => sendEmail(req, res))
app.get("/api/create/loadNFLSZN", (req, res) => loadNFLSZN(req, res));
app.post("/api/create/createSubscription", (req, res) => createSubscription(req, res));
app.post("/api/create/newSubscriptionForm", (req, res) => newSubscription(req, res))

// Read: 
app.get("/api/get/gameById/:gameId", (req, res) => getGameById(req, res))
app.get('/api/get/nextUpcomingGame', (req, res) => getMostRecentGame(req, res))
app.get('/api/get/userSubscriptions/:email', (req, res) => getUserSubscriptions(req, res))
app.get("/api/get/dailyGamesNBA", (req, res) => dailyGames(req, res));
app.get("/api/get/gameInDBNBA/:gameId", (req, res) => gameInDBNBA(req, res));
app.get("/api/get/getWeeklyNFLGames/:week", (req, res) => getWeeklyNFLGames(req, res));
app.get("/api/get/searchTeams/:searchText", (req, res) => searchTeams(req, res))
app.get("/api/get/allTeams", (req, res) => getAllTeams(req, res))
// Update:
app.post("/api/update/user/notification_thresholds", async (req, res) => setNotificationThresholds(req, res));
app.post("/api/update/user/notification_preferences", async (req, res) => setNotificationPreferences(req, res));
app.post("/api/update/user/following_teams", async (req, res) => setFollowingTeams(req, res));
app.post("/api/update/user/following_games", async (req, res) => updateFollowingGames(req, res));
app.put('/api/update/NFLStandings', async (req, res) => updateStandingsNFL(req, res))
app.put('/api/update/updatePassword', async (req, res) => updatePassword(req, res))
app.put('/api/update/updatePhone', async (req, res) => updatePhone(req, res))
app.put("/api/update/subscriptions", (req, res) => updateSubscription(req, res))
app.put("/api/update/handleNotifications", (req, res) => handleNotifications(req, res))

// Delete:
app.post("/api/delete/user/following_teams", async (req, res) => deleteFollowingTeams(req, res));
app.post("/api/delete/user/following_games", async (req, res) => deleteFollowingGames(req, res))
app.delete('/api/delete/deleteAccount', async (req, res) => deleteAccount(req, res))
app.post('/api/delete/subscriptions', (req, res) => deleteSubscription(req, res))

let agenda = require("./agenda_singleton");
let agenda_instance = agenda.getInstance();

db.once("open", function () { console.log("wereConnected"); });

app.post("/api/create/sendSimulationText", async (req, res) => {
   //console.log("in sendSimulationText");
   //console.log(req.body);
    //console.log(req);
   //console.log("--------------------scheduled_tim--------------------------------------------------");
    let message_to_send = await req.body.message;
    let user_to_send = await req.body.phone;
    let scheduled_time = await req.body.scheduled_time;
    agenda_instance.sendText(user_to_send, message_to_send, scheduled_time);
    //require('./schedule_simulation_text')(this.agenda);
    //this.agenda.now('schedule_simulation_text', {phone: phone, message: message});
})

app.post("/api/create/sendSimulationEmail", async (req, res) => {
   //console.log("in sendSimulationEmail");
   //console.log(req.body);
    //console.log(req);
   //console.log("--------------------scheduled_tim--------------------------------------------------");
    let message_to_send = await req.body.message;
    let user_to_send = await req.body.email;
    let scheduled_time = await req.body.scheduled_time;
    agenda_instance.sendEmail(user_to_send, message_to_send, scheduled_time);
    //require('./schedule_simulation_text')(this.agenda);
    //this.agenda.now('schedule_simulation_text', {phone: phone, message: message});
})

app.get(["/", "/*"], (req, res) => { console.log(path.join(__dirname, "../build/index.html")); res.sendFile(path.join(__dirname, "../build/index.html")); });
app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`); });

exports.app = app;
exports.db = db;

