var express = require('express');
var isAdmin = require('../middlewares/isAdmin');
var isUser = require('../middlewares/isUser');
var validation = require('../middlewares/validation');
var moment = require('moment');
var {
  body,
  param,
  query
} = require('express-validator/check');
var router = express.Router();

var {
  getFeedbacks,
  getFeedback,
  postFeedback,
  putFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');

router.get('/', [
  isAdmin,
  query('order').optional().isIn(['asc', 'des']),
  query('minRating').optional().isInt({gt: 0, lt: 6}),
  query('maxRating').optional().isInt({gt: 0, lt: 6}),
  query('limit').optional().isInt({gt: -1, lt: 101}),
  query('offset').optional().isInt({gt: -1}),
  query('startDate').optional().custom(function(value) { 
    return moment(value).isValid();
  }),
  query('endDate').optional().custom(function(value) { 
    return moment(value).isValid();
  }),
  validation
], getFeedbacks);

router.post('/', [
  isUser,
  body('userSessionId').isInt(),
  body('rating').isInt({gt: 0, lt: 6}),
  body('comment').optional().isLength({max: 2000}),
  validation
], postFeedback);

router.get('/:feedbackId', [
  isUser,
  isAdmin,
  param('feedbackId').isInt(),
  validation
], getFeedback);
router.delete('/:feedbackId', [
  isAdmin,
  param('feedbackId').isInt(),
  validation
], deleteFeedback);

router.put('/:feedbackId', [
  isAdmin,
  param('feedbackId').isInt(),
  body('rating').optional().isInt({gt: 0, lt: 6}),
  body('comment').optional().isLength({max: 2000}),
  body('isActive').optional().isIn([0, 1]), 
  validation
], putFeedback);

module.exports = router;