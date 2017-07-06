/**
 * 如何划分职责
 */
(function(win, doc){
  var list = doc.querySelector('#user-list');
  var items = list.querySelectorAll('li > a'); // static NodeList
  // var child = list.childNodes; // live NodeList contain text node
  // var child = list.children; // HTMLCollection not contain text node
  var isWhichTag = function(elem, originalTag){
    var currentTag = elem.nodeName || elem.tagName;
    return currentTag.toLowerCase() === originalTag.toLowerCase();
  };

  list.addEventListener('click', function(event){

    var resetAll = function(){
      // items NodeList类型(https://developer.mozilla.org/en-US/docs/Web/API/NodeList)，自带item方法，新增forEach、keys、values、entries方法
      items.forEach(function(item){
        // var itemClassList = item.classList; //add、remove、item、toggle、contains
        // if(itemClassList.contains('active')) itemClassList.remove('active');
        if(isWhichTag(item, 'a')) item.href = 'javascript:;';
      });
    };
    var givenItemOperate = function(){
      var elem = event.target;
      var dataSet = elem.dataset;
      // console.log(dataSet)
      // current.classList.toggle('active')
      // current.href = '#'+dataSet.id;
      if(isWhichTag(elem, 'a')) elem.setAttribute('href', '#' + dataSet.id);
    };
    var initial = function(){
      resetAll();
      givenItemOperate();
    };
    initial();
  }, false);
})(window, document);
