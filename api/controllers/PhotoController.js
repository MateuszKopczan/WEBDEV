'use strict';

var util = require('util');

module.exports = {
    add: add,
    removePhoto: removePhoto,
  };
  

function add(req, res) {
    var id = req.swagger.params.id.value || -1;

    // 1. If gallery not exists
    if(id == -1){
        res.status(400);
        res.json({"code": "GALLERY_NOT_FOUND", "message": "Gallery with given ID not exist"});
    } 
    
    const { name, extension, content } = req.body;
    // 2. Add photo to gallery

    res.set('Content-Type', 'text/plain');
    res.status(200).send();
}

function removePhoto(req, res){
    var id = req.swagger.params.id.value || -1;
    var photo_id = req.swagger.params.photo_id.value || -1;

    // 1. If gallery not exists
    if(id == -1 ){
        res.status(400);
        res.json({"code": "GALLERY_NOT_FOUND", "message": "Gallery with given ID not exist"});
    } 

    // 2. Remove photo from gallery with given ID
    res.set('Content-Type', 'text/plain');
    res.status(200).send();
}
