/**
 * Created by So on 2017/3/3.
 */
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
let convert = function (s, numRows) {
  if(!s || numRows===1){
    return s
  }
  // ‘N’字的方向，向下时[1,numRows],向上时[-numRows,-1]
  let direction = 1
  // 创建numRows个队列，第n个队列记录第n行
  let queueArr = Array(numRows+1)
  let sArr = Array.from(s)
  let len = sArr.length
  for(let i=0;i<numRows+1;i++){
    queueArr[i]=[]
  }
  for (let i = 0; i < len; i++) {
    queueArr[Math.abs(direction)].push(sArr.shift())
    // 临界值改变方向
    if (direction === numRows) {
      direction = -numRows
      // direction++ //换方向的时候再加一次
    }
    if(direction === -1){
      direction = 1
      // direction++ //换方向的时候再加一次
    }
    // direction的值不论正负都可以++
    direction++
  }
  for(let i=1;i<queueArr.length;i++){
    // 连成字符串
    queueArr[i] = queueArr[i].join('')
  }
  return queueArr.join('')
}
console.log(convert('AB', 1))
