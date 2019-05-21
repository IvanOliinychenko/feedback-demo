var express = require('express');
var isUser = require('../middlewares/isUser');
var router = express.Router();
var {
  postSession
} = require('../controllers/sessionController');

router.post('/', [isUser], postSession);

module.exports = router;