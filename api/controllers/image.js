'use strict';

var model = require('../model/model.js');
var util = require('util');
var ImageResponse = require('../dto/imageResponse.js');
var ErrorResponse = require('../dto/errorResponse.js');
var OperationStatus = require('../dto/operationStatus.js')


module.exports = { 
    listImages, 
    createImage, 
    readImage,
    updateImage,
    deleteImage,
};

let gallery = model.Gallery({
    id: "1",
    name: "Gallery"
})

let exampleImage = model.Image({
    id: "1",
    galleryId: gallery.id,
    title: "Lion",
    description: "Safari lion",
    date: "2017-11-09T10:20:00.214Z",
    path: "/",
    size: 1234
})


function listImages(req, res){
    let images = [];
    images.push(exampleImage);
    
    res.status(200);
    res.json(images);
}

function createImage(req, res){
    let title = req.swagger.params.title.value || "";
    let description = req.swagger.params.description.value || "";
    let upfile = req.swagger.params.upfile.value || null;

    if(title == ""){
        res.status(400);
        res.json(new ErrorResponse("Title is mandatory"));
    }

    res.status(200);
    res.json(new ImageResponse(3, title, description, new Date(), "/", 123));
}

function readImage(req, res){
    var id = req.swagger.params.id.value || -1;

    if(id == -1){
        res.status(400)
        res.json(new ErrorResponse("Image not found"));
    }
    else{
        res.status(200);
        res.json(exampleImage1);
    }
}

function updateImage(req, res){
    var id = req.swagger.params.id.value || -1;
    const { title, description, date } = req.body;

    if(id == -1){
        res.status(400);
        res.json(new ErrorResponse("Image not found"));
    }
    else{
        exampleImage1.title = title;
        exampleImage1.description = description;
        exampleImage1.date = date;
        res.status(200);
        res.json(exampleImage1);
    }
}

function deleteImage(req, res){
    var id = req.swagger.params.id.value || -1;

    if(id == -1){
        res.status(400);
        res.json(new ErrorResponse("Image not found"));
    }
    else{
        res.status(200);
        res.json(new OperationStatus("1", "Success"));
    }

}