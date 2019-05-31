// Make sure we don't overwrite our namespace
if (banno === null || banno === undefined)
	var banno = {};
if (banno.site === null || banno.site === undefined)
	banno.site = {};


// Set your bank name here which is used throughout disclaimers.
banno.site.name = 'ProfitStars Test Bank';
banno.site.dropdownMouseEventsOn = false;

// Overrides the default disclaimer message for the ATM Locator and is also the message for external links.

function setDisclaimerVerbiage(p,t) {
	var proceed = "<br/><br/>If you \"Proceed\",";
	if(p==="mobile") { proceed = "If you click \"Ok\","; }
	if(t==="email") { return 'Because there is a risk that information transmitted via Internet email could fall into the wrong hands, ' + banno.site.name + ' suggests that confidential information, such as account numbers or social security numbers, not be transmitted via email. If this information must be stated, please contact ' + banno.site.name + ' by phone or at your nearest office. '+proceed+' the link will open a new email message in your default email program.';
	} else if( t==="branded") {
      return 'You will be linking to another site managed by ' + banno.site.name + '. ' + proceed + ' the link will open in a new window.';
	} else { return 'You will be linking to another website not owned or operated by ' + banno.site.name + '. ' + banno.site.name + ' is not responsible for the availability or content of this website and does not represent either the linked website or you, should you enter into a transaction. The inclusion of any hyperlink does not imply any endorsement, investigation, verification or monitoring by ' + banno.site.name + ' of any information in any hyperlinked site. We encourage you to review their privacy and security policies which may differ from ' + banno.site.name + '.' + proceed +' the link will open in a new window.'; }
}

var defaultDisclaimerMessage = setDisclaimerVerbiage("desktop","external");

// Initialize our banno.site namespace and kick off needed methods here
banno.site.initialize = function() {
	banno.site.setExternalLinks();
	banno.site.createExternalEmailModal();
	banno.site.attachEventHandlers();
	banno.site.dropdownHandling();
	banno.site.displayAlert();
}

// Disclaimer Methods
banno.site.setExternalLinks = function(scope) {
	$.expr[':'].external = function(obj) {
		return !obj.href.match(/^mailto\:/)
		&& (obj.hostname != location.hostname)
		&& !obj.href.match(/^javascript/)
		&& !obj.href.match(/^tel\:/)
		&& !obj.href.match(/^$/)
		&& !obj.href.match(/^https\:\/\/www\.netteller\.com/);
	};
	$('a:external', scope).addClass('external');
	$('a:external[name]', scope).removeClass('external');
}

banno.site.createExternalEmailModal = function() {
	$('a[href^="mailto:"]').click(function(e) {
		e.preventDefault();
		var mailToMsg = setDisclaimerVerbiage("desktop","email");
		var mobileMailToMsg = setDisclaimerVerbiage("mobile","email");
		var outboundBump = $(this).attr('href');
		if (Modernizr.mq('only all and (max-width: 767px)')) {
			var r = confirm(mobileMailToMsg);
			if (r === true) {
				window.open(outboundBump);
			}
		}
		else {
			bootbox.confirm(mailToMsg, 'Cancel', 'Proceed', function(result) {
				if (result) {
					$('.modal-backdrop').hide();//fix for modal backdrop in safari
					window.open(outboundBump);
				}
			});
		}
	});
}

banno.site.openNewWindow = function() {
	$('a').each(function() {
		if ( $(this).attr('target') == '_blank') {
				$(this).append("<span class='sr-only'> (Opens in a new Window)</span>");
		}
	});
}
banno.site.setDate = function() {
	var d = new Date();
	var year = d.getFullYear();
	$(".copy-date").text(year);
}
banno.site.setDisclaimers = function(link) {
	var speedbump = link.attr('href');
	var exitMsg = setDisclaimerVerbiage("desktop","external");
	var mobileExitMsg = setDisclaimerVerbiage("mobile","external");
	var test = $('bootbox.modal').hasClass('in');
	/* Add URLS to this if statement to make them have branded disclaimer as opposed to external link disclaimer */
	if(speedbump.match(/^https\:\/\/es\.loanspq\.com/)) {
    	var exitMsg = setDisclaimerVerbiage("desktop","branded");
    	var mobileExitMsg = setDisclaimerVerbiage("mobile","branded");
  	}
	if(test===false) {
		if (Modernizr.mq('only all and (max-width: 767px)')) {
				var r = confirm(mobileExitMsg);
				if (r === true) { window.open(speedbump); }
		}
		else {
			bootbox.confirm(exitMsg, 'Cancel', 'Proceed', function(result) {
					if (result) {
							$('.modal-backdrop').hide();//fix for modal backdrop in safari
							window.open(speedbump);
					} else {
						$('.bootbox.modal').on('hidden.bs.modal', function (e) {
								 $(link).focus();
						 });
					}
			});
		}
	}
}

