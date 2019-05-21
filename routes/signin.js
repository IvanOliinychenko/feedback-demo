var express = require('express');
var router = express.Router();
var {
  query
} = require('express-validator/check');
var validation = require('../middlewares/validation');
var {
  getToken,
} = require('../controllers/signinController');

router.get('/', [
  query('name').isLength({min: 1}).isAlphanumeric(),
  query('password').not().isEmpty(),
  query('grantType').equals('password'),
  query('clientId').custom(function (value, { req }){ 
    return value === req.app.config.apiKey;
  }),
  validation
], getToken);

module.exports = router;