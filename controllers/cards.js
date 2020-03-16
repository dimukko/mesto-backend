const { ObjectId } = require('mongodb');
const Card = require('../models/card');

//отобразить все карточки в базе
const getCards = (req, res) => {
  Card.find({})
      .populate('owner')
      .then(cards => res.send({ data: cards }))
      .catch(err => res.status(500).send({ message: err.message }));
};

//создать новую карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  if (ObjectId.isValid(req.user._id)) {
  Card.create({ name, link, owner: req.user._id, likes })
      .then(card => res.status(201).send({ data: card }))
      .catch(err => res.status(500).send({ message: `Произошла ошибка при создании карточки: ${err.message}` }));
    } else {
      res.status(400).send({ message: 'Что-то не так с пользователем' });
    }
};

//удалить карточку по id
const deleteCard = (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
  Card.findByIdAndDelete(req.params.id)
      .then(card => {
        if (!card) {
          return res.status(404).send({ message: `Карточки с id: ${req.params.id} не существует`})
        }
      res.send({ data: card })})
      .catch(err => res.status(500).send({ message: `Произошла ошибка при удалении карточки: ${err.message}` }));
    } else {
        res.status(400).send({ message: 'Неправильный формат id карточки' });
      }
};

//поставить лайк карточке
const likeCard = (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
        .then(card => {
          if(!card) {
            return res.status(404).send({ message: `Карточки с id: ${req.params.id} не существует`})
          }
        res.send({ data: card })})
        .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
  } else {
    res.status(400).send({ message: 'Неправильный формат id карточки' });
  }
};

//снять лайк с карточки
const dislikeCard = (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
        .then(card => {
          if(!card) {
            return res.status(404).send({ message: `Карточки с id: ${req.params.id} не существует`})
          }
        res.send({ data: card })})
        .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
  } else {
    res.status(400).send({ message: 'Неправильный формат id карточки' });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};
