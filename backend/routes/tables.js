var express = require('express');
var router = express.Router();
var tablesController = require('../controllers/tables');

router.get('/', tablesController.get);

router.put('/:id', tablesController.update);

router.post('/', tablesController.create);

router.delete('/:id', tablesController.delete);

module.exports = router;
