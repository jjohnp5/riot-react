const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const punchSchema = new Schema({
  punchType: {type: String, enum: ['In', 'Out'], require: true, default: 'In'},
  addedDate: { type: Date, default: Date.now }
});

const Punch = mongoose.model("Punch", punchSchema);

module.exports = Punch;