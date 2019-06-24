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

module.exports = app;

const mongoose = require('mongoose')
const User = require('./models/users')

mongoose.connect('mongodb://localhost:27017/nemv', { useNewUrlParser: true }, (err) => {
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
