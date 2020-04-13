/* подключаем модули */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const settings = require('./appconfig');
const routes = require('./routes/index');

const port = settings.PORT;

/* подключаемся к базе и запускаем приложение */
mongoose.connect(settings.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database connected');
    const app = express();
    app.listen(port, () => {
      console.log(`Используемый порт: ${port}`);
    });
    app.use(routes);
  }).catch((err) => {
    console.log('Ошибка подключения к базе данных:', err);
  });
