const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const petsRouter = require('./index'); 

const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb+srv://laerciofernandesmelonetoo:F4htN3zIPWLbOVUm@petregisterapp.ehb4tjy.mongodb.net/?retryWrites=true&w=majority&appName=petregisterapp');

app.use('/pets', petsRouter);

app.listen(3000, () => console.log('Backend rodando na porta 3000'));