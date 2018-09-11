var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    imageUrl: String,
    name: String,
    title: String,
    startDate: String,
    sex: String,
    officePhone: Number,
    sms: Number,
    email: String,
    employees: Array,
    manager: {
        managerId: { type: Schema.Types.ObjectId },
        managerName: { type: String }
    }
});

module.exports = mongoose.model("UserInfo", UserSchema);
