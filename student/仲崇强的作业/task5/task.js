  //练习1
  function format(str) {
      if (str && /[A-Za-z0-9-]+/.test(str)) {
          var str = str.replace(/-/g, '').toUpperCase();
          if (str.length == 20) {
              return str
          } else {
              throw 'format exception'
          }
      } else {
          console.log('请输入正确的密码格式')
      }
  }

  //练习2
  function removeDuplicates(str) {
      var strArr = str.split('，');
      var strSet = new Set(strarr)
      return [...strset].join(',')
  }
  //练习3
  function calculateTime() {
      var Time = new Date(2017, 1, 1);
      var Firstday = Time.getTime();
      var year = Time.getFullYear();
      var month = Time.getMonth() + 1
      var date = new Date(2017, 2, 0).getDate();
      var now = new Date()
      var arr = [];
      for (var i = 0; i < date; i++) {
          var day = new Date(Firstday + i * 24 * 60 * 60 * 1000);
          if (day.getDay() == 3) {
              arr.push({
                  date: year + '/' + month + '/' + day.getDate(),
                  daysBefore: Math.floor(Math.abs(day.getTime() - now.getTime()) / (24 * 60 * 60 * 1000))
              })
          }
      }
      return arr
  }
