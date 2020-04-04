const { ObjectId } = require('mongodb');
const { messages } = require('../tools/messages');
const { BadRequestErr } = require('../errors');

// проверка объекта карточки в запросе
const checkCardObjectId = (req, res, next) => {
  if (ObjectId.isValid(req.params.id)) {
    next();
  } else {
    next(new BadRequestErr(messages.card.id.isNotValid));
  }
};

// проверка объекта пользователя в запросе
const checkUserObjectId = (req, res, next) => {
  if (!ObjectId.isValid(req.user._id)) {
    next(new BadRequestErr(messages.user.id.isNotValid));
  } else {
    next();
  }
};

module.exports = {
  checkCardObjectId,
  checkUserObjectId,
};
