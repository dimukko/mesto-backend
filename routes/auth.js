const router = require('express').Router();
const { celebrate } = require('celebrate');
const { loginJoi } = require('../celebrate');
const { loginUser } = require('../controllers/users');

router.post('/', celebrate({ body: loginJoi }), loginUser);

module.exports = router;
