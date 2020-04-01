const { ObjectId } = require('mongodb');
const { messages } = require('../tools/messages');

// проверка объекта карточки в запросе
const checkCardObjectId = (req, res, next) => {
  if (ObjectId.isValid(req.params.id)) {
    next();
  } else {
    res.status(400).send({ message: messages.card.id.isNotValid });
  }
};

// проверка объекта пользователя в запросе
const checkUserObjectId = (req, res, next) => {
  if (!ObjectId.isValid(req.user._id)) {
    res.status(400).send({ message: messages.user.id.isNotValid });
  } else {
    next();
  }
};

module.exports = {
  checkCardObjectId,
  checkUserObjectId,
};
