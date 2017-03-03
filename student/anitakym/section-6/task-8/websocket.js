const WebSocket = require('ws');

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

const wss = new WebSocket.Server({ port: 9999 });
const codeGenerator = new CodeGenerator();

wss.on('connection', function(ws) {
  ws.on('message', async function(message) {
    if(message === 'open'){
      ws.send(codeGenerator.code);
      while(1){
        let code = await codeGenerator.generate();
        if(ws.readyState === ws.OPEN) ws.send(codeGenerator.code);
      }
    }
  });
});
