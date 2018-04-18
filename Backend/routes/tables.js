var express = require('express');
var router = express.Router();
var tablesController = require('../controllers/tables');

router.get('/', tablesController.getAll);

module.exports = router;
