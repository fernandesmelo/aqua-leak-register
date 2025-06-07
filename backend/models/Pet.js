const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  foto: String,
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model('Pet', PetSchema);