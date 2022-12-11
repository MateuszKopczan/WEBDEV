const express = require('express')
const bodyParser = require('body-parser')
const port = 8080
const usersRoutes = require('./routes/users.js')
const pictureRoutes = require('./routes/pictures.js')
const mongoose = require('./db/mongoose')

const app = express()

app.use(bodyParser.json())
app.use('/users', usersRoutes)
app.use('/pictures', pictureRoutes)
app.set('view engine', 'hbs')

app.listen(port, () => {
    console.log(`[INFO] App listening on port ${port}`)
})
