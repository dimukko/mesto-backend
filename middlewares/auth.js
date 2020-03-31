const jwt = require('jsonwebtoken');
const { messages } = require('../tools/messages');
const settings = require('../appconfig');

const handleAuthError = (res) => {
  res
    .status(401)
    .send({
      message: messages.authorization.isFailed,
    });
};


// авторизация и запись пэйлоуда в запрос
const auth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!jwt) {
    return handleAuthError(res);
  }

  let payload;

  try {
    payload = jwt.verify(token, settings.JWT_KEY);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
