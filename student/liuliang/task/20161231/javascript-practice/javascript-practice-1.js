;(function(win){
  var shoppingCardFormatAutoCorrect = function(str){
    var regexp = /-/g
    var throwErrors = function(message = '无效的密码格式') {
      try{
        throw new Error(message)
      } catch(ex) {
        console.debug(ex.message)
        return false
      }
    }
    var isShoppingCardStringLengthLegal = function(str,length = 20) {
      return str.length === length
    }
    var isShoppingCardFormatLegal = function(str, regexp = /^(?!.*(\s|\?))[a-zA-Z0-9]*/) {
      return regexp.test(str)
    }
    str = str.replace(regexp, '').toUpperCase()

    switch (false) {
      case isShoppingCardStringLengthLegal(str): return throwErrors('数据格式有误') && false
      case isShoppingCardFormatLegal(str): return throwErrors('密码格式无效') && false
      default:
        return str
    }
  }
  win.shoppingCardFormatAutoCorrect = shoppingCardFormatAutoCorrect
})(window)
