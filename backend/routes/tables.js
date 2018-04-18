var express = require('express');
var router = express.Router();
var tablesController = require('../controllers/tables');

router.get('/', tablesController.get);

router.put('/', tablesController.update);

router.post('/', tablesController.create);

router.delete('/', tablesController.delete);

module.exports = router;
