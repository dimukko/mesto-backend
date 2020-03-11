/* eslint-disable import/no-unresolved */
const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
