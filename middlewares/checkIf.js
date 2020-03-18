const { ObjectId } = require('mongodb');

const checkCardObjectId = (req, res, next) => {
  if (ObjectId.isValid(req.params.id)) {
    next();
  } else {
    res.status(400).send({ message: 'Неправильный формат id карточки' });
  }
};

const checkUserObjectId = (req, res, next) => {
  if (ObjectId.isValid(req.user._id) || ObjectId.isValid(req.params.id)) {
    next();
  } else {
    res.status(400).send({ message: 'Неправильный формат id пользователя' });
  }
};

const checkUserObjectIdAndCardId = (req, res, next) => {
  const { _id: userId } = req.user;
  const { id: userCardId } = req.params;

  if (ObjectId.isValid(userId) && userId === userCardId) {
    next();
  } else if (userId !== userCardId) {
    res.status(401).send({ message: 'Нужна авторизация' });
  } else if (!ObjectId.isValid(userId)) {
    res.status(400).send({ message: 'Неправильный формат id пользователя' });
  }
};

module.exports = {
  checkCardObjectId,
  checkUserObjectId,
  checkUserObjectIdAndCardId
}