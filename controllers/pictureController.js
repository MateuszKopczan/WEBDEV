var Picture = require('../model/picture');
const moment = require('moment');



exports.findAll = function(req, res) {
    let picturesList;
    const getPictures = async () => {
        try{
            picturesList = await Picture.find()
            res.render('index', {title: "Gallery", items: picturesList})
        } catch(err){
            const datetime = moment().format();
            console.log(datetime + "[ERROR] " + err);
            res.render('error', {})
        }
    }
    getPictures();

    
}

exports.save = function(req, res) {

    const createPicture = async() => {
        if(!req.body.nazwa){
            const datetime = moment().format();
            console.log(datetime + "[INFO] Content can not be empty");
            res.render('error', {})
            return;
        }

        const picture = new Picture({
            nazwa: req.body.nazwa,
            sciezka: req.body.sciezka,
            rozmiar: req.body.rozmiar,
        });

        picture.save(picture)
            .then(data => {
                res.render('show', {item: data})
            })
            .catch(err => {
                const datetime = moment().format();
                console.log(datetime + "[ERROR] " + err);
                res.render('error', {})
            })
    }
    createPicture();
}

exports.saveForm = function(req, res) {
    res.render('create');
}

exports.findById = function(req, res) {
    const id = req.params.id;

    const getById = async() => {

        Picture.findById(id)
        .then(data => {
            if (!data){
                const datetime = moment().format();
                console.log(datetime + "[INFO] Not found Picture with id " + id);
                res.render('error', {})
            }
            else 
                res.render('show', {item: data});
        })
        .catch(err => {
            const datetime = moment().format();
            console.log(datetime + "[ERROR]" + err);
            res.render('error', {})
          });
    }
    getById();
}

exports.modifyForm = function(req, res) {
    const id = req.params.id;
    let picture

    const getPicture = async () => {
        try{
            picture = await Picture.findById(id)
                                .catch(err => {
                                    const datetime = moment().format();
                                    console.log(datetime + "[ERROR]" + err);
                                    res.render('error', {})
                                });
            res.render('edit', {item: picture})
        } catch(err){
            const datetime = moment().format();
            console.log(datetime + "[ERROR]" + err);
            res.render('error', {})
        }
    }
    getPicture();
}

exports.modify = function(req, res) {
    if (!req.body || Object.keys(req.body).length === 0) {
        const datetime = moment().format();
        console.log(datetime + "[INFO] Data to update can not be empty");
        res.render('error', {})
    }
    const id = req.params.id;

    const modify = async() => {
        Picture.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
            .then(data => {
                if (!data) {
                    console.log("[INFO] Cannot update Picture with id=" + id)
                    res.render('error', {})
                } 
                else {
                    console.log("[INFO] Picture was updated successfully.")
                    res.redirect('/pictures');
                }
            })
            .catch(err => {
                const datetime = moment().format();
                console.log(datetime + "[ERROR][/images]" + err);
                res.render('error', {})
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
                console.log("[INFO] Cannot delete Picture with id=" + id)
                res.render('error', {})
            } else {
                console.log("[INFO] Picture with id=" + id + " deleted successfully")
                res.redirect('/pictures');
            }
            })
            .catch(err => {
                const datetime = moment().format();
                console.log(datetime + "[ERROR] " + err);
                res.render('error', {})
            });
    }
    remove();
}

console.log("[INFO] Picture Controller works!")