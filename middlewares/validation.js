var validationResult = require('express-validator/check').validationResult;
var {
    createError,
    UNPROCESSABLE
  } = require('../helpers/errorHelper');

module.exports = function (req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) return next();
    next(createError(UNPROCESSABLE, '', result.array()));
};