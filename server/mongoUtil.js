"use strict";

let mongo = require("mongodb");
let client = mongo.MongoClient;
let _db;


module.exports = {
    connect(){
        client.connect("mongodb://localhost:27017/maindb-dev", (err, db) =>{
            if(err){
                console.log("Error connection to mongo");
                process.exit(1);
            }
            _db = db;
            console.log("connected to mongo");
        });
    },
    compositions(){
        return _db.collection("compositions");
    }
}