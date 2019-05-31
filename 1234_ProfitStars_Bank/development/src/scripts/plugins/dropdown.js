$(function () {
  // Exit Dropdown when escape key is pressed
  $('.banno-menu > .dropdown ul.dropdown-menu a, .banno-menu > .dropdown ul.dropdown-menu span').keydown(function(e){
    var code = e.keyCode;
  	if(code === 27){
      $(this).closest('li.dropdown').removeClass('open active')
  		$(this).closest('li.dropdown.menu-category').removeClass('open active');
  		$(this).closest('li.dropdown.menu-category').find('.dropdown-toggle').focus();
  		$(this).closest('li.dropdown.menu-category').find('.dropdown-toggle').attr('aria-expanded', 'false');
  	}
  });
  // Navigate menu with arrow keys
  $('.banno-menu > .dropdown > a, .banno-menu > .dropdown > span').on('keydown', function(e){
    var code = e.keyCode;
    if(code === 37) { // left arrow
      e.preventDefault();
      $(this).parent().prev().find('.dropdown-toggle').focus();
    }
    if(code === 39) { // right arrow
      e.preventDefault();
      $(this).parent().next().find('.dropdown-toggle').focus();
    }
    if(code === 40) { // down arrow
      e.preventDefault();
      $(this).parent().addClass('open active');
      $(this).parent().siblings().removeClass('open active');
      if($(this).siblings('ul').find('> li').hasClass('dropdown')){
        $(this).siblings('ul').find('li:first-child > ul > li:first-child > a').focus();
      } else {
        $(this).siblings('ul').find('li:first-child a').focus();
      }
    }
  });

  $('.banno-menu > .dropdown > .dropdown-menu > li > a').on('keydown', function(e){
    var code = e.keyCode;
    if(code === 37) { // left arrow
      e.preventDefault();
      $(this).closest('li.dropdown').prev().find('.dropdown-toggle').focus();
    }
    if(code === 38) { // up arrow
      e.preventDefault();
      if($(this).parent().is(':first-child') == true ) {
        $(this).closest('ul.dropdown-menu').find('li:last-child a').focus();
      } else {
        $(this).parent().prev().find('a').focus();
      }
    }
    if(code === 39) { // right arrow
      e.preventDefault();
      $(this).closest('li.dropdown').next().find('.dropdown-toggle').focus();
    }
    if(code === 40) { // down arrow
      e.preventDefault();
      if($(this).parent().is(':last-child') == true ) {
        $(this).closest('ul.dropdown-menu').find('li:first-child a').focus();
      } else {
        $(this).parent().next().find('a').focus();
      }
    }
  });
  $('.banno-menu > .dropdown > .dropdown-menu .dropdown-menu > li > a').on('keydown', function(e){
    var code = e.keyCode;
    if(code === 37) { // left arrow
      e.preventDefault();
      $(this).closest('li.dropdown').prev().find('.dropdown-menu > li:first-child > a').focus();
    }
    if(code === 38) { // up arrow
      e.preventDefault();
      if($(this).parent().is(':first-child') == true ) {
        $(this).closest('ul.dropdown-menu').find('li:last-child a').focus();
      } else {
        $(this).parent().prev().find('a').focus();
      }
    }
    if(code === 39) { // right arrow
      e.preventDefault();
      $(this).closest('li.dropdown').next().find('.dropdown-menu > li:first-child > a').focus();
    }
    if(code === 40) { // down arrow
      e.preventDefault();
      if($(this).parent().is(':last-child') == true ) {
        $(this).closest('ul.dropdown-menu').find('li:first-child a').focus();
      } else {
        $(this).parent().next().find('a').focus();
      }
    }
  });
});
