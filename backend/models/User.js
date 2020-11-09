const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
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



}, { timestamps: true })
const User = mongoose.model("User", userSchema);

module.exports = User

