var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.get('/', function(req, res, next) {
  const us = [
    {
      name: '김김김',
      age: 14
    },
    {
      name : '천재',
      age: 5
    }
  ]
  res.send({ users: us });
});

/**
 * 정의되지 않은 api요청에 대한 처리
 */
router.all('*', function(req, res, next) {
  next(createError(503, '그런 api 없어'));
});

module.exports = router;
