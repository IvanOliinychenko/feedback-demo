var express = require('express');
var router = express.Router();
var {
  body,
  param,
  query
} = require('express-validator/check');
var validation = require('../middlewares/validation');
var {
  getToken,
} = require('../controllers/authController');
var validation = require('../middlewares/validation');

router.get('/', [
  query('grantType').equals('implicit'),
  query('clientId').custom(function(value, req) { 
    return value === req.config.apiKey
  }),
  query('scope').custom(function(value, req) { 
    return value.split(',').filter(function(e){
      return ['read', 'write', 'modify', 'admin'].indexOf(e) < 0;
    }).length === 0;
  }),
  validation
], getToken);

router.post('/register', [
  body('name').isLength({min: 6}).isAlphanumeric(),
  validation
]);

module.exports = router;