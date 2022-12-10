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
module.exports = User 