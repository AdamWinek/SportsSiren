const mongoose = require("mongoose");
const userSchema = require("./User");

const SubscriptionArray = new mongoose.Schema({
    gameId: {
        type: String,
    },
})

const SubscriptionSchema = new mongoose.Schema({
    type: {
        type: String,
    },

    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String
    },
    // league name or team name or gameId
    identifier: {
        type: String
    },
    notifiedGames: {
        type: [SubscriptionArray]
    },
    viaEmail: {
        type: Boolean
    },
    viaText: {
        type: Boolean
    },
    scoreCriteria: {
        type: Number
    },
    timeCriteria: {
        type: Number
    },
    onStart: {
        type: Boolean
    },
    onEnd: {
        type: Boolean
    }

})


const Subscription = mongoose.model("Subscriptions", SubscriptionSchema);
module.exports = Subscription