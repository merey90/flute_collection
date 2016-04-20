"use strict"

let express = require("express");
let app = express();

let mongoUtil = require("./mongoUtil");
let oId = require('mongodb').ObjectId;
mongoUtil.connect();

app.use(express.static(__dirname + "/../client"));

app.get("/compositions", (rq, rs) => {
    let compositions = mongoUtil.compositions();
    compositions.find({}, {
        "title": true
    }).toArray((err, docs) => {
        if (err) {
            rs.sendStatus(400);
        }
        if (docs) {
            rs.json(docs);
        }
        else {
            rs.sendStatus(404);
        }
    });
});
app.get("/compositions/:id", (rq, rs) => {
    let compositions = mongoUtil.compositions();
    compositions.findOne({
        "_id": oId(rq.params.id)
    }, (err, doc) => {
        if (err) {
            rs.sendStatus(400);
        }
        if (doc) {
            rs.json(doc);
        }
        else {
            rs.sendStatus(404);
        }
    });
});

app.listen(8080, () => console.log("Listening on 8080"));