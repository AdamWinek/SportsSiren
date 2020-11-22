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
const Subscription = require('./models/Subscription');
const { Enqueue } = require('twilio/lib/twiml/VoiceResponse');
const twilio = require("twilio");
const e = require('express');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
let twilioInstance = new twilio(accountSid, authToken);


let updateFollowingTeams = async function (new_teams) {
  let tttt = ["Patriots", "Bucaneers"];
  let updatedUser = await User.findByIdAndUpdate(
    info._id,
    { $push: { "following": tttt } },
    { safe: true, upsert: true, new: true },
    function (err, model) {
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
}
async function login(req, res) {
  let currentUser = await User.findOne({ email: req.body.email }).exec();
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

};




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
    let formatted_phone = "";
    if (req.body.telephone.includes("-")) {
      console.log("1" + req.body.telephone.replace(/-/g, ""));
      formatted_phone = "+1" + req.body.telephone.replace(/-/g, "");
    }
    else {
      formatted_phone = "+1" + req.body.telephone;
    }
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
      let user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: formatted_phone,
        password: hash,
      });

      try {
        await user.save();
        res.json({
          message: "User Added",
        });
      } catch (e) {
        console.log(e);
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


async function createSubscription(req, res) {

  //type needs to be game league or team
  if (!(req.body.type == 'game' || req.body.type == 'league' || req.body.type == 'team')) {

    res.json({
      message: "incorrect type field"
    })
  }


  try {
    let subscription = new Subscription({
      type: req.body.type,
      associatedUser: req.body.user,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      phone: req.body.phone,
      identifier: req.body.identifier,
      notifiedGames: [],
      viaEmail: req.body.viaEmail,
      viaText: req.body.viaText,
      scoreCriteria: req.body.scoreCriteria,
      timeCriteria: req.body.timeCriteria,
      onStart: req.body.onStart,
      onEnd: req.body.onEnd
    })
    await subscription.save()

    res.json({
      message: "Subscription Created"
    })

  } catch (err) {
    res.json({
      message: err.toString()
    })

  }


}



async function handleNotification(game) {
  let quarter = 0
  if (game.qtr != undefined) {
    let quarter
    if (quarter == 'final') {
      quarter = 0
    } else {
      quarter = Number.parseInt(game.qtr)

    }
  }

  // time to add for each quarter
  let timeUntilEnd = 0

  timeUntilEnd += (60 - (quarter * 15))

  //gets time from
  if (game.clock != undefined) {
    let time = game.clock.split(":")
    timeUntilEnd += parseInt(time[0])

  }
  // difference in Score
  let scoreDelta = Math.abs(game.homeTotalScore - game.awayTotalScore)
  let toNotify = []
  //get NFL subscription object
  toNotify = toNotify.concat(await Subscription.find({
    type: "league", identifier: "NFL"
  }).exec())
  //get homeTeam subscription object
  toNotify = toNotify.concat(await Subscription.find({
    type: "team", identifier: game.homeAbbr
  }).exec())

  //get awayTeam subscription object
  toNotify = toNotify.concat(await Subscription.find({
    type: "team", identifier: game.awayAbbr
  }).exec())


  //get gameId subscription object
  toNotify = toNotify.concat(await Subscription.find({
    type: "game", identifier: game.gameId
  }).exec())

  toNotify.forEach((subscription) => {
    if (subscription.onStart != undefined && subscription.onStart) {
      // has notification been sent
      if (!subscription.notifiedGames.contains(identifier) && timeUntilEnd > 0) {

        if (subscription.viaText) {
          sendTextMessage(`Sports Siren Alert!! ${game.homeAbbr} vs. ${game.awayAbbr} has started. Tune into the game now!`, subscription.phone)
        }

      }

      //send notification

      subscription.notifiedGames.push({ gameId: game.gameId }).save()



    } else if (subscription.onEnd != undefined && subscription.onEnd) {
      // notification hasnt been sent
      if (!subscription.notifiedGames.contains(identifier) && timeUntilEnd == 0) {
        if (subscription.viaText) {
          sendTextMessage(`Sports Siren Alert!! ${game.homeAbbr} vs. ${game.awayAbbr} has ended. Final score ${game.homeAbbr}:${game.homeTotalScore} to ${game.awayAbbr}:${game.awayTotalScore}`, subscription.phone)
        }

      }

      subscription.notifiedGames.push({ gameId: game.gameId }).save()

    } else {
      let toNotify = false;

      if (subscription.scoreCriteria != undefined) {
        toNotify = scoreDelta >= subscription.scoreCriteria
      }

      if (subscription.timeCriteria != undefined) {
        toNotify = timeUntilEnd < subscription.timeCriteria
      }

      if (toNotify && !subscription.notifiedGames.contains(identifier)) {
        if (subscription.viaText) {
          sendTextMessage(`Sports Siren Alert!! ${game.homeAbbr} vs. ${game.awayAbbr}. The game has ${subscription.timeUntilEnd} minutes left.Current score ${game.homeAbbr}: ${game.homeTotalScore} to ${game.awayAbbr}: ${game.awayTotalScore}`, subscription.phone)
        }
        subscription.notifiedGames.push({ gameId: game.gameId }).save()

      }

    }
  })
}

async function sendTextMessage(message, phone) {
  let msg = await twilioInstance.messages.create({
    body: message,
    to: phone, // Text this number
    from: "+18285200670", // The number we bought
  });
}



//handleNotification({qtr: "4",clock: "09:00"})



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
    let message = `Sports Siren Alert!! ${home_object.team} vs.${away_object.team} is within ${user_threshold_score} points! Current score:
            ${home_object.score} to ${away_object.score}.Tune into the game now!`;
    // Fire twilio message
    score_threshold_sent = False;
  }
  if (game_time < user_threshold_time && score_threshold_sent) {
    let message = `Sports Siren Alert!! ${home_object.team} vs.${away_object.team} has ${game_time} left to go! Tune into the game now!`;
    // Fire twilio message
  }
}




/// app/get/userSubscriptions/userEmail

async function getUserSubscriptions(req, res) {
  //req.params.email


  if (req.params.email == undefined) {
    res.json({ message: "No Email Provided" })
  }
  try {
    let subscriptions = await Subscription.find({ email: req.params.email }, (err) => {
      if (err) {
        res.json({ message: err.toString() })
      }
    }).exec()
    let returnObj = {
      team: {}, league: {}, game: {},
    }
    subscriptions.forEach((record) => {
      let type = record.type
      let id = record.identifier
      if (returnObj[type][id] == undefined) {
        returnObj[type][id] = [record]
      } else {
        returnObj[type][id].push(record)
      }
    })

    res.json({ subscriptions: returnObj });


  } catch (err) {
    res.json({ message: err.toString() });

  }







}

// /api/get/gameById/gameId:
async function getGameById(req, res) {

  if (req.params.gameId == undefined) {
    res.json({ message: "must pass in a game id" })

  } else {
    try {
      let game = await NFLGame.findOne({ gameId: req.params.gameId }).exec()
      res.json({ game: game })



    } catch (err) {
      res.json({ message: err.toString() })

    }


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
module.exports.createSubscription = createSubscription
module.exports.getUserSubscriptions = getUserSubscriptions
module.exports.getGameById = getGameById