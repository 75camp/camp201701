/**
 * 用 JavaScript 实现一个函数，读取用户输入的字符串，替换掉连字符，将小写字母转换为大写字母，然后判断是否是20位，若是，将转换后的字符串返回，否则抛出格式异常错误。
 * 示例输入： 3efu8-rt67f-e42op-8rpol，
 * 函数结果：返回：3EFU8RT67FE42OP8RPOL
 *
 * @str  {string}
 * @return {string}
 */
function formatSerialNumber (str) {
  str = str.replace(/-/g, '')
  if (str.length != 20) {
  	// throw new Error('异常：无效的密码格式')
  	console.warn('异常：无效的密码格式')
  	return false
  }
  str = str.toUpperCase()
  console.log(str)
  return str
}
formatSerialNumber('3efu8-rt67f-e42op-8rpol')
formatSerialNumber('efu8-rt67e42op-8rpol')

/**
 * 网站上让用户给出一组兴趣爱好选项，是以半角逗号分割的字符串，例如：'游泳,健身,舞蹈,阅读'
 *
 * 输入示例：​'游泳,健身,篮球,游泳,篮球,阅读'
 * 输出：'游泳,健身,篮球,阅读'
 * @param  {string}
 * @return {string}
 */
function strDeduplication (str) {
  let arr = str.split(','), obj = {}
  for (let key in arr) {
    obj[arr[key]] = true
  }
  arr = []
  for (let key in obj) {
    arr.push(key)
  }
  console.log(arr.join(','))
  return arr.join(',')
}
strDeduplication('游泳,健身,篮球,游泳,篮球,阅读')
strDeduplication('')

function getDate () {
	// 2017/02/01正好是星期三，找一个基准时间
  let time = new Date('2017/02/01').getTime()
  let timeArr = []
  for (let i = 0; i < 4; i++) {
    let obj = {}, thatTime = time + i * 7 * 24 * 60 * 60 * 1000, currentTime = new Date().getTime()
    obj.date = new Date(thatTime).toLocaleDateString()
    obj.daysBefore = Math.ceil((thatTime - currentTime) / (24 * 60 * 60 * 1000))
    timeArr.push(obj)
  }
  console.log(timeArr)
}
getDate()
