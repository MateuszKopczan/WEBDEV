'use strict';

var util = require('util');

module.exports = {
    getUser: getUser,
    editUser: editUser,
    deleteUser: deleteUser
  };
  

function getUser(req, res){
    var id = req.swagger.params.id.value || -1;
    
    // 1. If user not exists
    if(id == -1){
        res.status(400);
        res.json({"code": "USER_NOT_FOUND", "message": "User with given ID not exist"});
    } 

    // 2. Get user from DB

    res.status(200);
    res.json({"username": "jan.kowalski", "firstName": "Jan", "lastName": "Kowalski"});
}


function editUser(req, res){
    var id = req.swagger.params.id.value || -1;
    const { firstName, lastName } = req.body;
    // 1. Get User from DB

    // 2. If user not exists
    if(id == -1){
        res.status(400);
        res.json({"code": "USER_NOT_FOUND", "message": "User with given ID not exist"});
    } 

    // 3. Edit user data
    
    // 4. Save user
    res.set('Content-Type', 'text/plain');
    res.status(200).send();
}

function deleteUser(req, res){
    var id = req.swagger.params.id.value || -1;

    // 1. If user not exists
    if(id == -1){
        res.status(400);
        res.json({"code": "USER_NOT_FOUND", "message": "User with given ID not exist"});
    } 

    // 2. Delete user from DB with given ID
    res.set('Content-Type', 'text/plain');
    res.status(200).send();
}
  