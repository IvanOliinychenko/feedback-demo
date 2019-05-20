var configuration = require('../knexfile');
configuration.log = {
    log: {
        warn(message) {
            debug(message);
        },
        error(message) {
            debug(message);
        },
        deprecate(message) {
            debug(message);
        },
        debug(message) {
            debug(message);
        },
    }
};
var db = require('knex')(configuration);

module.exports = function () {
    return function (req, res, next) {
        res.db = db;
        next();
    }
};