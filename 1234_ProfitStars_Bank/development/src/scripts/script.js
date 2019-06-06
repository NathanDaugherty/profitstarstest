

// Check to see if user is editing the site using top != self.
// If they aren't start the slideshow and do not show #success on form pages
// ==================================================================================================================================
$(window).load(function() {
	if (top != self) {
		$body.addClass('edit');
		$('.alert.hidden-alert').show();
	} else {
		banno.site.openNewWindow();
    // accessibilityButtonPosition();
    // accessibilityFooterSpace();
		$(".table-responsive").each(function(){
				$(this).prepend('<div class="swiper text-center">&laquo; Swipe for More &raquo;</div>');
				$(this).find("table").wrap("<div class=\"table-inside\"></div>");
		});
		waitForEl("#disclaimerscript", function() {
      		$("#disclaimerscript").remove();
      		$("a.banno-location-directions.external").each(function(){
				$(this).unbind();
			});
      	});
      	waitForEl("#locationTable", function() {
      		setTimeout(function(){
	        	$("#disclaimerscript").remove();
				$("a.banno-location-directions.external").each(function(){
					$(this).unbind();
				});
				$("a.banno-location-directions.external").on("click", function(e){
					e.preventDefault();
					e.stopPropagation();
					banno.site.setDisclaimers($(this));
				});
			},600);
      	});
		banno.site.setTableScrolling();
		// banno.site.setBannerVideos();
		// Trigger Anchor Button Click on spacebar
		// ==================================================================================================================================
		$('a.btn').keypress(function(e){
			if(e.which === 32){
				e.preventDefault();
				$(this).get(0).click();
			}
		});
		// React like a button for ADA
		// ==================================================================================================================================
		$('[role="button"], [role=link], [data-toggle=tab], [data-toggle=collapse]').keypress(function(e){
		    if(e.which === 32 || e.which === 13){  // 32 == spacebar, 13 == enter
		        e.preventDefault();
		        $(this).get(0).click();
		    }
		});

		//sets the focus back on the button that toggles a modal when that modal is closed (ADA)
		// ==================================================================================================================================
		$("a[data-toggle='modal']").on("click", function(){
			var target = $(this).attr("href").replace("#","");
			var id = "parent"+target;
			$(this).attr("id", id);
			$("#"+target).attr("data-return-focus", id);
		});

		$('.modal').on('hidden.bs.modal', function (e) {
		    var t = $(this).attr("data-return-focus");
		    if(t) { $("#"+t).focus(); }
		});
		$("#complianceMenu a").on("blur", function(){
			$(this).parent().parent().parent().removeClass("focused");
		});
		$("#complianceMenu a").on("focus", function(){
			$(this).parent().parent().parent().addClass("focused");
		});
		if($("body").hasClass("calculator")) {
			setTimeout(function(){
				$s = $("head").find("style:first-of-type");
				$h = $s.html();
				if($h) {
					var style = $h.trim();
					var code = "body, table, td, th, ul, ol, dd, dl, p, br, h1, dt { font-family: helvetica, arial, sans-serif; font-size: 100%; }";
					if(style === code) {
						$s.remove();
					}
				}
			},1000);
		}
	}
});

