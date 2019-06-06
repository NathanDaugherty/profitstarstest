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
		$('.icon-links > .container').slick({
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
			prevArrow: '<button class="slick-arrow icon icon-arrow-left" type="button"><span class="sr-only">Previous Slide</span></button>',
			nextArrow: '<button class="slick-arrow icon icon-arrow-right" type="button"><span class="sr-only">Next Slide</span></button>',
			speed: 300,
			adaptiveHeight: true,
			autoplaySpeed: 8000,
			autoplay: true,
			pauseOnHover: true
		});
		$('.news').slick({
			autoplaySpeed: 8000,
			speed: 300,
			arrows: true,
			nextArrow: '<button class="slick-arrow icon icon-arrow-right" type="button"><span class="sr-only">Next News Item</span></button>',
			prevArrow: '<button class="slick-arrow icon icon-arrow-left" type="button"><span class="sr-only">Previous News Item</span></button>',
			fade: false,
			infinite: true
		});
		$('.icon-links > .container').slick({
			infinite: true,
			autoplay: false,
			fade: false,
			speed: 300,
			adaptiveHeight: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 992,
				settings: {
					slidesToScroll: 2,
					slidesToShow: 3
				}
			},{
				breakpoint: 680,
				settings: {
					slidesToScroll: 2,
					slidesToShow: 2
				}
			},
			{
				breakpoint: 440,
				settings: {
					slidesToScroll: 1,
					slidesToShow: 1
				}
			}]
		});
	}
});