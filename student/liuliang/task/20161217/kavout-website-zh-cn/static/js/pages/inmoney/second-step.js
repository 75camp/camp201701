(function(win, doc) {
    var submitButtonElement = doc.querySelector('#bank-list')
    var nextHref = '/inmoney/third-step/index.html'
    submitButtonElement.onclick = function(event) {
        // console.log(event.target)
        location.href = nextHref
    }
})(window, document)