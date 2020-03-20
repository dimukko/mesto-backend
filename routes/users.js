const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateUserAvatar, deleteUser,
} = require('../controllers/users');
const { checkUserObjectId, checkUserObjectIdAndCardId } = require('../middlewares/checkIf');

router.get('/', getUsers);
router.get('/:id', checkUserObjectId, getUserById);

router.patch('/me/:id', checkUserObjectIdAndCardId, updateUser);
router.patch('/me/:id/avatar', checkUserObjectIdAndCardId, updateUserAvatar);

router.delete('/me/:id', checkUserObjectIdAndCardId, deleteUser);

module.exports = router;
