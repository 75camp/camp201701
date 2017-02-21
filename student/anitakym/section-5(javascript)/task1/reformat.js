function reFormat(str) {
	var ans = str.replace(/-/g,"").toUpperCase();
	var len = ans.length;
	const ERROR_MSG = "异常：无效的密码格式"
	if (len === 20) {
		return ans;
	}else {
		return ERROR_MSG;
	}
}
