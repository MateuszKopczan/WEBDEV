const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    id: {
        type: String,
    },
    imie: {
        type: String,
    },
    nazwisko: {
        type: String,
    },
    haslo: {
        type: String,
    },
    email: {
        type: String,
    }
})

const User  = mongoose.model("User", userSchema)

console.log("[INFO] User model loaded!")
module.exports = User 