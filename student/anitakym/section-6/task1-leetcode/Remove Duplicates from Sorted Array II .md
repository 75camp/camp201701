#Remove Duplicates from Sorted Array II  Follow up for ”Remove Duplicates”: What if duplicates are allowed at most twice? For example, Given sorted array                  ,Your function should return length = 5, and A is now            

###解题思路：
因为要求可以有两个以内的重复，所以可以加一个数组来计数。
其余思路和之前的一样。
<pre>
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  var ans = 0
    , hash = [];
  for (var i = nums.length; i--; ) {
    if (!hash[nums[i]])
      hash[nums[i]] = 1, ans++;
    else if (hash[nums[i]] === 1)
      hash[nums[i]]++, ans++;
    else 
      nums.splice(i, 1);
  }
  return ans;
};
</pre>

从diss里面看来的一个解，这个是设一个flag，来帮助判断
<pre>
var removeDuplicates = function(A) {
    if(A.length <= 2)
        return A.length;
    reformedIndex = 1; 
    doubled = false;
    for(i = 1; i < A.length; i++) {
        if(A[i] !== A[i-1]) {
            doubled = false;
            A[reformedIndex++] = A[i];
        } else if(!doubled) {
            doubled = true;
            A[reformedIndex++] = A[i];
        }
    }
    A.splice(reformedIndex, A.length);
    return A.length;
};
</pre>