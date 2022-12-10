const express = require('express')
const bodyParser = require('body-parser')
const port = 8080

const usersRoutes = require('./routes/users.js')

const app = express()

app.set('view engine', 'hbs')
app.use(bodyParser.json())

app.use('/users', usersRoutes)

app.listen(port)