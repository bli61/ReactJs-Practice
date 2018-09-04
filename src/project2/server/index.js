const mongoose = require("mongoose");
const express = require("express");
const bodyPaser = require("body-parser");
const cloudinay = require("cloudinary");
const axios = require("axios");
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect
mongoose.connect(
    "mongodb://ksssint:QAZwsx123@ds239692.mlab.com:39692/eu",
    { useNewUrlParser: true }
);

// get persistent class
const User = require("./UserInfo");

// get all records
app.get("/api/users", function(req, res) {
    User.find(function(err, Users) {
        if (err) {
            res.json({ Message: "GETFAIL" });
        } else {
            res.json(Users);
            console.log("success");
        }
    });
});

//get a record by ID

app.get("/api/users/:id", function(req, res) {
    let id = req.params.id;
    console.log(id);
    User.findById(id, function(err, user) {
        if (err) {
            res.json({ Message: "GETFAIL" });
        } else {
            res.json(user);
            console.log("backend getId:", user);
            console.log("success");
        }
    });
});

//updata record
app.put("/api/users/:id", function(req, res) {
    let id = req.params.id;
    User.findByIdAndUpdate({ _id: id }, req.body, function(err, post) {
        if (err) {
            res.json({ Message: "UPFAIL" });
        } else {
            res.json(post);
        }
    });
});

//insert a record

app.post("/api/users", function(req, res) {
    console.log(res, req);
    User.create({ ...req.body })
        .then(user => res.json(user))
        .catch(err => res.json({ Message: "CANNOT_CONNECT_SERVER" }));
});

//delete a record
app.delete("/api/users/:id", function(req, res) {
    let id = req.params.id;
    User.remove({ _id: id }, function(err) {
        if (err) {
            res.json({ Message: "CANNOT_CONNECT_SERVER" });
        } else {
            console.log("Info deleted");
            User.find(function(err, Users) {
                if (err) {
                    res.json({ Message: "DELFAIL" });
                } else {
                    res.json(Users);
                }
            });
        }
    });
});

const port = 4000;
app.listen(port, () => {
    console.log(`Express Server is running on port ${port}`);
});
