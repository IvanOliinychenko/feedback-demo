var {
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    CONFLICT,
    NOT_FOUND,
    UNPROCESSABLE,
    INTERNAL
} = require('../helpers/errorHelper');


var badRequest = function (err, req, res, next) {
    if (err.status !== BAD_REQUEST) return next(err);
    res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: err.message || 'Bad Request'
    });
    next();
};
var unauthorized = function (err, req, res, next) {
    if (err.status !== UNAUTHORIZED) return next(err);
    res.status(UNAUTHORIZED).json({
        status: UNAUTHORIZED,
        message: err.message || 'Unauthorized'
    });
    next();
};
var forbidden = function (err, req, res, next) {
    if (err.status !== FORBIDDEN) return next(err);
    res.status(FORBIDDEN).json({
        status: FORBIDDEN,
        message: err.message || 'Forbidden'
    });
    next();
};
var conflict = function (err, req, res, next) {
    if (err.status !== CONFLICT) return next(err);
    res.status(CONFLICT).json({
        status: CONFLICT,
        message: err.message || 'Conflict'
    });
    next();
};
var notFound = function (err, req, res, next) {
    if (err.status !== NOT_FOUND) return next(err);
    res.status(NOT_FOUND).json({
        status: NOT_FOUND,
        message: err.message || 'Not Found'
    });
    next();
};
var unprocessable = function (err, req, res, next) {
    if (err.status !== UNPROCESSABLE) return next(err);
    res.status(UNPROCESSABLE).json({
        status: UNPROCESSABLE,
        message: err.message || 'Unprocessable entity',
        errors: err.errors || []
    });
    next();
};
var internal = function (err, req, res, next) {
    res.status(INTERNAL).json({
        status: INTERNAL,
        message: err.message || 'Internal Server Error'
    });
    next();
};

module.exports = [
    badRequest,
    unauthorized,
    forbidden,
    conflict,
    notFound,
    unprocessable,
    internal
]
