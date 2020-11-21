const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
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
    password: {
        type: String
    },
    following_teams: { 
        type: Array
    }, 
    following_games: { 
        type: Array
    }, 
    text_preference: { 
        type: Boolean,
        default: false
    },
    email_preference: { 
        type: Boolean,
        default: false
    },
    score_threshold: { 
        type: Number
    },
    time_threshold: { 
        type: Number
    },



}, { timestamps: true })
const User = mongoose.model("User", userSchema);

module.exports = User

