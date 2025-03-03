(function () {
    'use strict';

    if ($("#donate-modal").length && $(".buttonDonate").length  && $(".donate-modal-close").length) {
		$(document).on('click','.buttonDonate',function(){
			$("#donate-modal").show();
			if ($('body').hasClass('offcanvas')) {
                $('body').removeClass('offcanvas');
                $('.js-oliven-nav-toggle').removeClass('active');
            }
		});
		$(document).on('click','.donate-modal-close',function(){
			$("#donate-modal").hide();
		});
		$(document).on('click','body',function(e){
			if(e.target.id == $("#donate-modal").attr('id')) { $("#donate-modal").hide(); }
		});
	}
	
	$(document).on('click', '#donate-modal .crypto-item', function(){
		let parent = $(this).parents('.donate-card');
		parent.find('.cryptos-box-view').show();
		parent.find('.cryptos-box-view .coin-img').html('<img src="'+$(this).data('img')+'" />');
		parent.find('.cryptos-box-view .coin-id').html($(this).data('id'));
		parent.find('.cryptos-box-view .coin-address').html($(this).data('address'));
		parent.find('.cryptos-box-view .coin-qr-code').html('').qrcode({width: 160,height: 160,text: $(this).data('address')});
	});
	
	$(document).on('click', '#donate-modal .cryptos-box-view-close', function(){
		let parent = $(this).parents('.donate-card');
		parent.find('.cryptos-box-view').hide();
	});

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        }
        , BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        }
        , iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        }
        , Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        }
        , Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        }
        , any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    // Preloader
    $(window).load(function() {
    $('.preloader').fadeOut("slow");
    });
    // Animations
    var contentWayPoint = function () {
        var i = 0;
        $('.animate-box').waypoint(function (direction) {
            if (direction === 'down' && !$(this.element).hasClass('animated')) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function () {
                    $('body .animate-box.item-animate').each(function (k) {
                        var el = $(this);
                        setTimeout(function () {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated');
                            }
                            else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated');
                            }
                            else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated');
                            }
                            else {
                                el.addClass('fadeInUp animated');
                            }
                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });
                }, 100);
            }
        }, {
            offset: '85%'
        });
    };
    // Burger Menu 
    var burgerMenu = function () {
        $('.js-oliven-nav-toggle').on('click', function (event) {
            event.preventDefault();
            var $this = $(this);
            if ($('body').hasClass('offcanvas')) {
                $this.removeClass('active');
                $('body').removeClass('offcanvas');
            }
            else {
                $this.addClass('active');
                $('body').addClass('offcanvas');
            }
        });
    };
    
    
    if ($("#wish-form").length) {
        $("#wish-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 5
                },
                content: {
                    required: true,
                    minlength: 10
                },
                email: {
                    required: false,
                    email: true
                },
            },

            messages: {
                name: {
                    required: 'Vui lòng nhập tên của bạn.',
                    minlength: 'Tên phải lớn hơn 5 ký tự.',
                },
                content: {
                    required: 'Vui lòng nhập lời chúc.',
                    minlength: 'Lời chúc phải lớn hơn 10 ký tự.',
                },
                email: {
                    email: 'Địa chỉ email không hợp lệ.'
                }
            },
			errorPlacement: function(error, element) {
				if (element.attr("name") == "content" ) {
					error.insertAfter("#wish-form .vitualTextarea");
				} else {
					error.insertAfter(element);
				}
			},

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "/wish",
                    data: $(form).serialize(),
                    success: function (res) {
                        $( "#loader").hide();
                        if(!res.error){
                            $('.wish-box').scrollTop(0);
                            $('.wish-box').prepend('<div class="wish-box-item bg"><strong>'+$(form).find("input[name='name']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")+'</strong><p>'+$(form).find("textarea[name='content']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")+'</p></div>');
                            $( "#success").html(res.message).slideDown( "slow" );
                            setTimeout(function() {
                            $( "#success").slideUp( "slow" );
                            }, 5000);
                        }else{
                            $( "#error").html(res.message).slideDown( "slow" );
                            setTimeout(function() {
                            $( "#error").slideUp( "slow" );
                            }, 5000);
                        }

                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 5000);
                    }
                });
                return false;
            }

        });
    }
    
    if ($("#clock").length) {
        function timeElapse(date){
            var current = Date();
            var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
            var days = Math.floor(seconds / (3600 * 24));
            if (days < 10) {
                days = "0" + days;
            }
            seconds = seconds % (3600 * 24);
            var hours = Math.floor(seconds / 3600);
            if (hours < 10) {
                hours = "0" + hours;
            }
            seconds = seconds % 3600;
            var minutes = Math.floor(seconds / 60);
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            seconds = seconds % 60;
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var html = '<li><span id="days">' + days + '</span>'+ $('#clock').data('text-day') +'</li><li><span id="hours">' + hours + '</span>'+ $('#clock').data('text-hour') +'</li><li><span id="minutes">' + minutes + '</span>'+ $('#clock').data('text-minute') +'</li><li><span id="seconds">' + seconds + '</span>'+ $('#clock').data('text-second') +'</li>';
            $('#clock').html(html);
        }

        $('#clock').countdown($('#clock').data('date'), function(event) {
            if(event.type == 'stoped'){
                var together = new Date($('#clock').data('date'));           
                together.setHours(0);                           
                together.setMinutes(0);             
                together.setSeconds(0);                 
                together.setMilliseconds(0);
                setInterval(function() {
                    timeElapse(together);
                }, 1000);
            }else{
                var $this = $(this).html(event.strftime(''
                + '<li><span id="days">%D</span>'+ $('#clock').data('text-day') +'</li>'
                + '<li><span id="hours">%H</span>'+ $('#clock').data('text-hour') +'</li>'
                + '<li><span id="minutes">%M</span>'+ $('#clock').data('text-minute') +'</li>'
                + '<li><span id="seconds">%S</span>'+ $('#clock').data('text-second') +'</li>'));
            }
        });
    }
		    
    // Click outside of offcanvass
    var mobileMenuOutsideClick = function () {
        $(document).click(function (e) {
            var container = $("#oliven-aside, .js-oliven-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('offcanvas')) {
                    $('body').removeClass('offcanvas');
                    $('.js-oliven-nav-toggle').removeClass('active');
                }
            }
        });
        $(window).scroll(function () {
            if ($('body').hasClass('offcanvas')) {
                $('body').removeClass('offcanvas');
                $('.js-oliven-nav-toggle').removeClass('active');
            }
        });
    };
    // Document on load.
    $(function () {
        contentWayPoint();
        burgerMenu();
        mobileMenuOutsideClick();
    });
    // Sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    // Friends owlCarousel
    $('.friends .owl-carousel').owlCarousel({
        loop: true
        , margin: 30
        , mouseDrag: true
        , autoplay: false
        , dots: true
        , responsiveClass: true
        , responsive: {
            0: {
                items: 1
            , }
            , 600: {
                items: 2
            }
            , 1000: {
                items: 2
            }
        }
    });
    // When & Where owlCarousel
    $('.whenwhere .owl-carousel').owlCarousel({
        loop: false
        , margin: 30
        , mouseDrag: true
        , autoplay: false
        , dots: true
        , responsiveClass: true
        , responsive: {
            0: {
                items: 1
            , }
            , 600: {
                items: 1
            }
            , 1000: {
                items: 2
            }, 1300: {
                items: 3
            }, 1500: {
                items: 4
            }
        }
    });

    // Gift Registry owlCarousel
    $('.gift .owl-carousel').owlCarousel({
        loop: true
        , margin: 30
        , mouseDrag: true
        , autoplay: true
        , dots: false
        , responsiveClass: true
        , responsive: {
            0: {
                margin: 10
                , items: 2
            }
            , 600: {
                items: 3
            }
            , 1000: {
                items: 4
            }
        }
    });
    // Smooth Scrolling
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

    // Magnific Popup
    $(".img-zoom").magnificPopup({
    type: "image"
    , closeOnContentClick: !0
    , mainClass: "mfp-fade"
    , gallery: {
        enabled: !0
        , navigateByImgClick: !0
        , preload: [0, 1]
    }
});

    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-play-btn").length) {
        $(".video-play-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }
        /*------------------------------------------
    = MENU ACCESSBILITY
    -------------------------------------------*/
    $('.btn-menu-open').click(function() {
        $('ul.list-menu-icon').css('opacity','1');
        $('ul.list-menu-icon').css('pointer-events','');
        $('.btn-menu-close').show();
        $('.btn-menu-open').hide();
    })
    $('.btn-menu-close').click(function() {
        $('ul.list-menu-icon').css('opacity','0');
        $('ul.list-menu-icon').css('pointer-events','none');
        $('.btn-menu-open').show();
        $('.btn-menu-close').hide();
    })
    setTimeout(() => {
        $('.btn-menu-open').hide();
        $('.btn-menu-close').show();
        $('ul.list-menu-icon').css('opacity','1');
    }, 3000); 
    if($('.bii-logo').length > 0){
       $('#menu-access').css('bottom','278px');
       document.querySelector('style').textContent += "@media (max-width: 799px){#menu-access{bottom: 238px!important;}}"
    }
    function shakeTooltip(){
        var arrTooltip = $('ul.list-menu-icon').children();
        arrTooltip.each(function(index) {
            setTimeout(() => {
                if(document.querySelector('.btn-menu-close').style.display !== "none"){  
                    $(this).addClass('shake');
                    $(this).children().children().children('.tooltiptext').css('visibility','visible');
                    setTimeout(() => {
                        $(this).children().children().children('.tooltiptext').css('visibility','');
                        $(this).removeClass('shake');
                    }, 3000);
                } else{
                    return false;
                }
            }, index*5000); 
        });   
    }
    if($('#menu-access').length >0){
        setTimeout(() => {
            shakeTooltip();
            myInterval = setInterval(shakeTooltip, 20000);
        }, 3000);
    }
    $('.btn-menu-close').click(function(){
        $('tooltiptext').css('visibility','');
        clearInterval(myInterval);
    });

    // ALBUM GALLERIES
    $(window).on("load", function () {
        var e = $(".gallery-filter");
        e.isotope({
            itemSelector: '.gallery-item',
            filter: "*"
            , layoutMode: "masonry"
        });
    });
        
    $(document).on('click', '.btn-see-more-gallery', function(){
        let indexNumber = $(this).data('index') || 0;
        $(this).lightGallery({
            thumbnail: true,
            dynamic: true,
            dynamicEl: photoGalleries,
            download: false,
            autoplay: true,
            preload: 2,
            appendSubHtmlTo: '.lg-item',
            index: parseInt(indexNumber)
        });
    });

    $(document).on('click', '.qr-code-image', function(){
        let srcImage = $(this).attr('src');
        $(this).lightGallery({
            thumbnail: true,
            dynamic: true,
            dynamicEl:  [{
                src: srcImage,
            }],
            download: false,
            autoplay: true,
            preload: 2,
            appendSubHtmlTo: '.lg-item',
        });
    });
    
}());
 
