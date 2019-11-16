const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timesheetSchema = new Schema({
  punch: [{type: Schema.Types.ObjectId, ref: 'Punch'}],
  milesTraveled: { type: Number, default: 0},
  employeeNum: { type: Schema.Types.ObjectId, ref: 'User'},
  addedDate: { type: Date, default: Date.now }
});

const Timesheet = mongoose.model("Timesheet", timesheetSchema);

module.exports = Timesheet;