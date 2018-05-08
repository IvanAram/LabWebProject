var express = require('express');
var router = express.Router();
var categoriesController = require('../controllers/categories');

router.get('/', categoriesController.get);
router.get('/:id', categoriesController.getById);

router.put('/:id', categoriesController.update);

router.post('/', categoriesController.create);

router.delete('/:id', categoriesController.delete);

module.exports = router;
