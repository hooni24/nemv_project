var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.use('/sign', require('./sign'))

/* 간단한 미들웨어 구현 */
router.all('*', (req, res, next) => {
  next()  // 다음으로 넘어간다.
})

router.use('/check', require('./check'))
router.use('/test', require('./test'))
router.use('/user', require('./user'))

/**
 * 정의되지 않은 api요청에 대한 처리
 */
router.all('*', function(req, res, next) {
  next(createError(503, '그런 api 없어'));
});

module.exports = router;
