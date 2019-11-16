const mongoose = require("mongoose");
const passport = require('passport');
require('dotenv').config();

const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema;
const connection = mongoose.createConnection(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");
autoIncrement.initialize(connection)

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  timesheets: [{
    type: Schema.Types.ObjectId, ref: 'Timesheet'
  }],
  position: {type: Number, default: 1, enum: [1,2,3], required: true},
  addedDate: { type: Date, default: Date.now }
});

userSchema.plugin(autoIncrement.plugin, {model: 'User', field: 'employeeNum', startAt: 10000})


const User = mongoose.model("User", userSchema);

module.exports = {User, connection};
