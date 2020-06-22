(function(window) {

    'use strict';

    $.exists = function(selector) {
        return ($(selector).length > 0);
    }

    window.onpageshow = function(event) {
      if (event.persisted) {
          PageTransition(); 
      }
    };

    // All Funtions
    PageTransition();
    Menu();
    ms_home_slider();
    Sort();
    UniteGallery();
    ValidForm();

})(window);

/*--------------------
    Page Transition
---------------------*/
function PageTransition() {
    var preload = anime({
        targets: '.ms-preloader',
        opacity: [1, 0],
        duration: 1000,
        easing: 'easeInOutCubic',
        complete: function(preload) {
            $('.ms-preloader').css('visibility', 'hidden');
        }
    });
    $('.ms-main-container').addClass('loaded');
    var cont = anime({
        targets: '.loaded',
        opacity: [0, 1],
        easing: 'easeInOutCubic',
        duration: 1000,
        delay: 300,
        complete: function(preload) {
            $('.ug-thumb-image').css({
                'opacity': '1'
            });
            $('.ms-section__block img').css({
                'opacity': '1'
            });
            $('.ug-thumb-wrapper, .post-item').css({
                'pointer-events': 'auto'
            });
        }
    });
    $(document).on('click', '[data-type="page-transition"]', function(e) {
        var url = $(this).attr('href');
        if (url != '#' && url != '') {
            e.preventDefault();
            $('.ms-preloader').css('visibility', 'visible');
            var url = $(this).attr('href');
            var preload = anime({
                targets: '.ms-preloader',
                opacity: [0, 1],
                duration: 300,
                easing: 'easeInOutQuad',
                complete: function(preload) {
                    window.location.href = url;
                }
            });
        }
    });
}

/*------------------
    Menu
-------------------*/
function Menu() {
    if ($.exists('.hamburger')) {
        $('.hamburger').on('click', function(e) {
            var burger = $(this);
            $(burger).toggleClass('is-active');
            $('.ms-nav').toggleClass('is-visible');
            $('.ms-header').not('.navbar-white').each(function() {
                $('.logo-light').toggleClass('active');
            });
        });
        $('.height-full-viewport').on({'mousewheel': function(e) {
            if (e.target.id === 'el') return;
            e.preventDefault();
            e.stopPropagation();
        }
})
    }
}

/*------------------
    Home Slider
-------------------*/
    function ms_home_slider() {
        if ($.exists('.swiper-container')) {
            var swiper = new Swiper('.swiper-container', {
            loop: false,
            speed: 1000,
            grabCursor: true,
            mousewheel: false,
            keyboard: true,
            simulateTouch: false,
            parallax: true,
            effect: 'slide',
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
            });
            $('.expanded-timeline__counter span:first-child').text('1');
            $('.expanded-timeline__counter span:last-child').text(swiper.slides.length);
            swiper.on('slideChange', function () {
                $('.expanded-timeline__counter span:first-child').text(swiper.activeIndex + 1);
            });

            }
    }

/*------------------
 Sort
-------------------*/
function Sort() {
    if ($.exists('.filtr-container')) {
        $('.filtr-container').filterizr();
        $('.filtr-btn li').on('click', function() {
            $('.filtr-btn li').removeClass('active');
            $(this).addClass('active');
        });
    }
}
/*------------------
 Unite-Gallery
-------------------*/
function UniteGallery() {
    if ($.exists('#gallery')) {
        $('#gallery').unitegallery({
            gallery_theme: 'tiles',
            tiles_type: "justified",
            tiles_col_width: 400,
            tiles_justified_row_height: 400,
            tiles_justified_space_between: 30,
            // tile_overlay_color: "#000",
            tile_overlay_opacity: 0.7,
            tile_enable_icons: false,
            tile_textpanel_position: "inside_bottom",
        });
    }
}
/*------------------
 Form Validation
-------------------*/
function ValidForm() {
    if ($.exists('#validForm')) {
        $('.form-control').focus(function() {
            $(this).prev('.control-label').addClass('active');
        });
        $('.form-control').focusout(function() {
            $(this).prev('.control-label').removeClass('active');
        });
        $("#validForm").validate({
            ignore: ":hidden",
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 16,
                },
                email: {
                    required: true,
                    email: true,
                },
                subject: {
                    required: true,
                    minlength: 4,
                    maxlength: 32,
                },
                message: {
                    required: true,
                    minlength: 16,
                },
            },
            messages: {
                name: {
                    required: "<span>Please enter your name</span>",
                    minlength: "<span>Your name must consist of at least 2 characters</span>",
                    maxlength: "<span>The maximum number of characters - 24</span>",
                },
                email: {
                    required: "<span>Please enter your email</span>",
                    email: "<span>Please enter a valid email address.</span>",
                },
                subject: {
                    required: "<span>Please enter your subject</span>",
                    minlength: "<span>Your name must consist of at least 2 characters</span>",
                    maxlength: "<span>The maximum number of characters - 16</span>",
                },
                message: {
                    required: "<span>Please write me message</span>",
                    minlength: "<span>Your message must consist of at least 16 characters</span>",
                    maxlength: "<span>The maximum number of characters - 100 </span>",
                },
            },
            submitHandler: function(form) {
                $.ajax({
                    type: "POST",
                    url: "contact.php",
                    data: $(form).serialize(),
                    beforeSend: function() {
                        // do something
                    },
                    success: function(data) {
                        if (data == "Email sent!");
                        $('input, textarea').val('');
                        $('.form-group').blur();
                        // do something
                    }
                });
                return false;
            }
        });
    }
}



