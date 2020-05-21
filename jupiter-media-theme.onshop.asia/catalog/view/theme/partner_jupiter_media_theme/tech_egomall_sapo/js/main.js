$(document).ready(function() {

    var topHeaderHeight = $('.block-header .header-top').height();
    $(document).scroll(function(e){
        if( $('.block-header').length === 0 ) return;
        var windowScrollTop = (window.pageYOffset || document.scrollTop)  - (document.clientTop || 0) || 0;
        if(windowScrollTop >= topHeaderHeight && !$('.block-header').hasClass('fixed')){
            $('.block-header').addClass('fixed');
        }
        else if(windowScrollTop <= topHeaderHeight && $('.block-header').hasClass('fixed')){
            $('.block-header').removeClass('fixed');
        }

        if( $('.product-teaser-fix').length == 0 ) return;
        if ($('.block-header').hasClass('fixed') && windowScrollTop >= topHeaderHeight + 300) {
            $('.product-teaser-fix').slideDown(300);
            //set top product-teaser-fix
            var header_fixed_height = jQuery('.block-header .fix-content').height();
            $('.product-teaser-fix').addClass('fixed');
        } else {
            $('.product-teaser-fix').slideUp(300);
        }
    })

    function owlInit(element, numItem,numMobile= 2, nav = true, dots = false)
    {
        if(element.length) {
            element.owlCarousel({
                loop:false,
                responsiveClass:true,
                dots: dots,
                nav:nav,
                navText: ['', ''],
                URLhashListener:true,
                startPosition: 'URLHash',
                responsive:{
                    0:{
                        items:numMobile,
                    },
                    600:{
                        items:numMobile,
                    },
                    1000:{
                        items:numItem,
                    }
                }
            });
        }
    }

    if ($('.block-banner .owl-home-banner').length) {
        $('.block-banner .owl-home-banner').owlCarousel({
            loop:true,
            responsiveClass:true,
            autoplay: true,
            autoplayTimeout: $('.block-banner .owl-home-banner').attr('data-time'),
            dots: true,
            nav:true,
            navText: ['<i class="icon icon-chevron-left"></i>', '<i class="icon icon-chevron-right"></i>'],
            URLhashListener:true,
            startPosition: 'URLHash',
            responsive:{
                0:{
                    items:1,
                },
                600:{
                    items:Math.round(1/2),
                },
                1000:{
                    items:1,
                }
            }
        });
    };

    owlInit($('.block-saleoff-product .owl-product'), jQuery('.block-saleoff-product .owl-product').attr('data-limit-inline'), jQuery('.block-saleoff-product .owl-product').attr('data-limit-mobile') );
    owlInit($('.block-top-sale-product .owl-product'), jQuery('.block-top-sale-product .owl-product').attr('data-limit-inline'), jQuery('.block-top-sale-product .owl-product').attr('data-limit-mobile'));
    owlInit($('.block-new-product .owl-product'), jQuery('.block-new-product .owl-product').attr('data-limit-inline'), jQuery('.block-new-product .owl-product').attr('data-limit-mobile'));
    owlInit($('.block-blogs .owl-product'), 1, 1);
    owlInit($('.block-partner .owl-partner'), jQuery('.block-partner .owl-partner').attr('data-limit-inline'), jQuery('.block-partner .owl-partner').attr('data-limit-mobile'));

    // Product filter form
    if( $( ".box-product-filter#product-price #slider-range" ).length){
        var slider = $( ".box-product-filter#product-price #slider-range" ).slider({
            range: true,
            min: 0,
            step: 1,
            max: 5000000,
            values: [ 200000, 4000000 ],
            slide: function( event, ui ) {
                $( "#amount" ).text( "Từ " + ui.values[0].toLocaleString('vi-VN') + "đ - " + ui.values[1].toLocaleString('vi-VN') + "đ" );
            }
        });
        $( "#amount" ).text( "Từ " + slider.slider( "values", 0 ).toLocaleString('vi-VN') + "đ - " + slider.slider( "values", 1 ).toLocaleString('vi-VN') + "đ" );
        $('.box-product-filter#product-price .dropdown-menu').on('click', function (e) {
            e.stopPropagation();
        });
    }
    ///////////////////////////////////////

    // Product detail
    owlInit($('.product-detail .owl-product-detail'), 1);
    // owl-thumb
    $('.product-detail .owl-product-thumb').owlCarousel({
        loop:false,
        responsiveClass:true,
        dots: false,
        nav:true,
        navText: ['<i class="icon icon-chevron-left"></i>', '<i class="icon icon-chevron-right"></i>'],
        URLhashListener:true,
        startPosition: 'URLHash',
        responsive:{
            480: {
                items: 3,
            },
            600:{
                items:3,
            },
            1000:{
                items:4,
            }
        }
    });
    owlInit($('.block-relate-product .owl-product'), jQuery('.block-relate-product .owl-product').attr('data-number-item'));
    //////////////////////////////////////////////

    // Ô nhập số lượng
    $(document).on('click', '.quantity-group-input>button', function(e) {
        var val = parseInt($(this).parent().find('>input').val());
        var min = parseInt($(this).parent().find('>input').attr('min'));
        if (isNaN(val)) val = 0;
        if (isNaN(min)) min = 0;
        if( val > min && $(this).hasClass('decrease') ){
            val--;
        }
        if( $(this).hasClass('increase') ){
            val++;
        }
        $(this).parent().find('>input').val(val).change();
        e.preventDefault();
    })

    // Show password
    $(document).on('click', '.input-password-group button.show-password', function(e) {
        var input = $(this).parent().find('>input');
        $(this).toggleClass('active');
        if ($(this).hasClass('active')){
            $(this).find('i').removeClass('icon-eye').addClass('icon-no-eye');
            input.attr('type', 'text');
        } else {
            $(this).find('i').removeClass('icon-no-eye').addClass('icon-eye');
            input.attr('type', 'password');
        }
    });

    // Menu responsive
    $('.block-header .block-header-menu ul.nav li.has-child a>.toggle').on('click', function(e){
        $(this).closest('li').toggleClass('active')
        e.preventDefault();
        return false;
    });

    jQuery('.quantity').each(function () {
        var spinner = jQuery(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find('.quantity-up'),
            btnDown = spinner.find('.quantity-down'),
            min = input.attr('min'),
            max = input.attr('max');

        btnUp.click(function () {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.click(function () {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

    });

});