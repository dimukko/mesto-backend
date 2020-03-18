const Card = require('../models/card');
const { messages } = require('../tools/messages');

//проверка результата
const checkCardAndSend = (card, req, res) => {
  if(!card) {
    return res.status(404).send({ message: `${messages.card.id.isNotFound}: ${req.params.id}`})
  }
  return res.send({ data: card })
}

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
  Card.create({ name, link, owner: req.user._id })
      .then(card => res.status(201).send({ data: card }))
      .catch(err => res.status(500).send({ message: `${messages.card.isFail}: ${err.message}` }));
};

//удалить карточку по id
const deleteCard = (req, res) => {
    Card.findById(req.params.id)
    .then(card => {
      if (card.owner._id.toString() !== req.params.id) {
        return res.status(401).send({ message: messages.authorization.isRequired });
      }
      return Card.findByIdAndDelete(req.params.id)
      .then(card => checkCardAndSend(card, req, res ))
      .catch(err => res.status(500).send({ message: `${messages.card.isFail}: ${err.message}` }));
  })
    .catch(err => res.status(404).send({ message: err.message }));
};

//поставить лайк карточке
const likeCard = (req, res) => {
    Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
        .then(card => checkCardAndSend(card, req, res ))
        .catch(err => res.status(500).send({ message: `${messages.card.isFail}: ${err.message}` }));
};

//снять лайк с карточки
const dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
        .then(card => checkCardAndSend(card, req, res ))
        .catch(err => res.status(500).send({ message: `${messages.card.isFail}: ${err.message}` }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};
