const router = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const { checkCardObjectId, checkUserObjectId } = require('../middlewares/checkIf');

router.get('/', getCards);

router.post('/', checkUserObjectId, createCard);

router.delete('/:id', checkCardObjectId, deleteCard);
router.delete('/:id/likes', checkCardObjectId, dislikeCard);

router.put('/:id/likes', checkCardObjectId, likeCard);

module.exports = router;
