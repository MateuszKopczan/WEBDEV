const mongoose = require('mongoose')

const PictureSchema = new mongoose.Schema({
    nazwa: {
        type: String,
        required: true
    },
    sciezka: {
        type: String,
        default: './images'
    },
    rozmiar: {
        type: Number,
        max: 10000
    }
});

const Picture = mongoose.model('Picture', PictureSchema);

module.exports = Picture;