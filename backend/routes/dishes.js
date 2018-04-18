var express = require('express');
var router = express.Router();
var dishesController = require('../controllers/dishes');

router.get('/', dishesController.get);

router.put('/', dishesController.update);

router.post('/', dishesController.create);

router.delete('/', dishesController.delete);

module.exports = router;
