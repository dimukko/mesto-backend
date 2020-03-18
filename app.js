/* eslint-disable import/no-unresolved */
/* подключаем модули */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { auth } = require('./middlewares/auth');
const users = require('./routes/users');
const cards = require('./routes/cards');
const error = require('./routes/error');
const { loginUser, createUser } = require('./controllers/users');
const port = process.env.PORT
const app = express();

/* парсер запросов */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* подключаемся к базе */
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

/* роуты */
app.post('/users/signin', loginUser);
app.post('/users/signup', createUser);

app.use(auth);
app.use('/users', users);
app.use('/cards', cards);
app.use(error);

/* сообщаем порт */
app.listen(port, () => {
  console.log(`Используемый порт: ${port}`);
});