banno.site.attachEventHandlers = function(scope) {
	$("body").on('click',"a.external", function(e) {
		/* this if statement prevents double binding of location list disclaimer */
		if($(this).hasClass("banno-location-directions")===false) {
			var checkDisc = 0;
			var disclaimerID = $(this).attr('data-disclaimer-id');
			if(disclaimerID) {
				var checkDisc = disclaimerID.length;
			}
			if(checkDisc < 5 && disclaimerID != "null") {
				//console.log("clicked link")
				e.preventDefault();
				e.stopPropagation();
				banno.site.setDisclaimers($(this));
			}
		}
	});
    // $(".social-feed-container").on('click',"a.external", function(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     var checkDisc = 0;
    //     if($(this).attr('data-disclaimer-id')) {
    //       var checkDisc = $(this).attr('data-disclaimer-id').length;
    //     }
    //     if(checkDisc < 5 && disclaimerID != "null") {
    //       banno.site.setDisclaimers($(this));
    //     }
    // });
	// Un comment to add Disclaimers to the news feed
	// =======================================================================
	// $('.b-news', scope).bind('bannoDataReceived', function(event, scope) {
	//     if(scope !== null && scope !== undefined){
	//         banno.site.setExternalLinks(scope);
	//         banno.site.attachEventHandlers(scope);
	//     }
	// });
}

banno.site.dropdownHandling = function(){
	var $dropdowns = $('.dropdown');

	// If width is above 979, add hover events (also force IE to use hover since the modernizr query doesn't run in IE)
	if(Modernizr.mq('(min-width: 979px) and (orientation: landscape)') || navigator.appName == 'Microsoft Internet Explorer') {
		if(!banno.site.dropdownMouseEventsOn){
			// Mouse events are on, so set flag
			banno.site.dropdownMouseEventsOn = true;

			// Open dropdowns on hover
			$dropdowns.on('mouseover', function() {
				var $this;
				$this = $(this);
				if ($this.prop('hoverTimeout')) {
					$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
				}
				return $this.prop('hoverIntent', setTimeout(function() {
					return $this.addClass('open active');
				}, 150));
			}).on('mouseleave', function() {
				var $this;
				$this = $(this);
				if ($this.prop('hoverIntent')) {
					$this.prop('hoverIntent', clearTimeout($this.prop('hoverIntent')));
				}
				return $this.prop('hoverTimeout', setTimeout(function() {
					return $this.removeClass('open active');
				}, 150));
			});
		}
	}

	// If width is under 979, remove hover events
	if(Modernizr.mq('(max-width: 979px)') || $("html[data-whatinput='touch']").length >= 1){
		if(banno.site.dropdownMouseEventsOn){
			$dropdowns.off('mouseover').off('mouseleave');
			banno.site.dropdownMouseEventsOn = false;
		}
	}
}

$(window).bind('bannoDataReceived', function(event, scope) {
	if(scope !== null && scope !== undefined){
		banno.site.setExternalLinks(scope);
		banno.site.attachEventHandlers(scope);
	}
});

// Cookie
// ==================================================================================================================================
function createCookie(name,value,days) {
	if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);

	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

banno.site.displayAlert = function() {
	var alert=readCookie("alert");
	if(alert == null && $.trim($('.alert.hidden-alert .alert-body').text())) {
		$('.alert.hidden-alert').show();
	}
}

