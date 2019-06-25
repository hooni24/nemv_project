var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const history = require('connect-history-api-fallback')
const cors = require('cors');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if(process.env.NODE_ENV !== 'production') app.use(cors());

/* api 요청 */
app.use('/api', require('./routes/api'))
app.use(history())
/* 정적파일 요청 */
app.use(express.static(path.join(__dirname, '..', 'fe', 'dist')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ msg: err.message });
});


const mongoose = require('mongoose')
const User = require('./models/users')

console.log(`${process.env.NODE_ENV} started!`)

const cfg = require('../config')

mongoose.connect(cfg.dbUrl, { useNewUrlParser: true }, (err) => {
  if (err) return console.error(err)
  console.log('mongoose connected!')
  // User.deleteMany()
  //   .then(r => console.log(r))
  //   .catch(e => console.error(e))

  // User.create({ name: '하하23', age: 200 })
  //   .then(r => console.log(r))
  //   .catch(e => console.error(e))

  // User.find()
  //   .then(r => console.log(r))
  //   .catch(e => console.error(e))

  // User.updateOne({ _id: '5d10678b94068e3c18154268' }, { $set: { age: 222 }})
  //   .then(r => {
  //     console.log('updated', r)
  //     return User.find()
  //   })
  //   .then(r => console.log('result', r))
  //   .catch(e => console.error(e))

  // User.deleteOne({ age: 999 })
  //   .then(r => console.log(r))
  //   .catch(e => console.error(e))

})

module.exports = app;

/* JWT */
var jwt = require('jsonwebtoken');
const key = '베리베리어려운키'
var token = jwt.sign({ id: 'memi', email: 'memi@xxx.com' }, key);
console.log(token)

var decoded = jwt.verify(token, key) //, (err, r) => {
  // if(err) return console.log(err)
// })

console.log(decoded)
console.log(new Date(decoded.iat * 1000))


/* Promise & async */
// User.findOne({}, (err, r) => {
//   if (err) return console.error(err)
//   console.log(r)
// })

// User.findOne({})
//   .then(r => console.log(r))
//   .catch(err => console.error(err))

const callbackStyleFunc = (v, cb) => {
  if (v > 1) return cb(new Error('abcd'))
  setTimeout(() => {
    cb(null, v + 1)
  }, 3000)
}
callbackStyleFunc(1, (err, r) => {
  if (err) return console.error(err.message)
  console.log(r)
})

/* jwt.sign() 을 감싸서 Promise패턴화 시킨 함수. */
const signToken = (u, k) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ name: u.name, age: u.age }, k, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}
/* jwt.verify() 를 감싸서 Promise패턴화 시킨 함수 */
const verifyToken = (t, k) => {
  return new Promise((resolve, reject) => {
    jwt.verify(t, k, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}

/* Promise 패턴을 사용한 유저 생성 및 나이 1추가 프로세스 */
let user
User.findOne({ name: 'aaa' })
  .then(u => {
    if (!u) return User.create({ name: 'aaa', age: 10 })
    return Promise.resolve(u)
  })
  .then(u => {
    user = u
    return User.updateOne({ _id: u._id}, { $inc: { age: 1 } })
  })
  .then(r => {
    if (!r.nModified) throw new Error('수정된 것이 없네요..')
    user.age++
    return signToken(user, key)
  })
  .then(token => {
    return verifyToken(token, key)
  })
  .then(v => console.log(v))
  .catch(err => {
    console.error(err.message)
  })

/* 위에 Promise패턴 사용한걸 async 혼합해서 만든 프로세스 */
const getToken = async (name) => {
  let u = await User.findOne({ name })
  if (!u) u = await User.create({ name, age: 10 })
  if (u.age > 20) throw new Error(`${u.name}의 나이가 너무 많습니다. >> 현재 ${u.age}살`)
  const ur = await User.updateOne({ _id: u._id}, { $inc: { age: 1 } })
  if(!ur.nModified) throw new Error('수정된 것이 없네요..')
  u = await User.findOne({ _id: u._id })
  const token = await signToken(u, key)
  const v = await verifyToken(token, key)
  return v
}

getToken('async User')
  .then(v => console.log(v))
  .catch(err => console.error(err.message))