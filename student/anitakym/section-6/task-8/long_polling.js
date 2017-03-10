const express = require('express');
const app = express();

class CodeGenerator{
  constructor(){
    this.code = ('' + Math.random()).slice(-8);
    this.previousCode = this.code;

    let self = this;

    //每隔10秒刷新一次
    function generateCode(){
      return new Promise((resolve) => {
        setTimeout(() => {
          let code = ('' + Math.random()).slice(-8);
          resolve(code);

          self.previousCode = self.code;
          setTimeout(() => self.previousCode = self.code, 2000);

          self.code = code;
          self.promise = generateCode();
        }, 10000);
      });
    }

    this.promise = generateCode().catch(()=>{});
  }
  generate(){
    return this.promise;
  }
  check(code){
    return this.code === code || this.previousCode === code;
  }
}

let codeGenerator = new CodeGenerator();

app.get('/qrcode/:previous', async function (req, res) {

  res.setHeader('Access-Control-Allow-Origin', 'http://c.h5jun.com');

  let clientPrevious = req.params.previous;
  let code = codeGenerator.code;

  if(clientPrevious === code){ //上一次获取的还没有过期
    code = await codeGenerator.generate();
  }

  //新的code
  res.send({code});
});

app.get('/check/:code', function(req, res) {
  let checkCode = req.params.code;
  let msg = '验证不通过';

  if(codeGenerator.check(checkCode)) 
    msg = '验证通过';
  
  res.send(msg);
});

app.listen(9999);