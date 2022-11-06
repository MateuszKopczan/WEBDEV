'use strict';

var util = require('util');

module.exports = {
    create: create,
    get: get,
    deleteGallery: deleteGallery
  };
  

function create(req, res) {
    const { name, type, category, photos } = req.body;
    // 1. Some validation
    if(name == ""){ 
        res.status(400);
        res.json({"code": "VALIDATION_ERROR", "message": "Name is mandatory"});
    }
    // 2. Save gallery to DB
    res.set('Content-Type', 'text/plain');
    res.status(201).send();
}


function get(req, res){
    var id = req.swagger.params.id.value || -1;
    // 1. Get gallery from DB

    // 2. If gallery not exists
    if(id == -1){
        res.status(400);
        res.json({"code": "GALLERY_NOT_FOUND", "message": "Gallery with given ID not exist"});
    } 

    res.status(200);
    res.json({
                "name": "Private gallery", 
                "type": "Photo gallery", 
                "category": "Animals",
                "photos": [
                    {
                        "name": "elephant",
                        "extension": "jpg",
                        "content": "1o2hfwsefegaffgegerhsafd=="
                    },
                    {
                        "name": "dog",
                        "extension": "jpg",
                        "content": "wefwhgw3r6t367rehdjerhg=="
                    }
                ]
            });
}

function deleteGallery(req, res){
    var id = req.swagger.params.id.value || -1;

    // 1. If gallery not exists
    if(id == -1){
        res.status(400);
        res.json({"code": "GALLERY_NOT_FOUND", "message": "Gallery with given ID not exist"});
    } 

    // 2. Delete gallery from DB with given ID
    res.set('Content-Type', 'text/plain');
    res.status(200).send();
}
  