var express = require('express');
var router = express.Router();
var beveragesController = require('../controllers/beverages');

router.get('/', beveragesController.getAll);

module.exports = router;
