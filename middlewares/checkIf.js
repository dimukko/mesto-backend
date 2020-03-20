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
  if (ObjectId.isValid(req.user._id) || ObjectId.isValid(req.params.id)) {
    next();
  } else {
    res.status(400).send({ message: messages.user.id.isNotValid });
  }
};

// проверка объекта пользователя и владельца карточки в запросе
const checkUserObjectIdAndCardId = (req, res, next) => {
  const { _id: userId } = req.user;
  const { id: userCardId } = req.params;

  if (ObjectId.isValid(userId) && userId === userCardId) {
    next();
  } else if (!ObjectId.isValid(userId)) {
    res.status(400).send({ message: messages.user.id.isNotValid });
  } else if (userId !== userCardId) {
    res.status(401).send({ message: messages.authorization.isRequired });
  }
};

module.exports = {
  checkCardObjectId,
  checkUserObjectId,
  checkUserObjectIdAndCardId,
};
