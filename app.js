/* eslint-disable import/no-unresolved */
/* подключаем модули */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');
const error = require('./routes/error');


const { PORT = 3000 } = process.env;
const app = express();

/* парсер запросов */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* подключаемся к базе */
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

/* захардкодили пользователя, имитация авторизации */
app.use((req, res, next) => {
  req.user = { _id: '5e69db3ea6fd0b1ca81f9200' };
  next();
});

/* роуты */
app.use('/users', users);
app.use('/cards', cards);
app.use(error);

/* сообщаем порт */
app.listen(PORT, () => {
  console.log(`Используемый порт: ${PORT}`);
});
