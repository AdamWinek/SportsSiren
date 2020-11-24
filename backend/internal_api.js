const axios = require('axios')
const mongoose = require('mongoose');
const NBAGame = require("./models/NBAGame")
const NBATeam = require("./models/NBATeam");
const NFLGame = require('./models/NFLGame');
const NFLTeam = require('./models/NFLTeam')
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
  console.log(req.body.email);
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
  console.log("twilio is sending");
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



async function handleNotification(req, res) {
  let game = req.body.game;
  let quarter = 0
  if (game.qtr != undefined) {
    let quarter
    if (quarter == 'final') {
      quarter = 0
    } else {
      quarter = Number.parseInt(game.qtr)

    }
  }

  let methodUrl = "https://sports-siren.herokuapp.com/api/"
  console.log(process.env.REACT_APP_DEV_ENV)
  if (process.env.REACT_APP_DEV_ENV == "development") {
    methodUrl = "http://localhost:3000/api/"
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

  toNotify.forEach(async (subscription) => {
    if (subscription.onStart != undefined && subscription.onStart) {
      // has notification been sent
      if (!subscription.notifiedGames.contains(identifier) && timeUntilEnd > 0) {

        if (subscription.viaText) {
          let notify_message = `Sports Siren Alert!! ${game.homeAbbr} vs. ${game.awayAbbr} has started. Tune into the game now`

          let response = await axios({
            method: "POST",
            url: methodUrl + "create/sendText",
            data: {
              phone: subscription.phone,
              message: notify_message,
            },
          });
          //sendTextMessage(`Sports Siren Alert!! ${game.homeAbbr} vs. ${game.awayAbbr} has started. Tune into the game now!`, subscription.phone)
        }
        if (subscription.viaEmail) {
          let notify_message = `Sports Siren Alert!! ${game.homeAbbr} vs. ${game.awayAbbr} has started. Tune into the game now`

          let response = await axios({
            method: "POST",
            url: methodUrl + "create/sendEmail",
            data: {
              email: subscription.email,
              message: notify_message,
            },
          });
          //sendTextMessage(`Sports Siren Alert!! ${game.homeAbbr} vs. ${game.awayAbbr} has started. Tune into the game now!`, subscription.phone)
        }

      }

      //send notification

      subscription.notifiedGames.push({ gameId: game.gameId }).save()



    } else if (subscription.onEnd != undefined && subscription.onEnd) {
      // notification hasnt been sent
      if (!subscription.notifiedGames.contains(identifier) && timeUntilEnd == 0) {
        if (subscription.viaText) {
          let notify_message = `Sports Siren Alert!! ${game.homeAbbr} vs. ${game.awayAbbr} has ended. Final score ${game.homeAbbr}:${game.homeTotalScore} to ${game.awayAbbr}:${game.awayTotalScore}`

          let response = await axios({
            method: "POST",
            url: methodUrl + "create/sendText",
            data: {
              phone: subscription.phone,
              message: notify_message,
            },
          });

          //sendTextMessage(`Sports Siren Alert!! ${game.homeAbbr} vs. ${game.awayAbbr} has ended. Final score ${game.homeAbbr}:${game.homeTotalScore} to ${game.awayAbbr}:${game.awayTotalScore}`, subscription.phone)
        }
        if (subscription.viaEmail) {
          let notify_message = `Sports Siren Alert!! ${game.homeAbbr} vs. ${game.awayAbbr} has ended. Final score ${game.homeAbbr}:${game.homeTotalScore} to ${game.awayAbbr}:${game.awayTotalScore}`

          let response = await axios({
            method: "POST",
            url: methodUrl + "create/sendEmail",
            data: {
              email: subscription.email,
              message: notify_message,
            },
          });

          //sendTextMessage(`Sports Siren Alert!! ${game.homeAbbr} vs. ${game.awayAbbr} has ended. Final score ${game.homeAbbr}:${game.homeTotalScore} to ${game.awayAbbr}:${game.awayTotalScore}`, subscription.phone)
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
          let notify_message = `Sports Siren Alert!! ${game.homeAbbr} vs. ${game.awayAbbr}. The game has ${subscription.timeUntilEnd} minutes left.Current score ${game.homeAbbr}: ${game.homeTotalScore} to ${game.awayAbbr}: ${game.awayTotalScore}`


          let response = await axios({
            method: "POST",
            url: methodUrl + "create/sendText",
            data: {
              phone: subscription.phone,
              message: notify_message,
            },
          })
        }
        if (subscription.viaEmail) {
          let notify_message = `Sports Siren Alert!! ${game.homeAbbr} vs. ${game.awayAbbr}. The game has ${subscription.timeUntilEnd} minutes left.Current score ${game.homeAbbr}: ${game.homeTotalScore} to ${game.awayAbbr}: ${game.awayTotalScore}`


          let response = await axios({
            method: "POST",
            url: methodUrl + "create/sendEmail",
            data: {
              email: subscription.email,
              message: notify_message,
            },
          });
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



// api/delete/subscriptions

async function deleteSubscription(req, res) {
  if (req.body.subs == undefined) {
    console.log(req.body)
    res.json({ message: "must pass in an array of subs" })

  } else {
    console.log(req.body.subs)
    try {
      req.body.subs.forEach(async (sub) => {
        await Subscription.deleteOne({ _id: sub._id })
      })
      res.json({ message: "Subscriptions Deleted" })



    } catch (err) {
      res.json({ message: err.toString() })

    }
  }

}


async function updateSubscription(req, res) {
  if (req.body.newSub == undefined) {
    res.json({ message: "must pass in event form information" })

  } else if (req.body.subs == undefined) {
    res.json({ message: "must pass in sub objects to be edited" })

  } else if (req.body.user == undefined) {

    res.json({ message: "must pass in user object" })

  } else {
    //pass in a list of current subscription objects
    //pass in a form object object

    //sample new sub
    //   const [data, setData] = useState({
    //     sms: null,
    //     email: null,
    //     startofgame: null,
    //     endofgame: null,
    //     within: null,
    //     time: null,
    //     threshold: null,
    // });


    let type = req.body.subs[0].type
    let identifier = req.body.subs[0].identifier


    try {
      let status = ""
      //add start record
      if (req.body.newSub.startofgame) {
        let current = req.body.subs.pop()
        if (current == undefined) {
          current = ObjectId()
        }


        Subscription.findOneAndUpdate(
          { _id: current._id },
          {
            $set: {
              type: type,
              fname: req.body.user.fname,
              lname: req.body.user.lname,
              email: req.body.user.email,
              phone: req.body.user.phone,
              // league name or team name or gameId
              identifier: identifier,
              notifiedGames: [],
              viaEmail: req.body.newSub.email,
              viaText: req.body.newSub.sms,
              onStart: true,
              onEnd: false,
              timeCriteria: null,
              scoreCriteria: null

            }
          }, { safe: true, upsert: true, new: true }, (err) => {
            if (err) {
              console.log(err.toString())
            }
          })
      }


      // adds end of game notification if neccesary
      if (req.body.newSub.endofgame) {
        let current = req.body.subs.pop()
        if (current == undefined) {

          current = ObjectId()
        }

        Subscription.findOneAndUpdate(
          { _id: current._id },
          {
            $set: {
              type: type,
              fname: req.body.user.fname,
              lname: req.body.user.lname,
              email: req.body.user.email,
              phone: req.body.user.phone,
              // league name or team name or gameId
              identifier: identifier,
              notifiedGames: [],
              viaEmail: req.body.newSub.email,
              viaText: req.body.newSub.sms,
              onEnd: true,
              onStart: false,
              timeCriteria: null,
              scoreCriteria: null
            }
          }, { safe: true, upsert: true, new: true }, (err) => {
            if (err) {
              console.log(err.toString())
            }
          })
      }

      // adds score notification if neccesary
      if (req.body.newSub.within) {
        let current = req.body.subs.pop()
        if (current == undefined) {
          current = ObjectId()
        }
        Subscription.findOneAndUpdate(
          { _id: current._id },
          {
            $set: {
              type: type,
              fname: req.body.user.fname,
              lname: req.body.user.lname,
              email: req.body.user.email,
              phone: req.body.user.phone,
              // league name or team name or gameId
              identifier: identifier,
              notifiedGames: [],
              viaEmail: req.body.newSub.email,
              viaText: req.body.newSub.sms,
              onEnd: false,
              onStart: false,
              scoreCriteria: req.body.newSub.threshold,
              timeCriteria: req.body.newSub.time
            }
          }, { safe: true, upsert: true, new: true }, (err) => {
            if (err) {
              console.log(err.toString())
            }
          })
        //console.log(status)
      }

      // get rid of extra subs if any
      if (req.body.subs.length > 0) {
        req.body.subs.forEach(async (sub) => {
          await Subscription.deleteOne({ _id: sub._id })
        })

      }

      res.json({ message: "subs updated" })
    } catch (err) {
      console.log(err.toString())
      res.json({ message: err.toString() })
    }
  }
}


async function newSubscription(req, res) {
  if (req.body.newSub == undefined) {
    res.json({ message: "must pass in event form information" })

  } else if (req.body.user == undefined) {

    res.json({ message: "must pass in user object" })

  } else {
    //pass in a list of current subscription objects
    //pass in a form object object

    //sample new sub
    //   const [data, setData] = useState({
    //     sms: null,
    //     email: null,
    //     startofgame: null,
    //     endofgame: null,
    //     within: null,
    //     time: null,
    //     threshold: null,
    // });

    // adds start of game record
    console.log(req.body)

    try {
      if (req.body.newSub.startofgame) {
        let sub = new Subscription({
          type: req.body.type,
          fname: req.body.user.fname,
          lname: req.body.user.lname,
          email: req.body.user.email,
          phone: req.body.phone,
          // league name or team name or gameId
          identifier: req.body.identifier,
          notifiedGames: [],
          viaEmail: req.body.newSub.email,
          viaText: req.body.newSub.sms,
          onStart: req.body.newSub.startofgame,

        })
        sub.save()

      }


      // adds end of game notification if neccesary
      if (req.body.newSub.endofgame) {
        let sub = new Subscription({
          type: req.body.type,
          fname: req.body.user.fname,
          lname: req.body.user.lname,
          email: req.body.user.email,
          phone: req.body.phone,
          // league name or team name or gameId
          identifier: req.body.identifier,
          notifiedGames: [],
          viaEmail: req.body.newSub.email,
          viaText: req.body.newSub.sms,
          onEnd: req.body.newSub.endofgame,

        })
        sub.save()

      }

      // adds end of game notification if neccesary
      if (req.body.newSub.within) {
        let sub = new Subscription({
          type: req.body.type,
          fname: req.body.user.fname,
          lname: req.body.user.lname,
          email: req.body.user.email,
          phone: req.body.phone,
          // league name or team name or gameId
          identifier: req.body.identifier,
          notifiedGames: [],
          viaEmail: req.body.newSub.email,
          viaText: req.body.newSub.sms,
          scoreCriteria: req.body.newSub.threshold,
          timeCriteria: req.body.newSub.time

        })
        sub.save()
      }
      res.json({ message: "subs created" })
    } catch (err) {
      res.json({ message: err.toString() })
    }
  }
}

async function deleteAccount(req, res) {

  console.log(req.body, "here")
  try {
    await User.deleteOne({ email: req.body.email }, function (err) {
      if (err) { console.log(err.toString()) };
    });
    res.json({ message: "user deleted" });


  } catch (err) {
    res.json({ message: err.toString() })
  }
}

async function updatePassword(req, res) {

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
}

async function updatePhone(req, res) {

  try {
    await User.updateOne({ email: req.body.email }, { $set: { phone: req.body.phone } });
    res.json({ message: "phone changed" });

  } catch (err) {
    res.json({ message: "There was an error with your phone" })

  }
}

//creates NFL table 
// we do not want this to be 
async function createNFLteams() {
  let here = await NFLGame.find({}).exec()
  console.log(here)

  here.map(async (game) => {
    try {

      let team = new NFLTeam({
        name: game.homeTeam
      })
      await team.save()

    } catch (err) {

      console.log(err)
    }


  })
}

async function searchTeams(req, res) {

  if (req.params.searchText == undefined) {
    res.json({ message: "must pass in searchText" });

  } else {
    try {
      if (req.params.searchText == "") {
        res.json({ teams: [] })
      }


      let results = await NFLTeam.find({ name: { '$regex': `${req.params.searchText}`, '$options': 'i' } }, (err) => {
        if (err) {
          console.log(err)
        }
      }).exec()
      res.json({ teams: results })


    } catch (err) {
      console.log(err)
      res.json({ message: err.toString() })

    }

  }

}


async function getAllTeams(req, res) {

  try {
    if (req.params.searchText == "") {
      res.json({ teams: [] })
    }
    let results = await NFLTeam.find({}, (err) => {
      if (err) {
        console.log(err)
      }
    }).exec()
    res.json({ teams: results })


  } catch (err) {
    console.log(err)
    res.json({ message: err.toString() })

  }



}





module.exports.setNotificationThresholds = setNotificationThresholds;
module.exports.handleNotification = handleNotification;
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
module.exports.deleteSubscription = deleteSubscription;
module.exports.updateSubscription = updateSubscription;
module.exports.deleteAccount = deleteAccount;
module.exports.updatePassword = updatePassword;
module.exports.updatePhone = updatePhone;
module.exports.searchTeams = searchTeams
module.exports.getAllTeams = getAllTeams
module.exports.newSubscription = newSubscription