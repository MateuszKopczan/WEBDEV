const express = require('express')
const bodyParser = require('body-parser')
const port = 8080
const usersRoutes = require('./routes/users.js')
const pictureRoutes = require('./routes/pictures.js')
const mongoose = require('./db/mongoose')
const handlebars = require('express-handlebars')
const LocalStorage = require('node-localstorage').LocalStorage;
var path = require('path')


const app = express()

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use('/users', usersRoutes)
app.use('/pictures', pictureRoutes, express.static(path.join(__dirname, 'public')))
app.set('view engine', 'hbs')
app.engine('hbs', handlebars.engine({
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));

console.log(path.join(__dirname, 'public'))


if (typeof localStorage === "undefined" || localStorage === null){
    localStorage = new LocalStorage('./scratch');
}




app.listen(port, () => {
    console.log(`[INFO] App listening on port ${port}`)
})
