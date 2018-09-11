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

//get dropdown info;
app.get("/api/dropdown/:id", (req, res) => {
    let id = req.params.id;
    User.findById(id)
        .then(user => {
            User.find({})
                .then(users => {
                    let allUsers = [...users];
                    let validUsers = findManager(user, allUsers);
                    res.json(validUsers);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
});

function findManager(user, allUsers) {
    let q = [];
    let notFitables = [];
    q.push(user);
    while (q.length > 0) {
        let curUser = q.shift();
        if (!("_id" in curUser)) {
            curUser = allUsers.find(
                item => item._id.toString() === curUser.employeeId.toString()
            );
        }
        notFitables.push(curUser._id.toString());
        q.push(...curUser.employees);
    }
    let result = allUsers.filter(
        user => !notFitables.includes(user._id.toString())
    );
    return result;
}

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

//update record
app.put("/api/users/:id", (req, res) => {
    let id = req.params.id;
    User.findById(id)
        .then(user => {
            User.findByIdAndUpdate({ _id: id }, req.body)
                .then(() => {
                    console.log("in update get user", user);
                    return User.findById(user.manager.managerId);
                })
                .then(manager => {
                    console.log("in update", manager);
                    if (manager !== null) {
                        if (
                            user.manager.managerId !==
                            req.body.manager.managerId
                        ) {
                            manager.employees = manager.employees.filter(
                                item => item.employeeId.toString() !== id
                            );
                            manager
                                .save()
                                .then(() =>
                                    User.findById(req.body.manager.managerId)
                                )
                                .then(newManager => {
                                    if (newManager !== null) {
                                        newManager.employees.push({
                                            employeeId: user._id,
                                            employeeName: user.name
                                        });
                                        newManager
                                            .save()
                                            .then(product =>
                                                console.log(product)
                                            )
                                            .catch(err => console.log(err));
                                    } else {
                                        console.log(
                                            "after edit, no manager anymore"
                                        );
                                    }
                                })
                                .catch(err =>
                                    console.log(
                                        `when changing manager, there is error: ${err}`
                                    )
                                );
                        } else {
                            console.log("Manager did not update!");
                        }
                    } else {
                        if (req.body.manager !== null) {
                            User.findById(req.body.manager.managerId).then(
                                newManager => {
                                    newManager.employees = [
                                        ...newManager.employees,
                                        {
                                            employeeId:
                                                req.body.manager.managerId,
                                            employeeName:
                                                req.body.manager.managerName
                                        }
                                    ];
                                    newManager
                                        .save()
                                        .then(product => console.log(product))
                                        .catch(err =>
                                            console.log(
                                                `when changing manager, there is error: ${err}`
                                            )
                                        );
                                }
                            );
                        } else {
                            console.log("there is no manager to change!");
                        }
                    }
                })
                .catch(err => console.log(err));
        })
        .catch(err => res.json(err));
});

//insert a record

app.post("/api/users", function(req, res) {
    let newUser = new User();
    newUser.imageUrl = req.body.imageUrl;
    newUser.name = req.body.name;
    newUser.title = req.body.title;
    newUser.sex = req.body.sex;
    newUser.startDate = new Date();
    newUser.officePhone = req.body.officePhone;
    newUser.sms = req.body.sms;
    newUser.email = req.body.email;
    if (req.body.manager.managerId === undefined) {
        newUser.manager = { managerId: null, managerName: null };
        newUser.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ Message: "SUCCESS_ADD_EMPLOYEE" });
        });
    } else {
        newUser.manager.managerId = req.body.manager.managerId;
        newUser.manager.managerName = req.body.manager.managerName;
        let temp = { employeeName: newUser.name, employeeId: newUser._id };
        User.findByIdAndUpdate(
            { _id: newUser.manager.managerId },
            { $push: { employees: temp } },
            err => {
                if (err) {
                    res.send(err);
                }
                newUser.save(err => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ Message: "SUCCESS_ADD_EMPLOYEE" });
                });
            }
        );
    }
});

//delete a record
function removeManager(user) {
    User.findById(user.employeeId)
        .then(res => {
            res.manager = { managerId: null, managerName: null };
            res.save()
                .then(res => res.josn({ Message: "COMPLETE_DELETE" }))
                .catch(err =>
                    res.json({
                        Message: `Error in removing manager ${user.name}`
                    })
                );
        })
        .catch(err => console.log(err));
}
app.delete("/api/users/:id", (req, res) => {
    let id = req.params.id;
    User.findById(id)
        .then(user => {
            User.findById(user.manager.managerId)
                .then(manager => {
                    if (manager !== null) {
                        manager.employees = manager.employees.filter(
                            item => item.employeeId.toString() !== id
                        );
                        manager
                            .save()
                            .then(res =>
                                res.josn({ Message: "COMPLETE_DELETE" })
                            )
                            .catch(err => {
                                console.log(`Changing manager got ${err}`);
                            });
                    } else {
                        console.log("No manager to change!");
                    }
                })
                .catch(err => console.log(err));
            let employees = [...user.employees];
            employees.forEach(removeManager);
        })
        .then(() => User.remove({ _id: id }))
        .then(res => res.json({ Message: "COMPLETE_DELETE" }))
        .catch(err => {
            console.log(err);
            res.send(err);
        });
});

const port = 4000;
app.listen(port, () => {
    console.log(`Express Server is running on port ${port}`);
});
