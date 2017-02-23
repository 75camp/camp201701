// https://zhuanlan.zhihu.com/p/24753549
function unique(str){
    var set = new Set(str.split(','));
    return Array.from(set);
}
