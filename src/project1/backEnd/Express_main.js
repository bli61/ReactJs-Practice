const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
let app = express();

// connect
mongoose.connect("mongodb://ksssint:QAZ123@ds157901.mlab.com:57901/test1");

// get persistent class
const User = require("./UserList");

// get all records
app.get("/app/users", function(req, res) {
    User.find(function(err, Users) {
        if (err) {
            console.log(err);
        } else {
            res.send(`${Users}`);
            console.log("success");
        }
    });
});

//get a record by ID

app.get("/app/users/:num", function(req, res) {
    let id = req.params.num;
    console.log(id);
    User.findById(id, function(err, Users) {
        if (err) {
            console.log(err);
        } else {
            res.send(`${Users}`);
            console.log("success");
        }
    });
});

//insert a record
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.post("/app/users", function(req, res) {
    User.create({ ...req.body })
        .then(user => res.json(user))
        .catch(err => console.log(err));
});

//delete a record
app.delete("/app/users/:num", function(req, res) {
    let id = req.params.num;
    User.remove({ _id: id }, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Info deleted");
            User.find(function(err, Users) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(`${Users}`);
                }
            });
        }
    });
});

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`The address is http://localhost:${port}`);
});
