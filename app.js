/* eslint-disable import/no-unresolved */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const users = require('./routes/users');
const cards = require('./routes/cards');
const error = require('./routes/error');


const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', users);
app.use('/cards', cards);
app.use(error);

app.listen(PORT, () => {
  console.log(`Используемый порт: ${PORT}`);
});
