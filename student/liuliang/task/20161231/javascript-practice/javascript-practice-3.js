;(function(win){
  var promotionBySecondKill = function({year, month, date = 1, hour = 0, minute = 0, second = 0, day}, current){
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
                date: [year,month,currentDate.getDate()].join('/')
            })
            currentDate.setDate(currentDate.getDate() + 7)
        }else{
            currentDate.setDate(currentDate.getDate() + (compare > 0 ? compare : 6 + compare))
        }
        currentDateOfMonth = currentDate.getDate()
        currentMonth = currentDate.getMonth()
    }
//     console.log(arr)
  }

  win.promotionBySecondKill = promotionBySecondKill
})(window)

promotionBySecondKill({year: 2017,month: 2,day: '星期三'})
