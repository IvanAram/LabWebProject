var express = require('express');
var router = express.Router();
var waitersController = require('../controllers/waiters');

router.get('/', waitersController.get);

router.put('/', waitersController.update);

router.post('/', waitersController.create);

router.delete('/', waitersController.delete);

module.exports = router;
