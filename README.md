# nemv_project
memi님 강좌 따라하기

## config 파일 세팅 방법
루트 밑에 config/index.js 파일 만들고,
```javascript
module.exports = {
  dbUrl: 'mongodb://localhost:27017/nemv'
}
```
이런 식으로 DB 연결 문자열을 작성해야 웹서버가 정상 구동됨.