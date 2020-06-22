
$(document).ready(function () {
  
  lightboxOnResize();
 
});

$(window).resize(function() {
  lightboxOnResize();

});

//***ISOTOPE***
// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  layoutMode: 'masonry',
  filter: '.prewed' 

});

// filter items on button click
$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});


  // Gallery Menu Style Active Code
    $('.btns button.btn').on('click', function () {

        $('.btns button.btn').removeClass('active');
        $(this).addClass('active');


    })




    // photos source: http://blog.repponen.com/blog/2014/7/28/moscow

