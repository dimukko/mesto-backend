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
const settings = require('./appconfig');


const port = settings.PORT;
const app = express();

/* парсер запросов */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* подключаемся к базе */
mongoose.connect(settings.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

/* роуты */
app.post('/signin', loginUser);
app.post('/signup', createUser);

app.use(auth);
app.use('/users', users);
app.use('/cards', cards);
app.use(error);

/* сообщаем порт */
app.listen(port, () => {
  console.log(`Используемый порт: ${port}`);
});
