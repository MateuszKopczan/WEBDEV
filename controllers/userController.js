var User = require('../model/user');
const moment = require('moment');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('node-localstorage')


exports.register = (req, res, next) => {
    if(req.body.imie === '' || req.body.nazwisko === '' || req.body.email === '' || req.body.haslo === ''){
        const datetime = moment().format();
        console.log(datetime + "[INFO] Register for '" + req.body.email + "' failed");
        res.render('register', {message: 'Fill all fields'})
        return
    }
    bcrypt.hash(req.body.haslo, 10, function (err, passwordHash) {
        if(err){
            const datetime = moment().format();
            console.log(datetime + "[ERROR][/register] " + err);
            res.render('register', {message: 'Provide password'})
            return
        }

        let user = new User({
            imie: req.body.imie,
            email: req.body.email,
            nazwisko: req.body.nazwisko,
            haslo: passwordHash,
        })

        user.save().then(() => {
            const datetime = moment().format();
            console.log(datetime + ' [INFO] User registered successfully');
            res.render('login', {})
        }).catch(() => {
            const datetime = moment().format();
            console.log(datetime + ' [ERROR][/register] Internal error');
            res.render('error', {})
        })
    })
}

exports.showRegisterForm = function(req, res) {
    res.render('register');
}

exports.login = (req, res, next) => {
    console.log("1234")

    var email = req.body.email;
    var haslo = req.body.haslo;

    User.findOne({email})
        .then(user => {
            if (user){
                bcrypt.compare(haslo, user.haslo, function(err, result){
                    if (err) {
                        const datetime = moment().format();
                        console.log(datetime + "[INFO] Login for '" + email + "' failed");
                        res.render('login', {message: 'Wrong username or password'})
                    }
                    if (result) {
                        let token = jwt.sign(
                            {
                                email : user.email
                            }, 
                            'kodSzyfrujacy', 
                            {
                                expiresIn: '1h'
                            })
                        localStorage.setItem('token', token);
                        res.redirect('/pictures');
                    } else {
                        const datetime = moment().format();
                        console.log(datetime + "[INFO] Login for " + email + " failed");
                        res.render('login', {message: 'Wrong username or password'})
                    }
                })
            } else {
                const datetime = moment().format();
                console.log(datetime + "[INFO] Login for " + email + " failed");
                res.render('login', {message: 'Wrong username or password'})
            }
        })
}

exports.showLoginForm = function(req, res) {
    res.render('login');
}

exports.findAll = function(req, res) {

    const getUsers = async () => {
        User.find()
            .then(data => {
                const datetime = moment().format();
                console.log(datetime + " [INFO] Fetch all users");
                res.send(data);
            })
            .catch(err => {
                const datetime = moment().format();
                console.log(datetime + "[ERROR][/users]" + err);
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });
    }

    getUsers();
}

exports.save = function(req, res) {

    if(!req.body.imie || !req.body.nazwisko || !req.body.email || !req.body.wiek){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const user = new User({
        imie: req.body.imie,
        nazwisko: req.body.nazwisko,
        email: req.body.email,
        wiek: req.body.wiek
    })

    const createUser = async() => {
        user.save(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                const datetime = moment().format();
                console.log(datetime + "[ERROR][/users]" + err);
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the User."
                });
            })
    }
        
    createUser();
}

exports.findById = function(req, res) {
    const id = req.params.id;

    const getById = async() => {
        User.findById(id)
            .then(data => {
                if (!data)
                    res.status(404).send({ message: "Not found User with id " + id });
                else 
                    res.send(data);
            })
            .catch(err => {
                const datetime = moment().format();
                console.log(datetime + "[ERROR][/users]" + err);
                res
                .status(500)
                .send({ message: "Error retrieving User with id=" + id });
            });
    }

    getById();
}

exports.modify = function(req, res) {

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    const modify = async() => {
        User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot update User with id=${id}.`
                    });
                } 
                else 
                    res.send({ message: "User was updated successfully." });
            })
            .catch(err => {
                const datetime = moment().format();
                console.log(datetime + "[ERROR][/users]" + err);
                res.status(500).send({
                    message: "Error updating User with id=" + id
                });
            });
    }
    modify()
}

exports.deleteById = function(req, res) {
    const id = req.params.id

    const remove = async() => {
        User.findByIdAndRemove(id)
            .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}.`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
            })
            .catch(err => {
                const datetime = moment().format();
                console.log(datetime + "[ERROR][/users]" + err);
                res.status(500).send({
                    message: "Could not delete User with id=" + id
                });
            });
    }

    remove();
    
}

console.log("[INFO] User Controller works!")