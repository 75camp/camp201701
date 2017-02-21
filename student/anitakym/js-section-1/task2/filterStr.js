function reDuplicates(arr) {
	var resArr = [];
	var flag = true;
	var len = arr.length;
	for (var i = 0;i < len;i++) {
		if (resArr.indexOf(arr[i]) == -1) {
			if (arr[i] != arr[i]) {
				if (flag) {
					resArr.push(arr[i]);
					flag = false;
				}
			} else {
				resArr.push(arr[i]);
			}
		}
	}
	return resArr;
}

function filterStr(str) {
  var arr = str.split(",");
  var temp = reDuplicates(arr);
  return temp.toString();
}

var s = '游泳,健身,篮球,游泳,篮球,阅读'
filterStr(s);
