const  colorSet = {                 //设置颜色

  "FgRed" : "\x1b[31m",
  "FgGreen" : "\x1b[32m",
  "FgYellow" : "\x1b[33m",
  "FgBlue" : "\x1b[34m",
  "FgMagenta" : "\x1b[35m",
  "FgCyan" : "\x1b[36m",
  "FgWhite" : "\x1b[37m",
}

let colors = (function (){　　　　　　　//放进数组里
  let result = []
  for (key in colorSet ){
    result.push(colorSet[key])
  }
  return result
})()

function selectRandom(){                 //随机获取一个颜色
  let index = parseInt(Math.random()*colors.length)
  return colors[index]
}


module.exports = {
  colorLog: function(...args){
    let color = selectRandom()
    console.log(color, ...args)
  }
}

