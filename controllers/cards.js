const Card = require('../models/card');

//отобразить все карточки в базе
const getCards = (req, res) => {
  Card.find({})
      .populate('owner')
      .then((cards) => res.send({ data: cards }))
      .catch((err) => res.status(500).send({ message: err.message }));
};

//создать новую карточку
const createCard = (req, res) => {
  const { name, link, likes } = req.body;

  Card.create({ name, link, owner: req.user._id, likes })
      .then((card) => res.status(201).send({ data: card }))
      .catch((err) => res.status(500).send({ message: `Произошла ошибка при создании карточки: ${err.message}` }));
};

//удалить карточку по id
const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
      .then((card) => res.send({ data: card }))
      .catch((err) => res.status(500).send({ message: `Произошла ошибка при удалении карточки: ${err.message}` }));
};

//поставить лайк карточке
const likeCard = (req, res) => {
    Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
        .then(card => res.send({ data: card }))
        .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

//снять лайк с карточки
const dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
        .then(card => res.send({ data: card }))
        .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};
