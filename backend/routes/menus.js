var express = require('express');
var router = express.Router();
var menusController = require('../controllers/menus');

router.get('/', menusController.get);
router.get('/:id', menusController.getById);

router.put('/:id', menusController.update);

router.post('/', menusController.create);
router.post('/addBeverage', menusController.addBeverage);
router.post('/addDish', menusController.addDish);

router.delete('/deleteBeverage', menusController.deleteBeverage);
router.delete('/deleteDish', menusController.deleteDish);
router.delete('/:id', menusController.delete);

module.exports = router;
