const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const petRouter = require('./index');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/pets', petRouter);

mongoose.connect('mongodb+srv://laerciofernandesmelonetoo:F4htN3zIPWLbOVUm@petregisterapp.ehb4tjy.mongodb.net/?retryWrites=true&w=majority&appName=petregisterapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch(err => console.error(err));