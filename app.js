/* eslint-disable import/no-unresolved */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');
const error = require('./routes/error');


const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = { _id: '5e6885497b97253a58391302' };
  next();
});

app.use('/users', users);
app.use('/cards', cards);
app.use(error);

app.listen(PORT, () => {
  console.log(`Используемый порт: ${PORT}`);
});
