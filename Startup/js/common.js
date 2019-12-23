$(document).ready(function(){

	const navbar = $('.navbar');

	let scrollOffset = navbar.innerHeight();

	window.addEventListener('scroll', function(){
		if ($(window).scrollTop() > scrollOffset) {
			navbar.addClass('navbar_scrolled');
		} else {
			navbar.removeClass('navbar_scrolled');
		}
	});
	

	
	

       
    

});

