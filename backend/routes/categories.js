var express = require('express');
var router = express.Router();
var categoriesController = require('../controllers/categories');

router.get('/', categoriesController.get);

router.put('/', categoriesController.update);

router.post('/', categoriesController.create);

router.delete('/', categoriesController.delete);

module.exports = router;
