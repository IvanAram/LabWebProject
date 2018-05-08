var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin');

router.post('/', adminController.login);

module.exports = router;
