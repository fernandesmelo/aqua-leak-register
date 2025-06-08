const mongoose = require("mongoose");

const LeakSchema = new mongoose.Schema({
  name: String,
  description: String,
  photo: String,
  latitude: Number,
  longitude: Number,
  emPerigo: Boolean,
});

module.exports = mongoose.model("Leak", LeakSchema);