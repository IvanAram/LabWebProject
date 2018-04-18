var express = require('express');
var router = express.Router();
var tablesController = require('../controllers/tables');

router.get('/', tablesController.get);

module.exports = router;
