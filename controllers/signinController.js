var {
  createError,
  BAD_REQUEST
} = require('../helpers/errorHelper');
var {
  ADMIN
} = require('../helpers/roleHelper');
var bcrypt = require('bcrypt');

var getToken = function(req, res, next) {

  var name = req.query.name;
  var password = req.query.password;

  return res.db('user')
    .where({name})
    .first('*')
    .then(function (user) {
      if (user && bcrypt.compareSync(password, user.password)) {
        var role = 'user';
        if (user.role === ADMIN) role = 'admin';
        res.json({accessToken: user.token, role: role})
      } else {
        next(createError(BAD_REQUEST));
      }
    })
    .catch(next);
}


module.exports = {
  getToken
}