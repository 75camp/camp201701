window.onscroll = function(){
	var topBar = document.getElementById('topbar');
	var scrHei = window.scrollY;
	topBar.classList.toggle('fixed',scrHei >= 400);
};