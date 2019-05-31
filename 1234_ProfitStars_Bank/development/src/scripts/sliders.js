$(window).load(function() {
	if (top != self) {  // for CMS only
		$slider.slick({
			dots: true,
			accessibility:false,
			infinite: true,
			fade: true,
			cssEase: 'linear',
			autoplay: false,
			autoplaySpeed: 8000,
			draggable: false
		});
		$('.subads__slider').slick({
			dots: false,
			infinite: false,
			fade: true,
			accessibility: false,
			speed: 300,
			autoplay: false,
			cssEase: 'linear',
			rows:1,
			slidesToShow: 1,
			slidesPerRow: 4,
			slidesToScroll: 1,
			adaptiveHeight: true,
			responsive: [{
				breakpoint: 992,
				settings: {
					slidesPerRow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesPerRow: 1 // width of screen
				}

			}]
		});
		$('.icon-links').slick({
			rows:1,
			slidesPerRow: 4,
			adaptiveHeight: true,
			responsive: [{
				breakpoint: 768,
				settings: {
					rows:2,
					slidesPerRow: 2
				}
			},
			{
				breakpoint: 400,
				settings: {
					rows:4,
					slidesPerRow: 1 // width of screen
				}
			}]
		});
	} else {
		$slider.slick({
			dots: false,
			infinite: true,
			fade: false,
			arrows: true,
			prevArrow: '<button class="slick-arrow icon icon-arrow-left" aria-label="Previous Slide" type="button"><span class="sr-only">Previous</span></button>',
			nextArrow: '<button class="slick-arrow icon icon-arrow-right" aria-label="Next Slide" type="button"><span class="sr-only">Next</span></button>',
			speed: 300,
			adaptiveHeight: true,
			autoplaySpeed: 8000,
			autoplay: false
		});
		$('.subads__slider').slick({
			dots: false,
			infinite: true,
			fade: false,
			speed: 300,
			adaptiveHeight: true,
			autoplaySpeed: 8000,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}

			}]
		});
		$('.icon-links').slick({
			dots: false,
			infinite: true,
			autoplay: false,
			fade: false,
			speed: 300,
			adaptiveHeight: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 640,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1 // width of screen
				}
			}]
		});
	}
});