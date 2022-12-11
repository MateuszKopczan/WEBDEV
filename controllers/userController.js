var User = require('../model/user');
const moment = require('moment');

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