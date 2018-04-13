var express = require('express');
var router = express.Router();
var beveragesController = require('../controllers/beverages');

router.get('/', beveragesController.getAll);
router.get('/:id', beveragesController.getOne);

router.post('/', beveragesController.create);

router.delete('/:id', beveragesController.delete);

module.exports = router;
