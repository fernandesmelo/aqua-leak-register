const express = require('express');
const multer = require('multer');
const Pet = require('./models/Pet');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/', async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

router.post('/', upload.single('foto'), async (req, res) => {
  const { nome, descricao, latitude, longitude } = req.body;
  const foto = req.file ? req.file.filename : '';
  const pet = new Pet({ nome, descricao, foto, latitude, longitude });
  await pet.save();
  res.json(pet);
});

module.exports = router;