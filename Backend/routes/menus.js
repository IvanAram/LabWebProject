var express = require('express');
var router = express.Router();
var menusController = require('../controllers/menus');

router.get('/', menusController.getAll);

module.exports = router;
