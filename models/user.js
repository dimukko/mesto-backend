/* eslint-disable import/no-unresolved */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
const { messages } = require('../tools/messages');

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
    validate: (link) => {
      if (!validator.isURL(link)) {
        throw new Error(messages.registration.isNotLink);
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (email) => {
      if (!validator.isEmail(email)) {
        throw new Error(messages.registration.isNotEmail);
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({
    email,
  }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(messages.authorization.isFailed));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(messages.authorization.isFailed));
          }
          return user;
        });
    });
};

userSchema.plugin(uniqueValidator, {
  message: messages.registration.isNotUnique,
});

module.exports = mongoose.model('user', userSchema);
