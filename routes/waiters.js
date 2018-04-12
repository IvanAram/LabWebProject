var express = require('express');
var router = express.Router();
var waitersController = require('../controllers/waiters');

router.get('/', waitersController.getAll);

module.exports = router;
