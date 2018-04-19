var express = require('express');
var router = express.Router();
var beveragesController = require('../controllers/beverages');

router.get('/', beveragesController.get);
// router.get('/:id', beveragesController.getById);

router.put('/:id', beveragesController.update);

router.post('/', beveragesController.create);

router.delete('/:id', beveragesController.delete);

module.exports = router;
