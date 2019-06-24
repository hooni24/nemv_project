var express = require('express');
var createError = require('http-errors');
var router = express.Router();

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

router.get('/', function(req, res, next) {
  res.send({ users: us });
})

router.post('/', (req, res, next) => {
  console.log(req.body)
  res.send({ success: true })
})

router.put('/', (req, res, next) => {
  console.log(req.body)
  res.send({ success: true })
})

router.delete('/', (req, res, next) => {
  console.log(req.body)
  res.send({ success: true })
})

/**
 * 정의되지 않은 api요청에 대한 처리
 */
router.all('*', function(req, res, next) {
  next(createError(503, '그런 api 없어'));
})

module.exports = router;
