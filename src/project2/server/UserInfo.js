var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    imageUrl: String,
    name: String,
    title: String,
    rank: { type: String, default: 0 },
    startDate: { type: Date, default: Date.now },
    sex: String,
    officePhone: Number,
    sms: Number,
    email: String,
    employees: Array,
    manager: { managerId: String, managerName: String }
});

module.exports = mongoose.model("UserInfo", UserSchema);