$(function () {
	var mblNav = $('#mobile-nav > .container');
	var mblOlb = $('#olbForm > .container');
	//Setup jquery placeholder
	// ==================================================================================================================================
	$('input, textarea').placeholder();
	$('.dropdown > .category-item, .dropdown > .group-item, span.dropdown-toggle').addClass('dropdown-toggle').attr('data-toggle','dropdown');

	// Run functions in initialize
	// ==================================================================================================================================
	banno.site.initialize();
	banno.site.setDate();
	setMobileMenuHeight([mblNav, mblOlb]);

	// Resize event handler
	// ==================================================================================================================================
	$(window).smartresize(function(){
			banno.site.dropdownHandling();
			banno.site.setTableScrolling();
			setMobileMenuHeight([mblNav, mblOlb]);
      // accessibilityButtonPosition();
    // accessibilityFooterSpace();
	});

  // $(window).scroll(function() {
  //   accessibilityButtonPosition();
  // });

	// Search Input
	// ==================================================================================================================================
	var sInp = $('#search-input');
	sInp.on('blur', function(){
		var cls = 'has-val';
		if (sInp.val().trim().length > 0)
			sInp.addClass(cls);
		else
			sInp.removeClass(cls);
	})

	// Close Alert
	// ==================================================================================================================================
	$('.alert button.close').on('click', function(e) {
		e.preventDefault();
		createCookie('alert', true, 1);
		$('.alert').hide();
	});

	//fix for modal elements auto-closing
	//=======================================================
	$("a[data-toggle='modal']").on("click", function(e){
		e.preventDefault();
		e.stopPropagation();
		var t = $(this).attr("href");
		if(t) {
			$(t).modal();
		}
	});

	//make 2-columna ccordion behave properly to close other items in group
	$('#accordion2col').on('show.bs.collapse', function () {
    	$('#accordion2col .in').collapse('hide');
	});

	// Header Togglers
	// ==================================================================================================================================
	$('.lock-body').on('click', function(){
		if ($(this).hasClass('collapsed'))
			$('body').addClass('fixed');
		else
			$('body').removeClass('fixed');
	})

	$('.login-toggle').on('click', function(){
		$('.login-closer').fadeIn();
	})
	$('.login-closer').on('click', function(){
		$(this).fadeOut();
	})

	$('#navbar-collapse').on('show.bs.collapse', function() {
		$(".online-banking-container").removeClass("toggled");
	});

	// Mobile Menu Functionality
	// ==================================================================================================================================

	// set height of mobile menu box
	function setMobileMenuHeight(els){
		for (var e=0; e<els.length; e++){
			if ($(window).innerWidth() < 640){
				els[e].css('height', $(window).innerHeight() - ($('#alertBox:visible').outerHeight() + $('.hdr > .container').outerHeight()));
			} else {
				els[e].removeAttr('style');
			}
		}
	}

	// set mobile nav height if it's open and then user closes the Alert
	$('#alertBox .close').on('click', function(){
		setMobileMenuHeight([mblNav, mblOlb]);
	})


	// First we dont want the submenus to close on us when clicking a group item
	// $('.navbar-collapse ul.banno-menu li .dropdown-menu>li>span').on('click',function (e) {
	// 	//e.preventDefault();
	// 	e.stopPropagation();
	// 	$(this).toggleClass("active");
	// 	$(this).next('.dropdown-menu').toggleClass('active');
	// 	//$(this).closest('li').toggleClass('calcOpen');
	// });

	$("nav .banno-menu li > a, nav .banno-menu li > span").on("click", function(e){
		if(Modernizr.mq('(max-width: 991px)') || $("html[data-whatinput='touch']").length >= 1 || $("html").hasClass("touch")){
			var $p = $(this).parent();
			if($p.hasClass("menu-internal") === false && $p.hasClass("menu-external") === false) {
	            e.preventDefault();
	            e.stopPropagation();
            	// if($(".navbar-toggle").is(":visible")) {
	            // 	$(".banno-menu >li.dropdown").not($p).removeClass("active open");
	            // }
	            if($p.hasClass("active open")) {
	                $p.removeClass("active open");
	            } else {
	            	$p.parent().find("li.dropdown.active.open").removeClass("active open");
	                $p.addClass("active open");
	            }
	        }
    	}
    });
		// $('.navbar-collapse ul.banno-menu>li.dropdown>.dropdown-menu').on('click',function (e) {
	// 	//e.preventDefault();
	// 	e.stopPropagation();
	// });

	// subad hovers
	// ============================================
	$('.subad').on('mouseenter', function(){
		$(this).addClass('hovered');
	}).on('mouseleave', function(){
		$(this).removeClass('hovered');
	})

	//loading script
	// ============================================
	$(".loader").each(function(){
			var $loader = $(this);
			var imgs = $loader.find("img");
			var loaded = 0;
			var $container = $loader.find(".load-watch");
			imgs.each(function(){ if($(this.complete)) ++loaded; });
			if(imgs.length == loaded) {
				$loader.find(".loading").fadeOut();
				setTimeout(function(){
					$loader.css({"background": "transparent","height": "auto", "overflow": "visible","border": 0});
					$container.animate({"opacity": 1},800);
				}, 600);
			}
	});

	// Animation when scroll to top is clicked.
	// ==================================================================================================================================
	$('#scrollTop').on('keydown', function(e) {
			var code = e.keyCode;
			if(code === 13 || code === 32) {
				e.preventDefault();
				$bodyhtml.animate({scrollTop: 0},600, function(){
					$logo.focus();
				}); // scroll to top for all other browsers
			}
	});
	$('#scrollTop').on('click', function(e) {
			e.preventDefault();
			$bodyhtml.animate({scrollTop: 0},600, function(){
					$logo.focus();
			}); // scroll to top for all other browsers
	});

	// Removes empty content areas
	// ================================================================
	$(".remove-blank").each(function() {
		if (window.self !== window.top || $.trim($(this).text()) || $(this).has("img").length) {
			//do nothing
		} else {
			$(this).remove();
		}
	});

	// AJAX Form Scripts
	// ==================================================================================================================================
	$('.ajax-form').submit(function(e) {
		var submittableForm;
		var formId = $(this).find(".form-id-input").val();
		//console.log(formId);
		e.preventDefault();
		if ($(this).parsley().isValid() === true) {
			submittableForm = $(this);
			formContainer = $(".ajax-form-container").find('.form-container');
			successContainer = $(".ajax-form-container").find('.success-container');
			return $.ajax({
				type: 'POST',
				url: '/_/api/form/'+formId+'/entries',
				data: submittableForm.serialize(),
				success: function() {
					formContainer.hide();
					successContainer.fadeIn();
					if(submittableForm.hasClass("no-scroll")===false) {
						 $bodyhtml.animate({
							 scrollTop: successContainer.offset().top-120
						 }, 600);
					}
					return false;
				},
				beforeSend: function() {
	            	submittableForm.find('button[type=submit]').attr('disabled', 'disabled');
	            	submittableForm.find('.loading').fadeIn();
	            	return submittableForm.find('div.error').hide().attr('aria-hidden', 'true');
	          	},
	          	error: function(data) {
		            $('.ajax-form div.error').html('');
		            submittableForm.find('button[type=submit]').removeAttr('disabled');
		            submittableForm.find('.loading').fadeOut('500');
		            //console.log(data);
		            try {
		            	var json = $.parseJSON(data.responseText);
			            $(json).each(function(i,val){
			              $.each(val,function(k,v){
			                var field = $('label[for="' + k + '"]').text()
			                $('div.error').append($('<div>', {
			                  text: field + " : " + v
			                }));
			              });
			            });
			        } catch(error) {
			        	//console.log(error);
			        	$('div.error').html("Error " + data.status + ": " + data.statusText);
			        }
		            return submittableForm.find('div.error').delay('600').fadeIn().attr('aria-hidden', 'false');
		        }
			});
		}
	});

	// Custom parsley validations
	//==================================================================================================================

	window.Parsley.addValidator('zip', {
		validateString: function(value) {
			var patt = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/);
			return patt.test(value);
		},
		messages: {
			en: 'This is not a valid zip code'
		}
	});
	window.Parsley.addValidator('phone', {
		validateString: function(value) {
			var patt = new RegExp(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/);
			return patt.test(value);
		},
		messages: {
			en: 'Please enter a valid phone number'
		}
	});
	window.Parsley.addValidator('date', {
		validateString: function(value) {
			var patt = new RegExp(/^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/);
			return patt.test(value);
		},
		messages: {
			en: 'Please use a valid date in format MM/DD/YYYY'
		}
	});
	// window.Parsley.addValidator('ssn', {
	//   validateString: function(value) {
	//     var patt = new RegExp(/^\d{4}$/);
	//     return patt.test(value);
	//   },
	//   messages: {
	//     en: 'Please enter only the last 4 digits'
	//   }
	// });
});
