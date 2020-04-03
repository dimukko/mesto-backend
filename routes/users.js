const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateUserAvatar,
} = require('../controllers/users');
const { checkUserObjectId } = require('../middlewares/checkIf');

router.get('/', getUsers);
router.get('/:id', checkUserObjectId, getUserById);

router.patch('/me', checkUserObjectId, updateUser);
router.patch('/me/avatar', checkUserObjectId, updateUserAvatar);

module.exports = router;
