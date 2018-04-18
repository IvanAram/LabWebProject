var express = require('express');
var router = express.Router();
var dishesController = require('../controllers/dishes');

router.get('/', dishesController.getAll);

module.exports = router;
