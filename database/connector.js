const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'galleryDB';

MongoClient.connect(url, function(err, client){
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection('users').insertOne({
        imie: "Tadeusz",
        nazwisko: "Kowalski"
    }, (error, result) => {
        if(error)
            console.log("coś nie tak")
        else
            console.log("dziala poprawnie")
    })

    client.close()
});