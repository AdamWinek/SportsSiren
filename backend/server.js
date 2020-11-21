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
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
let jwt = require("jsonwebtoken");
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

let twilioInstance = new twilio(accountSid, authToken);

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
app.post("/api/registerUser", async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
      let user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        password: hash,
      });

      try {
        await user.save();
        res.json({
          message: "User Added",
        });
      } catch (e) {
        res.json({
          message: e.toString(),
        });
      }
    });
  } catch (e) {
    res.json({
      message: e.toString(),
    });
  }
});

// Expects object
//     let thresholdObject = {
//          "score_threshold": 3, 
//          "time_threshold": 10
// };
app.post("/api/update/user/notification_thresholds", async (req, res) => {
    let updatedUser = await User.findOneAndUpdate(
      { _id: currentUser._id },
      {
          $set: {
          score_threshold: thresholdObject.score_threshold,
          time_threshold: thresholdObject.time_threshold,
          },
        },
        { safe: true, upsert: true, new: true },
        function (err, model) {
        console.log(err);
      }
    );
    console.log("trinyg to update user");
  
    console.log(updatedUser);
  


})





// Expects object
// parameter_obj = {
//              "phone_preference": true,
//              "email_preference": false
//      };
app.post("/api/update/user/notification_preferences", async (req, res) => {
  let contact_preferences = {
    text_preference: false,
    email_preference: false,
  };
  let updatedUser = await User.findOneAndUpdate(
    { _id: currentUser._id },
    {
      $set: {
        text_preference: contact_preferences.text_preference,
        email_preference: contact_preferences.email_preference,
      },
    },
    { safe: true, upsert: true, new: true },
    function (err, model) {
      console.log(err);
    }
  );
  console.log("trinyg to update user");

  console.log(updatedUser);
});

// Adds following teams
// Need to figure out how to actually pass in the teams
// Expects an array with names of team names 
app.post("/api/update/user/following_teams", async (req, res) => {
  let currentUser = await User.findOne({ email: req.body.email }).exec();
  let newFollowingArray = ["Gunners", "Tots", "Patriots", "Eagles"];
  let updatedUser = await User.findOneAndUpdate(
    { _id: currentUser._id },
    { $addToSet: { following_teams: { $each: newFollowingArray } } },
    { safe: true, upsert: true, new: true },
    function (err, model) {
      console.log(err);
    }
  );
  console.log("trinyg to update user");

  console.log(updatedUser);

  console.log("SETTING NEW FOLLOWING PREFERENCES");
});

// Expects an array with the teams to unfollow 
app.post("/api/delete/user/following_teams", async (req, res) => {
  let currentUser = await User.findOne({ email: req.body.email }).exec();
  let toRemove = ["Patriots", "Eagles"];
  let updatedUser = await User.findOneAndUpdate(
    { _id: currentUser._id },
    { $pullAll: { following_teams: toRemove } },
    { safe: true, upsert: true, new: true },
    function (err, model) {
      console.log(err);
    }
  );
  console.log("removed from user");

  console.log(updatedUser);
});


// Adds following games
// Need to figure out how to actually pass in the games
// Expects an array with names of games ids 
app.post("/api/update/user/following_games", async (req, res) => {
    let currentUser = await User.findOne({ email: req.body.email }).exec();
    let newFollowingArray = ["213b8eda-43d8-4e62-9951-ed4c605fca0d", "213b8eda-43d8-4e62-9951-ed4c605fca0d", "10339048-8c6b-43c7-ae7c-d68cf44417d3", "5a5b0a83-1765-4729-b914-73ff7d4c4c89"];
    let updatedUser = await User.findOneAndUpdate(
      { _id: currentUser._id },
      { $addToSet: { following_games: { $each: newFollowingArray } } },
      { safe: true, upsert: true, new: true },
      function (err, model) {
        console.log(err);
      }
    );
    console.log("trinyg to update user");
  
    console.log(updatedUser);
  
    console.log("SETTING NEW FOLLOWING PREFERENCES");
  });
  
  // Deletes following games
  // Expects an array with the teams to unfollow 
  app.post("/api/delete/user/following_teams", async (req, res) => {
    let currentUser = await User.findOne({ email: req.body.email }).exec();
    let toRemove = ["213b8eda-43d8-4e62-9951-ed4c605fca0d", "213b8eda-43d8-4e62-9951-ed4c605fca0d"];
    let updatedUser = await User.findOneAndUpdate(
      { _id: currentUser._id },
      { $pullAll: { following_games: toRemove } },
      { safe: true, upsert: true, new: true },
      function (err, model) {
        console.log(err);
      }
    );
    console.log("removed from user");
  
    console.log(updatedUser);
  });


// will change to:
// /api/update/login
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  let currentUser = await User.findOne({ email: req.body.email }).exec();
  if (currentUser == undefined) {
    res.status(400);
    res.json({
      message: "No user associated with email",
    });
  } else if (req.body.password == undefined) {
    res.status(400);
    res.json({
      message: "wrong password",
    });
    return;
  }





  bcrypt.compare(req.body.password, currentUser.password, function (
    err,
    result
  ) {
    if (!result || err) {
      res.status(400);
      res.json({
        message: "Their was an error with your password",
      });
    } else {
      let token = jwt.sign({ email: req.body.email }, "daSecretToken", {
        expiresIn: "1h",
      });

      res.status(200);
      res.json({
        token: token,
        email: req.body.email,
        fname: currentUser.fname,
        lname: currentUser.lname,
        phone: currentUser.phone,
      });
    }
  });
});

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
app.get("/api/sendNotification", async (req, res) => {
  if (req.body.token == undefined) {
    res.json({
      message: "You need to login to use this route",
    });
  }
  try {
    let decoded = jwt.verify(req.body.token, "daSecretToken");

    let msg = await twilioInstance.messages.create({
      body: req.body.message,
      to: req.body.phone, // Text this number
      from: "+18285200670", // The number we bought
    });
    console.log(msg);
    console.log(decoded);

    res.json({
      error: msg.error_message,
      status: msg.status,
    });
  } catch (err) {
    res.json({
      message: err.toString(),
    });
  }
});

//get routes from GameController
const { dailyGamesNBA } = require("./GameController.js");

// will change to:
// /api/get/dailyGamesNBA
app.get("/api/dailyGamesNBA", (req, res) => dailyGames(req, res));

const { gameInDBNBA } = require("./GameController.js");

// will change to:
// /api/get/gameInDBNBA/:gameId
app.get("/api/gameInDBNBA/:gameId", (req, res) => gameInDBNBA(req, res));

const { loadNFlSZN } = require("./GameController.js");

// will change to:
// /api/get/loadNFLSZN
app.get("/api/loadNFLSZN", (req, res) => loadNFLSZN(req, res));

const { getWeeklyNFLGames } = require("./GameController.js");

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
