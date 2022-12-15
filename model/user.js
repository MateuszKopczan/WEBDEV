const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    id: String,
    imie: String,
    nazwisko: String,
    email: String,
    wiek: Number
})

const User  = mongoose.model("users", userSchema)

console.log("[INFO] User model loaded!")
module.exports = User 