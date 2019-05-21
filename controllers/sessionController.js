var {
  createError,
  CONFLICT
} = require('../helpers/errorHelper');

var postSession = function(req, res, next) {
  return res.db.transaction(function (t) {
    return res.db('session')
    .transacting(t)
    .insert({id: 0}) // auto increment, any data whould be ok
    .then(function(insertSessionIdResponse) {
      var createdSessionId = insertSessionIdResponse[0];
      return res.db('user_session')
        .transacting(t)
        .insert({
          userId: res.userId,
          sessionId: createdSessionId
        })
    })
    .then(function(createdUserSessionId) {
      return res.db.from('user_session')
        .transacting(t)
        .where({id: createdUserSessionId})
        .first(['id', 'createdAt', 'updatedAt'])
    })
    .then(t.commit)
    .catch(function(err) {
      if (err.code === 'ER_DUP_ENTRY') {
        next(createError(CONFLICT));
      } else {
        next(err);
      }
      return t.rollback(err);
    });
  })
  .then(function (createdUserSession) {
    res.status(201).json(createdUserSession);
  })
  .catch(next);
}

module.exports = {
  postSession
}