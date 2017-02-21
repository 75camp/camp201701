function countDay() {
    const DAY_MILLISECOND = 24 * 60 * 60 * 1000;
    var start = Date.now();
    var arr = [];

    for (var i = 0; i < 28; i++) {
        var stop = new Date(2017, 1, i + 1);
        //要定义在里面，不然就只有一个日期了
        var countDayObj = {};

        if (stop.getDay() === 3) {
            countDayObj.date = [2017,2,i+1].join('/');
            var temp = (stop.getTime() - start)/DAY_MILLISECOND;
            countDayObj.daysBefore = (temp  > 0) ? Math.ceil(temp) : Math.floor(temp);
            arr.push(countDayObj);
        }
    }

    return JSON.stringify(arr,null,2);
}