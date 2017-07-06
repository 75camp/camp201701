;(function(win){
  var promotionBySecondKill = function({year, month, date = 1, hour = 0, minute = 0, second = 0, day}, current=+new Date){
    const timeFormat = timestamp => {
      timestamp = timestamp / 1000
      let format = {
        year: {
          name: '年',
          unit: 3600 * 24 * 360
        },
        month: {
          name: '月',
          unit: 3600 * 24 * 30
        },
        day: {
          name: '天',
          unit: 24 * 3600
        },
        hour: {
          name: '小时',
          unit: 3600
        },
        minute: {
          name: '分钟',
          unit: 60
        },
        second: {
          name: '秒',
          unit: 1
        }
      }
      let str = '距离现在还有：'
      for(let [k,{name, unit}] of Object.entries(format)) {
        let val = parseInt(timestamp/ unit)
        if(val) str += `${val}${name}`
        timestamp -= (val* unit)
      }
      return str
    }
    let dayIndex = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'].indexOf(day)
    let lastDateOfMonth = new Date(year, month, 0).getDate()
    let currentDate = new Date(year, month - 1, date, hour, minute, second)
    let arr = []
    let currentDateOfMonth = currentDate.getDate()
    let currentMonth = currentDate.getMonth()
    while(currentDateOfMonth < lastDateOfMonth && currentMonth < month){
        let compare = currentDate.getDay() - dayIndex
        if(!compare){
            arr.push({
                date: [year,month,currentDate.getDate()].join('/'),
                daysBefore: timeFormat(currentDate.getTime() - current)
            })
            currentDate.setDate(currentDate.getDate() + 7)
        }else{
            currentDate.setDate(currentDate.getDate() + (compare > 0 ? compare : 6 + compare))
        }
        currentDateOfMonth = currentDate.getDate()
        currentMonth = currentDate.getMonth()
    }
    // console.log(arr)
  }

  win.promotionBySecondKill = promotionBySecondKill
})(window)

promotionBySecondKill({year: 2017,month: 3,day: '星期三', hour: 10})
