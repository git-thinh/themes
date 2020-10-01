(function($) {
    "use strict";
    var isMobile;
    var stickOnScroll;
    $(document).ready(function() {
        if ($(window).width() < 768) {
            $(".navigation .has-sub").each(function() {
            	$(".navigation .has-sub .parent").attr("href", "javascript:void(0);");
            });
        } else {
        	var className = $(".navigation .has-sub .parent");
        	$(".navigation .has-sub").each(function(index, obj) {
        		var text = $(className[index]).text();
        		var url_safe = stripStringForURLSafe(text).toLowerCase();
        		$(className[index]).attr("href", baseUrl() + url_safe);
        	});
        }
        $(window).resize(function() {
            if ($(window).width() < 768) {
            	$(".navigation .has-sub").each(function() {
                	$(".navigation .has-sub .parent").attr("href", "javascript:void(0);");
                });
            } else {
            	var className = $(".navigation .has-sub .parent");
            	$(".navigation .has-sub").each(function(index, obj) {
            		var text = $(className[index]).text();
            		var url_safe = stripStringForURLSafe(text).toLowerCase();
            		$(className[index]).attr("href", baseUrl() + url_safe);
            	});
            }
        });
        
        function baseUrl() {
            return window.location.origin ? window.location.origin + '/' : window.location.protocol + '/' + window.location.host + '/';
        }
        if ($('#contact_form').length) {
        	$("#contact_form").validate({
                rules: {
                    full_name: {
                        required: true,
                    },
                    phone: {
                        required: true,
                    },
                    email: {
                        required: true,
                        email: true,
                    },
                    content: {
                        required: true,
                    },
                    captcha: {
                        required: true,
                    }
                },
                messages: {
                    full_name: "Vui lòng nhập họ và tên.",
                    phone: "Vui lòng nhập điện thoại.",
                    email: {
                        required: "Vui lòng nhập email của bạn.",
                        email: "Email của bạn phải thuộc định dạng name@domain.com."
                    },
                    content: "Vui lòng nhập nội dung liên hệ.",
                    captcha: "Vui lòng nhập mã an toàn.",
                }
            });
        }
        if ($('#request_form').length) {
        	$("#request_form").validate({
                rules: {
                    full_name: {
                        required: true,
                    },
                    phone: {
                        required: true,
                    },
                    email: {
                        required: true,
                        email: true,
                    },
                    address: {
                        required: true,
                    },
                    service: {
                    	required: true,
                    },
                    content: {
                        required: true,
                    },
                    captcha: {
                        required: true,
                    }
                },
                messages: {
                    full_name: "Vui lòng nhập họ và tên.",
                    phone: "Vui lòng nhập điện thoại.",
                    email: {
                        required: "Vui lòng nhập email của bạn.",
                        email: "Email của bạn phải thuộc định dạng name@domain.com."
                    },
                    address: "Vui lòng nhập địa chỉ.",
                    service: "Vui lòng chọn dịch vụ.",
                    content: "Vui lòng nhập nội dung đăng ký.",
                    captcha: "Vui lòng nhập mã an toàn.",
                }
            });
        	$('#service').change(function(){
        		if ($('#content').val()) {
        			$('#content').val($('#content').val() + '\nYêu cầu tư vấn dịch vụ ' + $('#service option:selected').val());
        		} else {
        			$('#content').val($('#content').val() + 'Yêu cầu tư vấn dịch vụ ' + $('#service option:selected').val());
        		}
            });
        }
        //Header Option
        $('#header').addClass('normal');
        //Choose Here Class Name (normal or fixed or intelligent);

        if ($('.bxslider').length) {
            $('.bxslider').bxSlider({
                minSlides: 2,
                maxSlides: 2,
                slideWidth: 415,
                slideMargin: 10
            });
        }

        $('.tab > div').hide();
        $('.tab > div:first').show();
        $('.bxslider li .features-tab').on('click', function() {
            $('.bxslider li').removeClass('active');
            $(this).parent().addClass('active');
            var blockList = $(this).attr('data-filter');
            //alert(blockList)
            $('.tab > div').hide();
            $('#' + blockList).css({
                'display': 'block'
            });
        });

        $(".nav-icon").on('click', function() {
        	$(this).toggleClass("active");
            if ($(window).width() < 768) {
                $('.navigation').slideToggle();
            }
        });

        $(".navigation li").on('click', function() {
            if ($(window).width() < 768) {
                //$('.sub-menu').slideUp();
                $(this).children('.sub-menu').slideToggle();
            }
        });
        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
            $('body').addClass('Safari');
        }
        $('.features-text-wrap > div').hide();
        $('.features-text-wrap > div:first').show();
        $('.features-icon li i').on('click', function() {
            $('.features-icon li').removeClass('active')
            $(this).parent().addClass('active');
            var blockList = $(this).attr('data-filter');
            $('.features-text-wrap > div').hide();
            $('#' + blockList).css({
                'display': 'block'
            });
        });
        //=======================audio player function===================

        if ($('audio').length) {
            $('audio').audioPlayer();
        }

        //===========owl carousel========
        initSlider('services-slides', 4, true, true, true, false);
        initSlider('news-slides', 4, true, true, true, false);
        initSlider('testimonials-slides', 3, true, true, true, false);
        initSlider('customers-slides', 5, true, true, true, false);
        initSlider('more-slides', 3, true, true, true, false);
        
        /*$("#more-slides").owlCarousel({
			autoPlay : false, //Set AutoPlay to 3 seconds
			navigation : false,
			pagination : false,
			items : 3,
			itemsDesktop : [1199, 3],
			itemsDesktopSmall : [979, 2],
			itemsMobile : [480, 1]

		});*/

        if ($('.select').length > 0) {
            $(".select").selectbox();
        }

        //this function only for Desktop view
        isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|BlackBerry|iPad|IEMobile|Opera Mini)/);
        if ((!isMobile)) {

            var animSection = function() {
                jQuery('.anim-section').each(function() {
                    if (jQuery(window).scrollTop() > (jQuery(this).offset().top - jQuery(window).height() / 1.15)) {
                        jQuery(this).addClass('animate');
                    }
                });
            };
            if (jQuery('.anim-section').length) {
                animSection();
                jQuery(window).scroll(function() {
                    animSection();
                });
            }

            jQuery(window).load(function() {

                if (jQuery('.parallax').length) {
                    jQuery('.parallax').each(function() {
                        parallax(jQuery(this), 0.1);
                    });
                }
            });
            jQuery(window).scroll(function() {
                if (jQuery('.parallax').length) {
                    jQuery('.parallax').each(function() {
                        parallax(jQuery(this), 0.1);
                    });
                }
            });

            jQuery(window).scroll(function() {
                if (jQuery('.help-info.parallax').length) {
                    jQuery('.help-info.parallax').each(function() {
                        parallax(jQuery(this), 0);
                    });
                }
            });
        }
        if ($('#slider-range').length) {
            $("#slider-range").slider({
                range: true,
                min: 0,
                max: 500,
                values: [75, 300],
                slide: function(event, ui) {
                    $("#amount").val("$" + ui.values[0]);
                    $("#amount1").val("$" + ui.values[1]);
                }
            });

            $("#amount").val("$" + $("#slider-range").slider("values", 0));
            $("#amount1").val("$" + $("#slider-range").slider("values", 1));

            $('#slider-range .ui-slider-handle:first').append(amount);
            $('#slider-range .ui-slider-handle:last').append(amount1);
        }

        // Shop Details
        $(".custom-thumbnail li img").on('click', function() {
            var thumbnail = $(this).attr("src");
            $(".product-1 img").attr("src", thumbnail);
        });

        //=========== Light box function ================
        if ($('.fancybox-media').length) {
            $('.fancybox-media').fancybox({
                openEffect: 'none',
                closeEffect: 'none',
                helpers: {
                    media: {}
                }
            });
        }

        //=================Header Style function================
        $(window).load(function() {
            if ($('#header').hasClass('fixed')) {
                $('#header').next().addClass('top-m');
            }
            if ($('#header').hasClass('intelligent')) {
                $('#header').next().addClass('top-m');
            };
        });

        var class_pr = $('body').attr('class');
        var headerHeight = $('#header').outerHeight();
        var st = $(window).scrollTop();
        stickOnScroll = function() {

            if ($('#header').hasClass("intelligent")) {

                $('#header').removeClass('normal');
                $('#header').next().addClass('top-m');
                var pos = $(window).scrollTop();

                if (pos > headerHeight) {
                    if (pos > st) {
                        $('#header').addClass('simple')
                        $('#header.simple').removeClass('down');
                        $('#header.simple').addClass('fixed up');

                    } else {
                        $('#header.simple').removeClass('up');
                        $('#header.simple').addClass('fixed down');

                    }
                    st = pos;

                } else {
                    $('#header.simple').removeClass('fixed down up simple');
                }
                if (pos == $(document).height() - $(window).height()) {
                    $('#header.simple').removeClass('up');
                    $('#header.simple').addClass('fixed down');
                }

            } else if ($('body').hasClass("fix")) {

                $('#header').next().addClass('top-m');
                $('#header').addClass('simple fixed');
                $('#header').removeClass('down up');
                $('#wrapper').css({
                    paddingTop: 0
                });
            } else {

                $('#header.simple').removeClass('fixed down up simple');
                $('#header').addClass('normal');
                //$('.spacetop').removeClass('top-m');
                $('#wrapper').css({
                    paddingTop: 0
                });
            }
        };
        
        //===========mixit filter (for gallery)========
        if ($('#mixit-container').length) {
        	$("#mixit-container").mixItUp();
        	$('.fancybox').fancybox();
        }
        
        stickOnScroll();
        $(window).scroll(function() {
            stickOnScroll();
        });

        // end for sticky header

    });
    
    //===========window scroll function========
    $(window).scroll(function() {
        if (!isMobile) {
            if ($('.parallax').length) {
                $('.parallax').each(function() {
                    parallax($(this), 0.1);
                });
            }
        }

        //Header Fix On Scroll
        var posScroll = $(window).scrollTop();
        var primaryH = $('.primary-header').outerHeight();
        if (posScroll > primaryH) {
            $('#header').addClass('fix');
        } else {
            $('#header').removeClass('fix');
        }
    });
    //===========window Load function========
    $(window).load(function() {
        $('.bxslider li').eq(2).addClass('active');

        if ($('.flexslider').length) {
            jQuery('.flexslider').flexslider({
                animation: "slide"
            });
        }
        if ($('.flexslider1').length > 0) {
            $('.flexslider1').flexslider({
                animation: "slide",
                controlNav: false
            });
        }

        $('.loader-block').delay(50).fadeOut();

        if ($('#content-1').length) {
            $("#content-1").mCustomScrollbar({
                theme: "minimal"
            });
        }
        if ($('#content-2').length) {
            $("#content-2").mCustomScrollbar({
                theme: "minimal"
            });
        }
        if (!isMobile) {
            if ($('.parallax').length) {
                $('.parallax').each(function() {
                    parallax($(this), 0.1);
                });
            }
        }

        //===========masonry section========
        if ($('.masonry-section').length) {
            var container = document.querySelector('.masonry-section');
            var msnry = new Masonry(container, {
                itemSelector: '.blog-items'
            });
        }

    });
    
    var parallax = function(id, val) {
        if ($(window).scrollTop() > id.offset().top - $(window).height() && $(window).scrollTop() < id.offset().top + id.outerHeight()) {
            var px = parseInt($(window).scrollTop() - (id.offset().top - $(window).height()));
            px *= -val;
            id.css({
                'background-position': 'left ' + px + 'px'
            });
        }
    };

    $('.features-tabing li').on('click', function() {
        $('.features-tabing li').removeClass('active');
        $(this).addClass('active');

        if ($(window).width() < 768) {
            $(this).children('.tab-content').slideToggle();
            $(this).siblings('li').children('.tab-content').slideUp();
        }

    });

    $('.testimonial-tabbing-list li').on('click', function() {
        if ($(window).width() > 767) {
            $('.testimonial-tabbing-list li').removeClass('active-tab');
            $(this).addClass('active-tab');
        }

    });
    $(".slides-text, .block-meta, .user-blog").each(function() {
        var date = $(".published-date", this).text();
        var result = timeAgo(date);
        $(".published-date", this).text(result);
    });

    function stripStringForURLSafe(str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\`|\&|\#|\[|\]|~|\$|\”|_/g, "-");
        // Tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự -
        str = str.replace(/-+-/g, "-"); // Thay thế 2- thành 1-
        str = str.replace(/^\-+|\-+$/g, "");
        // Cắt bỏ ký tự - ở đầu và cuối chuỗi
        return str;
    }
    
    function base_url() {
        var pathparts = location.pathname.split('/');
        if (location.host == 'localhost') {
            var url = location.origin + '/' + pathparts[1].trim('/') + '/';
        } else {
            var url = location.origin;
        }
        return url;
    }
    
    $(".rating-star-list").hover(function() {
        $(".star-on").hide();
        $(".star-off").show();
    }, function() {
        $(".star-on").show();
        $(".star-off").hide();
    })
    
    function timeAgo(date_str) {
        if (!date_str) {
            return;
        }
        date_str = $.trim(date_str);
        date_str = date_str.replace(/\.\d\d\d+/, ""); // remove the milliseconds
        date_str = date_str.replace(/-/, "/").replace(/-/, "/"); // substitute - with /
        date_str = date_str.replace(/T/, " ").replace(/Z/, " UTC"); // remove T and substitute Z with UTC
        date_str = date_str.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // +08:00 -> +0800
        var parsed_date = new Date(date_str);
        var relative_to = (arguments.length > 1) ? arguments[1] : new Date(); // defines relative to what ..default is now
        var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
        delta = (delta < 2) ? 2 : delta;
        var result = "";
        if (delta < 60) {
            result = delta + " giây trước";
        } else if (delta < 2 * 60) {
            result = "1 phút trước";
        } else if (delta < (1 * 60 * 60)) {
            result = (parseInt(delta / 60, 10)).toString() + " phút trước";
        } else if (delta < (2 * 60 * 60)) {
            result = "1 giờ trước";
        } else if (delta < (1 * 24 * 60 * 60)) {
            result = (parseInt(delta / 3600, 10)).toString() + " giờ trước";
        } else if (delta < (2 * 24 * 60 * 60)) {
            result = "1 ngày trước";
        } else if (delta < (30 * 24 * 60 * 60)) {
            result = (parseInt(delta / 86400, 10)).toString() + " ngày trước";
        } else {
            result = date_str;
        }
        /*else if (delta < (60 * 24 * 60 * 60)) {
            result = "1 tháng trước";
        } else if (delta < (1 * 365 * 24 * 60 * 60)) {
            result = (parseInt(delta / 2592000, 10)).toString() + " tháng trước";
        } else if (delta < (2 * 365 * 24 * 60 * 60)) {
            result = "1 năm trước";
        } else {
            result = (parseInt(delta / 31536000, 10)).toString() + " năm trước";
        }*/
        return " | " + result;
    };

    function initSlider(el, number, aplay, stophv, nav, pag) {
        var small = number;
        var small768 = 1;
        if (number == 1) {
            small = 1;
        } else {
            if (number > 3) {
                small = 3;
            }
            small768 = 2;
        }
        $("#" + el).owlCarousel({
            items: number,
            lazyLoad: true,
            navigation: nav,
            pagination: pag,
            autoPlay: aplay,
            stopOnHover: stophv,
            navigationText: ["<button style='margin-top: -25px;' class='circle-prev arrow-icon'><i class='fa fa-angle-left'></i></button>", "<button style='margin-top: -25px;' class='circle-next arrow-icon'><i class='fa fa-angle-right'></i></button>"],
            itemsDesktop: [1199, number],
            itemsDesktopSmall: [970, small],
            itemsTablet: [768, small768],
            itemsTabletSmall: false,
            itemsMobile: [480, 1],
            itemsCustom: false
        });
    }
})(jQuery);