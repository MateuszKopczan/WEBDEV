const express = require('express')
const bodyParser = require('body-parser')
const port = 8080
//const usersRoutes = require('./routes/users.js')
const mongoose = require('./db/mongoose')
const Picture = require('./db/model/picture')

const app = express()
app.use(bodyParser.json())


app.get('/images', async (req,res)=>{
    return res.send(await Picture.find())
})

app.post('/images', async (req,res)=>{
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
})

app.get('/images/:id', async (req,res)=>{
    const id = req.params.id;

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
})

app.put('/images/:id', async (req,res)=>{
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
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
})

app.delete('/images/:id', async (req,res)=>{
    const id = req.params.id

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
})




app.listen(port)