let color = require('./color')
    readline = require('readline')  //行读取
    http = require('http')　　　　　　//请求网络

const API_KEY = "36ee350aee5b4dc1957559672b6d90d4"



const RESPONSE_TYPE = {
    TEXT: 100000,
    LINK: 200000,
    NEWS: 302000,
    FOOD: 308000,
}

function autoChat(){

  let welcomeMsg = "欢迎来到召唤师峡谷"
  welcomeMsg.split('').forEach( (i) => {
    color.colorLog('O o o o', i, 'o o o O')
  })

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  let name = ""
  rl.question('\n>>>您的名字是？', (answer) => {
    name = answer
    color.colorLog(`你好，${name}`)
    chat()
  })

  function chat(){
    rl.question('\n>>>请输入问题\n ', (question) => {
      if (!question){
        color.colorLog('期待下次的聊天!')
        process.exit(0)      //退出
      }
      let req = http.request({
        hostname: 'www.tuling123.com',
        path: '/openapi/api',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }, (res)=>{
        let data = ""
        res.on("data",(chunk)=>{
          data += chunk
        })
        res.on('end' ,()=> {
          color.colorLog(handleData(data))
          chat()
        })
      })
      req.write(JSON.stringify({
        key: API_KEY,
        info: question,
        userid: name
      }))
      req.end()
    })
  }

  function handleData(data){
    let res = JSON.parse(data)
    switch(res.code) {
        case RESPONSE_TYPE.TEXT:
            return res.text;
        case RESPONSE_TYPE.LINK:
            return `${res.text} : ${res.url}\n`;
        case RESPONSE_TYPE.NEWS:
            let listInfo = '';
            (res.list || []).forEach((it) => {
                listInfo += `\n标题: ${it.article}\n来源: ${it.source}\n链接: ${it.detailurl}`;
            });
            return `${res.text}\n${listInfo}`;
        case RESPONSE_TYPE.FOOD:
            let foodList = '';
            (res.list || []).forEach((it) => {
                foodList += `\n菜名: ${it.name}\n图片: ${it.icon}\n材料: ${it.info}\n链接: ${it.detailurl}`;
            });
            return `${res.text}\n${foodList}`;  
        default:
            return res.text;  
    }
  }     

}
   



module.exports = autoChat;