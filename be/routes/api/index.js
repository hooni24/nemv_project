var express = require('express');
var createError = require('http-errors');
var router = express.Router();
var jwt = require('jsonwebtoken')
const cfg = require('../../../config')

router.use('/sign', require('./sign'))

const verifyToken = (t, k) => {
  return new Promise((resolve, reject) => {
    jwt.verify(t, k, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}

/* 간단한 미들웨어 구현 :: 토큰 베리파잉 */
router.all('*', (req, res, next) => {
  const token = req.headers.authorization
  verifyToken(token, cfg.secretKey)
    .then(v => {
      console.log(v)
      next()
    })
    .catch(e => res.send({ success: false, msg: e.message }))
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
