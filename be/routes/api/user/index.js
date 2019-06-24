var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users')

/* GET 유저 정보 전체 조회 */
router.get('/', function(req, res, next) {
  User.find()
    .then(r => {
      res.send({ success: true, users: r })
    })
    .catch(e => {
      res.send({ success: false })
    })
})

/* POST 유저정보 insert */
router.post('/', (req, res, next) => {
  console.log('req.body >>> ', req.body)
  const { name, age } = req.body
  const u = new User({ name, age })
  u.save()
    .then(r => {
      res.send({ success: true, msg: r })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
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
