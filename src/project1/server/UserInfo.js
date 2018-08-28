var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    FirstName: String,
    LastName: String,
    Age: Number,
    Sex: String,
    Password: String
});

module.exports = mongoose.model("UserInfo", UserSchema);
