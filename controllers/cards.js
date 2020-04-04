const Card = require('../models/card');
const { messages } = require('../tools/messages');
const {
  ForbiddenErr,
  BadRequestErr,
  NotFoundErr,
} = require('../errors');

// отобразить все карточки в базе
const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

// создать новую карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => next(new BadRequestErr(`${messages.card.isFail}: ${err.message}`)));
};

// удалить карточку по id
const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => new NotFoundErr(`${messages.card.id.isNotFound}: ${req.params.id}`))
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) {
        throw new ForbiddenErr(messages.authorization.isRequired);
      }
      return Card.findByIdAndDelete(req.params.id)
        .orFail(() => new NotFoundErr(`${messages.card.id.isNotFound}: ${req.params.id}`))
        .then(() => res.send({ data: card }))
        .catch(next);
    })
    .catch(next);
};

// поставить лайк карточке
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => new NotFoundErr(`${messages.card.id.isNotFound}: ${req.params.id}`))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

// снять лайк с карточки
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => new NotFoundErr(`${messages.card.id.isNotFound}: ${req.params.id}`))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
