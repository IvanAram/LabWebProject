var express = require('express');
var router = express.Router();
var waitersController = require('../controllers/waiters');

router.get('/', waitersController.get);

module.exports = router;
