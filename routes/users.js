const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers, getUserById, updateUser, updateUserAvatar,
} = require('../controllers/users');
const {
  userInfoJoi,
  userAvatarJoi,
  objectIdJoi,
} = require('../celebrate');

router.get('/', getUsers);
router.get('/:id', celebrate({ params: objectIdJoi }), getUserById);

router.patch('/me', celebrate({ params: objectIdJoi, body: userInfoJoi }), updateUser);
router.patch('/me/avatar', celebrate({ params: objectIdJoi, body: userAvatarJoi }), updateUserAvatar);

module.exports = router;
