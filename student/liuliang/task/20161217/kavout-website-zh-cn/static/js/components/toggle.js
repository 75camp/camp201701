(function(win, doc) {
    var button = doc.querySelector('button[data-toggle="collapse"]')
    var isTrueString = function(str) {
        return str.toLowerCase() === 'true'
    }
    button.onclick = function(event) {
        var toggleElementIdSelector = this.getAttribute('data-target')
        var toggleElement = doc.querySelector(toggleElementIdSelector)
        var newAriaExpandeValue = !isTrueString(toggleElement.getAttribute('aria-expanded'))
        if (toggleElement.classList) {
            toggleElement.classList.toggle('active') && toggleElement.setAttribute('aria-expanded', newAriaExpandeValue)
            this.classList.toggle('collapsed') && this.setAttribute('aria-expanded', newAriaExpandeValue)
        }
    }
})(window, document)
