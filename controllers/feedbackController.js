var {
  createError,
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND
} = require('../helpers/errorHelper');
var moment = require('moment');

var getFeedbacks = function(req, res, next) {
  var order = req.query.order === 'des' ? 'desc' : 'asc';
  var startDate = req.query.startDate ? moment(req.query.startDate) : null;
  var endDate = req.query.endDate ? moment(req.query.endDate) : null;
  var minRating = req.query.minRating || 1;
  var maxRating = req.query.maxRating || 5;
  var limit = parseInt(req.query.limit) || 20;
  var offset = parseInt(req.query.offset) || 0;

  if (endDate && endDate.isBefore(startDate)) {
    return next(createError(BAD_REQUEST, 'endDate can not be before startDate'));
  }

  if (minRating > maxRating) {
    return next(createError(BAD_REQUEST, 'maxRating can not be smaller then minRating'));
  }

  res.db('feedback')
    .count('id as count')
    .then(function(total) {
      var query = res.db.from('feedback');
      if (startDate) query.where('createdAt', '>=', startDate.format('YYYY-MM-DD HH:mm:ss'))
      if (endDate) query.where('createdAt', '<', endDate.format('YYYY-MM-DD HH:mm:ss'))
    
      return query.where({isActive: 1})
      .whereBetween('rating', [minRating, maxRating])
      .select(['id', 'userId', 'userSessionId', 'comment', 'rating', 'createdAt', 'updatedAt'])
      .orderBy('createdAt', order)
      .limit(limit)
      .offset(offset)
        .then(function(row) {
          if (row) {
            res.set('X-Total', total[0].count);
            res.set('X-Limit', limit);
            res.json(row);
          } else {
            next(createError(NOT_FOUND));
          };
        })
        .catch(next);
    })
    .catch(next);
}

var getFeedback = function(req, res, next) {
  var feedbackId = req.params.feedbackId;
  res.db.from('feedback')
    .where({id: feedbackId, isActive: 1})
    .first(['id', 'userId', 'userSessionId', 'comment', 'rating', 'createdAt', 'updatedAt'])
      .then(function(row) {
        if (row) {
          res.json(row);
        } else {
          next(createError(NOT_FOUND));
        };
      })
      .catch(next);
}

var postFeedback = function(req, res, next) {
  var feedback = {
    userSessionId: req.body.userSessionId,
    rating: req.body.rating,
    comment: req.body.comment
  };

  res.db.from('user_session').where({id: feedback.userSessionId}).first('id', 'userId')
  .then(function(userSessionResponse) {
    if (!userSessionResponse) throw next(createError(BAD_REQUEST, 'Invalid sessionId'));
    feedback.userId = userSessionResponse.userId;
    var createdFeedbackId = null;
    return res.db.transaction(function (t) {
      return res.db('feedback')
      .transacting(t)
      .insert(feedback)
      .then(function(insertFeedbackIdResponse) {
        createdFeedbackId = insertFeedbackIdResponse[0];
        return res.db('user_session')
          .transacting(t)
          .where({userId: userSessionResponse.userId, id: feedback.userSessionId})
          .update({feedbackId: createdFeedbackId})
      })
      .then(function() {
        return res.db.from('feedback')
          .transacting(t)
          .where({id: createdFeedbackId})
          .first(['id', 'userId', 'userSessionId', 'comment', 'rating', 'createdAt', 'updatedAt'])
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
    .then(function (createdFeedback) {
      res.status(201).json(createdFeedback);
    })
    .catch(next);
  })
  .catch(next);
}

var putFeedback = function(req, res, next) {
  var feedbackId = req.params.feedbackId;
  var toUpdate = {};
  if (req.body.comment) toUpdate.comment = req.body.comment;
  if (req.body.isActive !== undefined) toUpdate.isActive = parseInt(req.body.isActive);
  if (req.body.rating !== undefined) toUpdate.rating = parseInt(req.body.rating);

  res.db.transaction(function (t) {
    return res.db('feedback')
      .transacting(t)
      .forUpdate()
      .where({id: feedbackId})
      .update(toUpdate)
      .then(t.commit)
      .catch(function(err) {
        next(err);
        return t.rollback(err);
      });
    })
    .then(function(feedbackId) {
      return res.db.from('feedback')
        .where({id: feedbackId})
        .first(['id', 'userId', 'userSessionId', 'comment', 'rating', 'createdAt', 'updatedAt'])
    })
    .then(function (feedback) {
      res.json(feedback);
    })
    .catch(next);
}

var deleteFeedback = function(req, res, next) {
  var feedbackId = req.params.feedbackId;
  res.db.transaction(function (t) {
    return res.db('feedback')
      .transacting(t)
      .forUpdate()
      .where({id: feedbackId})
      .update({isActive: 0})
      .then(t.commit)
      .catch(function(err) {
        next(err);
        return t.rollback(err);
      });
    })
    .then(function () {
      res.status(204).json();
    })
    .catch(next);
}

module.exports = {
  getFeedbacks,
  getFeedback,
  postFeedback,
  putFeedback,
  deleteFeedback
}