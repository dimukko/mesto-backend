const { Joi } = require('celebrate');

const registrationJoi = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8).regex(/^\S+$/),
  name: Joi.string().required().min(2).max(30),
  about: Joi.string().required().min(2).max(30),
  avatar: Joi.string()
    .required()
    .regex(
      /http(s)?:\/\/(www\.)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z0-9])[.-]?){1,}([a-zA-Z0-9])\.([a-zA-Z]{2,6}))(?::\d{2,5})?(?:[\\/?#]\S*)?/m,
    ),
});

const loginJoi = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8).regex(/^\S+$/),
});

const objectIdJoi = Joi.object().keys({
  id: Joi.string().alphanum().length(24),
});

const userAvatarJoi = Joi.object().keys({
  avatar: Joi.string()
    .required()
    .regex(
      /http(s)?:\/\/(www\.)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z0-9])[.-]?){1,}([a-zA-Z0-9])\.([a-zA-Z]{2,6}))(?::\d{2,5})?(?:[\\/?#]\S*)?/m,
    ),
});

const userInfoJoi = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  about: Joi.string().required().min(2).max(30),
});

const cardJoi = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required().regex(/http(s)?:\/\/(www\.)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z0-9])[.-]?){1,}([a-zA-Z0-9])\.([a-zA-Z]{2,6}))(?::\d{2,5})?(?:[\\/?#]\S*)?/m),
});

module.exports = {
  loginJoi,
  registrationJoi,
  cardJoi,
  userInfoJoi,
  userAvatarJoi,
  objectIdJoi,
};
