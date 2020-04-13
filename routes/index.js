const router = require('express').Router();
const { errors } = require('celebrate');
const middlewares = require('../middlewares/index');
const { errorHandler } = require('../middlewares/defaultErrorHandler');
const { requestLogger, errorLogger } = require('../middlewares/logs');
const registration = require('./reg');
const authorization = require('./auth');
const users = require('./users');
const cards = require('./cards');
const error = require('./error');

router.use(middlewares);
router.use(requestLogger);

router.use('/signup', registration);
router.use('/signin', authorization);
router.use('/users', users);
router.use('/cards', cards);
router.use('*', error);

/* логгер ошибок */
router.use(errorLogger);

/* обработчики ошибок */
router.use(errors());
router.use(errorHandler);

module.exports = router;
