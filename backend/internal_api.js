const axios = require('axios')
const mongoose = require('mongoose');
const NBAGame = require("./models/NBAGame")
const NBATeam = require("./models/NBATeam");
const NFLGame = require('./models/NFLGame');
const NFLTeam = require('./models/NFLGame')
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://AdamLeonHoulton:AdamLeonHoulton@sportssiren.rrbya.mongodb.net/SportsSiren?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;
const User = require("./models/User");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
let jwt = require("jsonwebtoken");


let updateFollowingTeams = async function (new_teams) {
    let tttt = ["Patriots", "Bucaneers"];
    let updatedUser = await User.findByIdAndUpdate(
        info._id,
        {$push: {"following": tttt}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
    );
}

async function setNotificationThresholds(req, res) {
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
  

}

async function setNotificationPreferences(req, res) {
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



}
async function setFollowingTeams(req, res) {
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
}
async function deleteFollowingTeams(req, res) {
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
  

}

async function updateFollowingGames(req, res) {
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
}


async function deleteFollowingGames(req, res) {
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


}
async function login(req, res) {
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
  

}

async function sendNotification(req, res) {

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
}

async function registerUser(req, res) {
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
}

module.exports.setNotificationThresholds = setNotificationThresholds;
module.exports.setNotificationPreferences = setNotificationPreferences;
module.exports.setFollowingTeams = setFollowingTeams;
module.exports.deleteFollowingTeams = deleteFollowingTeams;
module.exports.updateFollowingGames = updateFollowingGames;
module.exports.deleteFollowingGames = deleteFollowingGames;
module.exports.login = login;
module.exports.sendNotification = sendNotification;
module.exports.registerUser = registerUser;

