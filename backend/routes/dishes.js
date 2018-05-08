var express = require('express');
var router = express.Router();
var dishesController = require('../controllers/dishes');

router.get('/', dishesController.get);
router.get('/:id', dishesController.getById);

router.put('/:id', dishesController.update);

router.post('/', dishesController.create);

router.delete('/:id', dishesController.delete);

module.exports = router;
