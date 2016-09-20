document.createElement('section');
$(document).ready(function() {

	$('a.main').hover(function() {
		$('a.main span').toggleClass('hover');
	});

	$('a#menu-open, .menu button.close, .menu a').click(function() {
		$('#menu').toggleClass('nav-open');
		$('.main-cont').toggleClass('nav-is-open');
		$('#details').fadeOut();
		$('body').toggleClass('scroll-none');
		return false;
	});

	$('.main-cont, .details button.close').click(function() {
		$('.main-cont').removeClass('nav-is-open');
		$('#menu').removeClass('nav-open');
		$('#details').fadeOut().removeClass('details-open');
		$('body').removeClass('scroll-none');
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
		$('#details').fadeIn();
		$('#menu').removeClass('nav-open');
		$('.main-cont').removeClass('nav-is-open');
		$('body').removeClass('scroll-none');
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
		asNavFor: '.slick-slider-comment',
		variableWidth: true,
		responsive: [
		{
			breakpoint: 826,
			settings: {
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 3
			}
		},
		{
			breakpoint: 0,
			settings: {
				variableWidth: false,
				slidesToShow: 1,
			}
		}
		]
	});

	$('.slick-slider-fotos-mobile').slick({
		asNavFor: '.slick-slider-comment',
	});

	$('.slick-slider-comment').slick({
		centerPadding: '60px',
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.slick-slider-fotos,.slick-slider-fotos-mobile',
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

	// Validation Form
	$('input[name="name"]').blur(function() {if($(this).val().length < 2) {$(this).addClass('error-input');}});
	$('input[name="name"]').focus(function() {$(this).removeClass('error-input');});

	$('input[name="phone"]').mask('+7 (999) 999-99-99');
	$('input[name="phone"]').blur(function() {if($(this).val().length != 18) {$(this).addClass('error-input');}});
	$('input[name="phone"]').focus(function() {$(this).removeClass('error-input');});

	$.get("http://ipinfo.io", function(response) {geo_url='http://ipgeobase.ru:7020/geo?ip='+response.ip; run_geo(geo_url);}, "jsonp");
	utm=[];$.each(["utm_source","utm_medium","utm_campaign","utm_term",'source_type','source','position_type','position','added','creative','matchtype'],function(i,v){$('<input type="hidden" />').attr({name: v, class: v, value: function(){if(getURLParameter(v) == undefined)return '-'; else return getURLParameter(v)}}).appendTo("form")});
	$('<input type="hidden" />').attr({name: 'url', value: document.location.href}).appendTo("form");
	$('<input type="hidden" />').attr({name: 'title', value: document.title}).appendTo("form");

	$('form').submit(function(e) {
		e.preventDefault();
		$(this).find('input[type="text"]').trigger('blur');
		if(!$(this).find('input[type="text"]').hasClass('error-input')){
			var type=$(this).attr('method');
			var url=$(this).attr('action');
			var data=$(this).serialize();
			var $event=$(this).find('input[name="event"]').val();
			$.ajax({type: type, url: url, data: data,
				success : function(){
					$.magnificPopup.open({
						items: [{
							src: '#okgo',
							type: 'inline'
						}],
						midClick: true,
						mainClass: 'mfp-fade',
						removalDelay: 350,
					});
				}
			}); 
		} else {

			var errorPopText = '';

			if ($(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input')) {
				errorPopText = 'Пожалуйста введите имя';
			} else if (!$(this).find('input[name="name"]').hasClass('error-input') && $(this).find('input[name="phone"]').hasClass('error-input')) {
				errorPopText = 'Пожалуйста введите телефон';
			} else if ($(this).find('input[name="name"]').hasClass('error-input') && $(this).find('input[name="phone"]').hasClass('error-input')) {
				errorPopText = 'Пожалуйста введите имя и телефон';
			}

			$('#error-pop').text(errorPopText);

			$.magnificPopup.open({
				items: [{
					src: '#error-pop',
					type: 'inline'
				}],
				midClick: true,
				mainClass: 'mfp-fade',
				removalDelay: 250,
			});

		}
	});
	// Validation Form Ends

	$('.preloader').fadeOut(250);

});

	// Scroll
	var sections = $('section');
			nav = $('nav');

	$(window).on('scroll', function () {
		var cur_pos = $(this).scrollTop();
		if (cur_pos > 300) {
			$('.top-line-fixed').slideDown().show();
		} else {
			$('.top-line-fixed').slideUp();
		}
		sections.each(function() {
			var top = $(this).offset().top - 76
			bottom = top + $(this).outerHeight();
			if (cur_pos >= top && cur_pos <= bottom) {
				nav.find('a').removeClass('active');
				nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
			}
		});
	});

	nav.find('a').on('click', function () {
		var $el = $(this)
		id = $el.attr('href');
		$('html, body').animate({
			scrollTop: $(id).offset().top - 75
		}, 1000);
		return false;
	});
	// Scroll Ends

	var isMobile = false; 
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		isMobile = true;
	}

	// Stabilization
	function stabilize(){

		$('section:not(:hidden)').each(function(index, el) {

			var eTop = $(this).offset().top; 
			var posTop = eTop - $(window).scrollTop();

			if(posTop>-$(window).height()/2&&posTop<$(window).height()/2){
				$("html, body").animate({ scrollTop: $(this).offset().top}, 250);
			}

		});

	}

	$("html, body").on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
		$("html, body").stop();
	});

	if (isMobile != true) {
		$(window).scroll(function(){

			clearTimeout($.data(this, 'scrollTimer'));

			$.data(this, 'scrollTimer',setTimeout(stabilize,1500));

		});
	}
	// Stabilization Ends

	// GEO
	function getURLParameter(name) {return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;} 
	function run_geo(geo_url){
		$.ajax({type: 'GET',url: geo_url,dataType: 'xml',
			success: function(xml) {$(xml).find('ip').each(function(){
				var city = $(this).find('city').text();
				var region = $(this).find('region').text();
				if(city!=region){var ipg = city+', '+region;}else{var ipg = city;}
				$('<input type="hidden" />').attr({name: 'location', class: 'location', value:ipg}).appendTo("form");
			});}});
	}
	// GEO Ends