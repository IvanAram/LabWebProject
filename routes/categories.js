var express = require('express');
var router = express.Router();
var categoriesController = require('../controllers/categories');

router.get('/', categoriesController.getAll);

module.exports = router;
