const router = require('express').Router();
const { getUsers, getUserById, updateUser, updateUserAvatar, deleteUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);

router.patch('/:id', updateUser);
router.patch('/:id/avatar', updateUserAvatar);

router.delete('/:id', deleteUser);

module.exports = router;
