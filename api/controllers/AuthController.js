'use strict';

var util = require('util');

module.exports = {
    login: login,
    register: register,
  };
  

function register(req, res) {
    const { userName, password, firstName, lastName } = req.body;
    // 1. Some validation
    if(userName == "ABC"){ 
        res.status(400);
        res.json({"code": "USERNAME_NOT_UNIQUE", "message": "User with this username exists"});
    }
    // 2. Save user to DB
    res.set('Content-Type', 'text/plain');
    res.status(201).send();
}

function login(req, res){
    const { userName, password } = req.body;

    // 1. Example of validate credentials
    if(userName != "admin" && "password" != "admin"){
        res.status(400);
        res.json({"code": "INVALID_CREDENTIALS", "message": "Wrong username or password"});
    }
    // 2. Login user
    res.set('Content-Type', 'text/plain');
    res.status(200).send();
}