// Function to get screen size, used in conjunction with the .screener class,
// typically placed in the footer
// ==================================================================================================================================
banno.site.getScreenSize = function() {
	var s = $(".screener").css("content").replace(/\"/g,"");
	switch(s) {
		case "right":  return "mobile"; break;
		case "xsmall":   return "tablet"; break;
		default: return "desktop"; break;
	}
}

// function to set the overflow of the table container div and show/hide the swiper
// ==================================================================================================================================
banno.site.setTableScrolling = function() {
	$(".table-responsive").each(function(){
			var c = $(this).outerWidth();
			var t = $(this).find("table").width();
			//console.log(c,t);
			if(t > c) {
				$(this).find(".table-inside").css({"overflow-x": "scroll"});
				$(this).find(".swiper").show();
			} else {
				$(this).find(".table-inside").css({"overflow-x": "hidden"});
				$(this).find(".swiper").hide();
			}
	});
}

// function to get iframe videos and embedd them asyncronously for the fullwidth video banner
// ===============================================================================
// banno.site.setBannerVideos = function() {
// 	if($(".bannerVideo__container iframe").length > 0) {
// 			var videosrc = $(".bannerVideo__container iframe").attr("src");
// 			var youtube = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
// 			var yid = videosrc.match(youtube)[1]; // id = 'XXXXXXXXXX'

// 			if(yid) {  //run the youtube stuff
// 					$(".bannerVideo__container iframe").remove();
// 					$(".bannerVideo__container .video-container").hide();
// 					var $player = $("#ytplayer");
// 					$player.addClass("init").wrap("<div class='flex-video'></div>");
// 					// Based on the YouTube ID, we can easily find the thumbnail image
// 					$player.css('background-image', 'url(//i.ytimg.com/vi/' + yid + '/sddefault.jpg)');
// 					// Load the IFrame Player API code asynchronously.
// 					var tag = document.createElement('script');
// 					tag.src = "https://www.youtube.com/player_api";
// 					var firstScriptTag = document.getElementsByTagName('script')[0];
// 					firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 					// Replace the 'ytplayer' element with an <iframe> and
// 					// YouTube player after the API code downloads.
// 					var player;
// 					window.onYouTubePlayerAPIReady = function() {
// 						player = new YT.Player('ytplayer', {
// 							videoId: yid,
// 							playerVars: {
// 								autoplay: 1,
// 								fs: 0,
// 								loop: 1,
// 								rel: 0,
// 								controls:0,
// 								modestbranding: 1,
// 								showinfo: 0
// 							},
// 							events: {
// 									'onReady': onPlayerReady,
// 							}
// 						});
// 					}
// 					function onPlayerReady(event){
// 						player.mute();
// 					}
// 			}
// 	}
// 	// if($(".bannerVideo__container video").length > 0) {
// 	// 	//jQuery is required to run this code
// 	// 	scaleVideoContainer();

// 	// 	initBannerVideoSize('.bannerVideo__container .video-container .poster img');
// 	// 	initBannerVideoSize('.bannerVideo__container .video-container .filter');
// 	// 	initBannerVideoSize('.bannerVideo__container .video-container video');

// 	// 	$(window).on('resize', function() {
// 	// 			scaleVideoContainer();
// 	// 			scaleBannerVideoSize('.bannerVideo__container .video-container .poster img');
// 	// 			scaleBannerVideoSize('.bannerVideo__container .video-container .filter');
// 	// 			scaleBannerVideoSize('.bannerVideo__container .video-container video');
// 	// 	});
// 	// }
// 	// function scaleVideoContainer() {

// 	// 		var height = $(window).height() + 5;
// 	// 		var unitHeight = parseInt(height) + 'px';
// 	// 		$('.bannerVideo__container').css('height',unitHeight);

// 	// }

// 	// function initBannerVideoSize(element){

// 	// 		$(element).each(function(){
// 	// 				$(this).data('height', $(this).height());
// 	// 				$(this).data('width', $(this).width());
// 	// 		});

// 	// 		scaleBannerVideoSize(element);

// 	// }

// 	// function scaleBannerVideoSize(element){

// 	// 		var windowWidth = $(window).width(),
// 	// 		windowHeight = $(window).height() + 5,
// 	// 		videoWidth,
// 	// 		videoHeight;

// 	// 		// console.log(windowHeight);

// 	// 		$(element).each(function(){
// 	// 				var videoAspectRatio = $(this).data('height')/$(this).data('width');

// 	// 				$(this).width(windowWidth);

// 	// 				if(windowWidth < 1000){
// 	// 						videoHeight = windowHeight;
// 	// 						videoWidth = videoHeight / videoAspectRatio;
// 	// 						$(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

// 	// 						$(this).width(videoWidth).height(videoHeight);
// 	// 				}

// 	// 				$('.bannerVideo__container .video-container video').addClass('fadeIn animated');

// 	// 		});
// 	// }
// }
//function to remove the disclaimer set by the CMS from the location directions and make them open in a new window
var waitForEl = function(selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 100);
  }
};

function accessibilityButtonPosition() {
  var windowHeight = $(window).height();
  var pageHeight = $(document).height();
  var scrollPos = $(window).scrollTop();

  if (scrollPos + windowHeight < pageHeight) {
    $('.accessibility').addClass('side-stick').removeClass('sticky-footer').removeClass('footer');
  } else {
    $('.accessibility').removeClass('side-stick').addClass('sticky-footer').removeClass('footer');
  }
}

function accessibilityFooterSpace() {
  var footerPaddingBottom = ($('footer').outerHeight() - $('footer').height()) / 2;
  var accessibilityHeight = $('.accessibility').outerHeight();
  var totalSpace = footerPaddingBottom + accessibilityHeight;

  $('footer').css({"padding-bottom": totalSpace});
}

// GLOBAL VARIABLES
// ==================================================================================================================================

var $body = $("body"),
	$bodyhtml = $("body,html"),
	$slider = $(".slider"),
	$logo = $('.logo');
