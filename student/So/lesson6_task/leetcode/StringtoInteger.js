/**
 * Created by So on 2017/3/3.
 */
/**
 * https://leetcode.com/problems/string-to-integer-atoi/?tab=Description
 */
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
  let n=parseInt(str)
  n=n!=n?0:n
  if(n>2147483647){
    n=2147483647
  }
  if(n<-2147483648){
    n=-2147483648
  }
  return n
};