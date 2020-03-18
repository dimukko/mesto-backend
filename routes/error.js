const router = require('express').Router();
const { messages } = require('../tools/messages');

router.all('*', (req, res) => res.status(404).json({
  message: messages.root.isNotFound,
}));

module.exports = router;
