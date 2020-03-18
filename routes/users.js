const router = require('express').Router();
const { getUsers, getUserById, updateUser, updateUserAvatar, deleteUser } = require('../controllers/users');
const { checkUserObjectId, checkUserObjectIdAndCardId } = require('../middlewares/checkIf');

router.get('/', getUsers);
router.get('/:id', checkUserObjectId, getUserById);

router.patch('/:id', checkUserObjectIdAndCardId, updateUser);
router.patch('/:id/avatar', checkUserObjectIdAndCardId, updateUserAvatar);

router.delete('/:id', checkUserObjectIdAndCardId, deleteUser);

module.exports = router;
