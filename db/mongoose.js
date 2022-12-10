const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/galleryDB';
mongoose.set('strictQuery', true);


mongoose.connect(url)