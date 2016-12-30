function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}
function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}

function load() {
    var recommendButton = document.getElementById('recommendButton');
    var recommend = document.getElementById('recommend');
    var onlineCourseButton = document.getElementById('onlineCourseButton');
    var onlineCourse = document.getElementById('onlineCourse');
    var grammerButton = document.getElementById("grammerButton");
    var grammer = document.getElementById("grammer");
    var movieButton = document.getElementById("movieButton");
    var movie = document.getElementById("movie");
    recommendButton.onclick = function () {
        recommend.style.display = "block";
        onlineCourse.style.display = "none";
        addClass(recommendButton,"active");
        removeClass(onlineCourseButton,"active");
    }
    onlineCourseButton.onclick = function () {
        onlineCourse.style.display = "block";
        recommend.style.display = "none";
        addClass(onlineCourseButton,"active");
        removeClass(recommendButton,"active");
    }
    grammerButton.onclick = function () {
        grammer.style.display = "block";
        movie.style.display = "none";
        addClass(grammerButton,"on");
        removeClass(movieButton,"on");
    }
    movieButton.onclick = function () {
        movie.style.display = "block";
        grammer.style.display = "none";
        addClass(movieButton,"on");
        removeClass(grammerButton,"on");
    }
}
window.onload = load; 