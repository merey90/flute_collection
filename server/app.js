"use strict"

let express = require("express");
let app = express();

let mongoUtil = require("./mongoUtil");
mongoUtil.connect();


app.use(express.static(__dirname + "/../client"));

app.get("/compositions", (rq, rs) =>{
    let compositions = mongoUtil.compositions();
    compositions.find().toArray((err, docs)=>{
        console.log(JSON.stringify(docs));
        let compositionTitles = docs.map((composition) => composition.title);
        rs.json(compositionTitles);
    });
});

app.listen(8080, () => console.log("Listening on 8080"));