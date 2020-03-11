const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const userId = req.user._id;

  Card.create({
    name, link, owner: userId, likes,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .orFail(() => new Error('Карточка с указанным id не существует!'))
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
