/* eslint-disable import/no-unresolved */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: link => {
      if (!validator.isURL(link)) {
        throw new Error({
          error: 'Неправильный формат ссылки'
        })
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: email => {
      if (!validator.isEmail(email)) {
        throw new Error({
          error: 'Неправильный формат почтового адреса'
        })
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({
      email
    })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};


module.exports = mongoose.model('user', userSchema);