/**
 * Created by So on 2017/3/3.
 */
/**
 * https://leetcode.com/problems/reverse-integer/?tab=Description
 * Reverse digits of an integer.
 * Example1: x = 123, return 321
 * Example2: x = -123, return -321
 * The input is assumed to be a 32-bit signed integer. Your function should return 0 when the reversed integer overflows.
 */

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {

  let negative=false
  if(x<0){
    negative=true
    x=-x
  }
  newX=Number(String(x).split('').reverse().join(''))
  if(negative){
    newX=-newX
  }
  if(Math.abs(newX)>2147483641){
    return 0
  }
  return newX
};

console.log(reverse(123456789012345678123))