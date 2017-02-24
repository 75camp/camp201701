function getWed(){
    var d = new Date();
//     console.log(d);
    var wed = [], wedDay = [];
    d.setDate(1);
//     console.log(d);
    while(d.getDay() !== 3){
        d.setDate(d.getDate() + 1);
    }
//     console.log(d.getDate());
    while(d.getMonth() === 1){
        wed.push(new Date(d.getTime()));
        wedDay.push(d.getDate());
//         console.log(wedDay);
        d.setDate(d.getDate() + 7);
    }
    var now = new Date();
    var count = [], i, j, result = [];
    for(i = 0; i < wed.length; i++){
        count.push(Math.floor((wed[i] - now) / 1000 / 60 / 60 / 24));
    }
    for(j = 0; j < count.length; j++){
        result.push({
            date: "2017/2/"+wedDay[j],
            daysBefore: count[j]
        });
    }
     // console.log(result);
    return result;
};
getWed();