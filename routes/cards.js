const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { objectIdJoi, cardJoi } = require('../celebrate');
const { checkCardObjectId } = require('../middlewares/checkIf');

router.get('/', celebrate({ params: objectIdJoi }), getCards);

router.post('/', celebrate({ body: cardJoi }), createCard);

router.delete('/:id', checkCardObjectId, deleteCard);
router.delete('/:id/likes', checkCardObjectId, dislikeCard);

router.put('/:id/likes', checkCardObjectId, likeCard);

module.exports = router;
