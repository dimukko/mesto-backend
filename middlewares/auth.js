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

// достаёт токен из заголовка
const extractBearerToken = (header) => header.replace('Bearer ', '');

// авторизация и запись пэйлоуда в запрос
// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, settings.JWT_KEY);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};

module.exports = { auth };
