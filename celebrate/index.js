const { Joi } = require('celebrate');

const registrationJoi = Joi.object().keys({
  email: Joi.string()
    .required()
    .email(),
  password: Joi.string()
    .required()
    .min(8),
  name: Joi.string()
    .required()
    .min(2)
    .max(30),
  about: Joi.string()
    .required()
    .min(2)
    .max(30),
  avatar: Joi.string()
    .required()
    .uri(),
});

const loginJoi = Joi.object().keys({
  email: Joi.string()
    .required()
    .email(),
  password: Joi.string()
    .required()
    .min(8),
});

const objectIdJoi = Joi.object().keys({
  id: Joi.string()
    .alphanum()
    .length(24),
});

const userAvatarJoi = Joi.object().keys({
  avatar: Joi.string()
    .required()
    .uri(),
});

const userInfoJoi = Joi.object().keys({
  name: Joi.string()
    .required()
    .min(2)
    .max(30),
  about: Joi.string()
    .required()
    .min(2)
    .max(30),
});

const cardJoi = Joi.object().keys({
  name: Joi.string()
    .required()
    .min(2)
    .max(30),
  link: Joi.string()
    .required()
    .uri(),
});

module.exports = {
  loginJoi,
  registrationJoi,
  cardJoi,
  userInfoJoi,
  userAvatarJoi,
  objectIdJoi,
};
