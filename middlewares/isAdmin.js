var {
  createError,
  FORBIDDEN,
  UNAUTHORIZED
} = require('../helpers/errorHelper');
var {
  ADMIN
} = require('../helpers/roleHelper');
var getBearerToken = require('../helpers/getBearerToken');

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization
  
    if (!authHeader) {
      return next(createError(FORBIDDEN));
    } else {
      const token = getBearerToken(authHeader)
      if (token) {
        res.db.from('user')
          .where({token: token, role: ADMIN})
          .first('*')
          .then(function(row) {
            if (row) {
              res.userId = row.id;
              next();
            } else {
              next(createError(UNAUTHORIZED));
            }
          })
          .catch(function () {
            return next(createError(UNAUTHORIZED));
          });
      } else {
        next(createError(FORBIDDEN));
      }
    }
  }