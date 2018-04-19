var express = require('express');
var router = express.Router();
var menusController = require('../controllers/menus');

router.get('/', menusController.get);

router.put('/:id', menusController.update);

router.post('/', menusController.create);

router.delete('/:id', menusController.delete);

module.exports = router;
