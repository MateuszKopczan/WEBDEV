'use strict';

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

let exampleImage1 = new ImageResponse("1", "Lion", "Safari lion", "2022-11-30T12:00:00.000Z", "/", "1234");
let exampleImage2 = new ImageResponse("2", "Monkey", "Monkey", "2022-11-29T12:00:00.000Z", "/", "1235");


function listImages(req, res){
    let images = [];
    images.push(exampleImage1);
    images.push(exampleImage2);
    
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