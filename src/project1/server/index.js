const mongoose = require("mongoose");
const express = require("express");

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect
mongoose.connect(
    "mongodb://ksssint:QAZwsx123@ds231242.mlab.com:31242/project1",
    { useNewUrlParser: true }
);

// get persistent class
const User = require("./UserInfo");

// get all records
app.get("/api/users", function(req, res) {
    User.find(function(err, Users) {
        if (err) {
            console.log(err);
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
            console.log(err);
        } else {
            res.send(user);
            console.log("success");
        }
    });
});

//updata record
app.put("/api/users/:id", function(req, res) {
    let id = req.params.id;
    User.findByIdAndUpdate({ _id: id }, req.body, function(err, post) {
        if (err) {
            console.log(err);
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
        .catch(err => console.log(err));
});

//delete a record
app.delete("/api/users/:id", function(req, res) {
    let id = req.params.id;
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

const port = 4000;
app.listen(port, () => {
    console.log(`Express Server is running on port ${port}`);
});
