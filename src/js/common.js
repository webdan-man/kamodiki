document.createElement('section');
$(document).ready(function() {

	$('a.main').hover(function() {
		$('a.main span').toggleClass('hover');
	});

	$('a#menu-open, .menu button.close').click(function() {
		$('#menu').toggleClass('nav-open');
		$('section').toggleClass('nav-is-open');
		$('#details').fadeOut().removeClass('details-open');
	});

	$('section, .details button.close').click(function() {
		if ($('#details').hasClass('details-open')) {
			$('#details').fadeOut().removeClass('details-open');
		}
	});

	$('button#open-chest').click(function() {
		if (!$(this).hasClass('opened')) {
			$('.chest-open').fadeIn(250);
			$('.chest-closed').hide();
			$(this).addClass('opened');
			$(this).find('span.first').text('Закрыть');
			$(this).find('span.second').hide();
		} else if ($(this).hasClass('opened')) {
			$('.chest-open').hide();
			$('.chest-closed').fadeIn(250);
			$(this).removeClass('opened');
			$(this).find('span.first').text('Открыть');
			$(this).find('span.second').show();
		}
	});

	$('a#details-open').click(function() {
		$('#details').fadeIn().addClass('details-open');
		$('#menu').removeClass('nav-open');
		$('section').removeClass('nav-is-open');
		return false;
	});

	$('section.price input').click(function() {
		if ($(this).prop('checked')) {
			$(this).next('label').addClass('active');
		} else if (!$(this).prop('checked')) {
			$(this).next('label').removeClass('active');
		}
	});
	

	$('.slick-slider').slick({
		dots: true,
	});

	//document.getElementById('for-click').click();

	//$('.checkboxes li:nth-child(2) label').trigger('click');

	$('.slick-slider-price').slick({
		arrows: false,
		dots: true,
		fade: true,
		variableWidth: true,
		swipe: false,
		cssEase: 'linear',
	});

	document.documentElement.className = 'js';
	var slideshow = new CircleSlideshow(document.getElementById('slideshow'));
	
	$('a.popup').magnificPopup({
		type:'inline',
		midClick: true,
		mainClass: 'mfp-fade',
		removalDelay: 250,
	});

	$('.slick-slider-fotos').slick({
		centerMode: true,
		centerPadding: '60px',
		slidesToShow: 3,
		slidesToScroll: 1,
		variableWidth: true,
		touchMove: false,
		asNavFor: '.slick-slider-comment',
		responsive: [
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 3
			}
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 1
			}
		}
		]
	});
	$('.slick-slider-comment').slick({
		centerPadding: '60px',
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.slick-slider-fotos',
		arrows: false,
		fade: true,
	});

	$('.slick-slider-fotos').on('afterChange', function(event, slick, nextSlide, direction){
		$('section.fotos span.current').text(slick['currentSlide'] + 1);
	});

	$('.slick-slider-comment,.slick-slider-fotos').on('swipe', function(event, slick, direction){
		$('section.fotos span.current').text(slick['currentSlide'] + 1);
		if (direction === 'right') {
			$('.saw').css({transform:'rotate(90deg)',transition: 'all,.5s'});
			setTimeout(function() {
				$('.saw').css({transform:'none',transition: 'none'})
			},400);
		} else if (direction === 'left') {
			$('.saw').css({transform:'rotate(-90deg)',transition: 'all,.5s'});
			setTimeout(function() {
				$('.saw').css({transform:'none',transition: 'none'})
			},400);
		}
	});

	$('.slick-slider-fotos .slick-next').on('click', function(){
		$('.saw').css({transform:'rotate(-90deg)',transition: 'all,.5s'});
		setTimeout(function() {
			$('.saw').css({transform:'none',transition: 'none'})
		},400);
	});

	$('.slick-slider-fotos .slick-prev').on('click', function(){
		$('.saw').css({transform:'rotate(90deg)',transition: 'all,.5s'});
		setTimeout(function() {
			$('.saw').css({transform:'none',transition: 'none'})
		},400);
	});


});
