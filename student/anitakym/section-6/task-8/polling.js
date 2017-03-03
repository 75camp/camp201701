const express = require('express');
const app = express();

function generateCode(){
  let code = ('' + Math.random()).slice(-8);
  return code;
}

let code = generateCode();
let previousCode = code; 

setInterval(() => {
  code = generateCode();
  //延迟2秒更新，防止网络延迟，在2秒内新旧两个code都可用
  setTimeout(() => previousCode = code, 2000);
}, 10000);

app.get('/qrcode', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://c.h5jun.com');
  res.send({code});
});

app.get('/check/:code', function(req, res) {
  let checkCode = req.params.code;
  let msg = '验证不通过';
  if(checkCode === code || checkCode === previousCode) 
    msg = '验证通过';
  res.send(msg);
});

app.listen(9999);