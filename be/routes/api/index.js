var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.use('/test', require('./test'))
router.use('/user', require('./user'))

/**
 * 정의되지 않은 api요청에 대한 처리
 */
router.all('*', function(req, res, next) {
  next(createError(503, '그런 api 없어'));
});

module.exports = router;
