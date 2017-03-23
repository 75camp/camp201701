/**
 * Created by So on 2017/3/3.
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  var maxArea = 0;
  var length = height.length;
  var head = 0, tail = length-1;
  while (tail - head > 0){
    var area = Math.min(height[head],height[tail]) * (tail - head);
    maxArea = Math.max(maxArea, area);
    if (height[head] > height[tail]){
      tail--;
    }else{
      head++;
    }

  }
  return maxArea;
};