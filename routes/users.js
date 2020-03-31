const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateUserAvatar,
} = require('../controllers/users');
const { checkUserObjectId, checkUserObjectIdAndParamId } = require('../middlewares/checkIf');

router.get('/', getUsers);
router.get('/:id', checkUserObjectId, getUserById);

router.patch('/me', checkUserObjectIdAndParamId, updateUser);
router.patch('/me/avatar', checkUserObjectIdAndParamId, updateUserAvatar);

module.exports = router;
