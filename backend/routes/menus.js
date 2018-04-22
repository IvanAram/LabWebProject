var express = require('express');
var router = express.Router();
var menusController = require('../controllers/menus');

router.get('/', menusController.get);

router.put('/:id', menusController.update);

router.post('/', menusController.create);
router.post('/addBeverage', menusController.addBeverage);
router.post('/addDish', menusController.addDish);

router.delete('/:id', menusController.delete);

module.exports = router;
