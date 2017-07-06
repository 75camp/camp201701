(function(win, doc) {
    var submitButtonElement = doc.querySelector('.submit-button')
    var nextHref = '/inmoney/second-step/index.html'
    submitButtonElement.onclick = function(event) {
        location.href = nextHref
    }
})(window, document)
