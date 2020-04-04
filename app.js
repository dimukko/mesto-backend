/* eslint-disable import/no-unresolved */
/* подключаем модули */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { auth } = require('./middlewares/auth');
const users = require('./routes/users');
const cards = require('./routes/cards');
const error = require('./routes/error');
const { loginUser, createUser } = require('./controllers/users');
const settings = require('./appconfig');
const { errorHandler } = require('./middlewares/defaultErrorHandler');


const port = settings.PORT;
const app = express();

/* парсер запросов */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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
app.use(errors());
app.use(errorHandler);

/* сообщаем порт */
app.listen(port, () => {
  console.log(`Используемый порт: ${port}`);
});
