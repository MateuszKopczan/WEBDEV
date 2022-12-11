var Picture = require('../model/picture');
const moment = require('moment');



exports.findAll = function(req, res) {
    let picturesList;

    const getPictures = async () => {
        try{
            picturesList = await Picture.find()
            res.send(picturesList);
        } catch(err){
            console.log(err);
        }
    }

    getPictures();
}

exports.save = function(req, res) {

    const createPicture = async() => {
        if(!req.body.nazwa){
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }

        const picture = new Picture({
            nazwa: req.body.nazwa,
            sciezka: req.body.sciezka,
            rozmiar: req.body.rozmiar,
        });

        picture.save(picture)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                const datetime = moment().format();
                console.log(datetime + "[ERROR][/images]" + err);
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the Picture."
                });
            })
    }

    createPicture();
}

exports.findById = function(req, res) {
    const id = req.params.id;

    const getById = async() => {

        Picture.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Picture with id " + id });
            else 
                res.send(data);
        })
        .catch(err => {
            const datetime = moment().format();
            console.log(datetime + "[ERROR][/images]" + err);
            res
              .status(500)
              .send({ message: "Error retrieving Picture with id=" + id });
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
        Picture.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot update Picture with id=${id}.`
                    });
                } 
                else 
                    res.send({ message: "Picture was updated successfully." });
            })
            .catch(err => {
                const datetime = moment().format();
                console.log(datetime + "[ERROR][/images]" + err);
                res.status(500).send({
                    message: "Error updating Picture with id=" + id
                });
            });
    }
    modify()
}

exports.deleteById = function(req, res) {
    const id = req.params.id

    const remove = async() => {
        Picture.findByIdAndRemove(id)
            .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Picture with id=${id}.`
                });
            } else {
                res.send({
                    message: "Picture was deleted successfully!"
                });
            }
            })
            .catch(err => {
                const datetime = moment().format();
                console.log(datetime + "[ERROR][/images]" + err);
                res.status(500).send({
                    message: "Could not delete Picture with id=" + id
                });
            });
    }

    remove();
    
}

console.log("[INFO] Picture Controller works!")