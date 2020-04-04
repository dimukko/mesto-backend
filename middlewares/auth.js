const jwt = require('jsonwebtoken');
const { messages } = require('../tools/messages');
const settings = require('../appconfig');
const User = require('../models/user');
const { UnauthorizedErr } = require('../errors/index');

// авторизация и запись пэйлоуда в запрос
const auth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!jwt) {
    return next(new UnauthorizedErr(messages.authorization.isRequired));
  }

  let payload;

  try {
    payload = jwt.verify(token, settings.JWT_KEY);
  } catch (err) {
    return next(new UnauthorizedErr(messages.authorization.isRequired));
  }

  req.user = payload;

  return User.findById(req.user._id)
    .orFail()
    .then(() => next())
    .catch((err) => next(new UnauthorizedErr({ error: err.message })));
};

module.exports = { auth };
