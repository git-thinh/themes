function getURLVar(key) {
    var value = [];

    var query = String(document.location).split('?');

    if (query[1]) {
        var part = query[1].split('&');

        for (i = 0; i < part.length; i++) {
            var data = part[i].split('=');

            if (data[0] && data[1]) {
                value[data[0]] = data[1];
            }
        }

        if (value[key]) {
            return value[key];
        } else {
            return '';
        }
    }
}

// Cart add remove functions
var cart = {
    'add': function(product_id, quantity) {
        var valid = validateSerialize();
        if (!valid) {
            jQuery('#add-to-cart button[type="submit"]').trigger('click');
            return false;
        }
        if (jQuery('#add-to-cart button[type="submit"]').attr('data-status') == "disabled") {
            return false;
        }
        $.ajax({
            url: 'index.php?route=checkout/my_orders/addCart',
            type: 'post',
            data: $('#add-to-cart').serialize(),
            dataType: 'json',
            beforeSend: function() {
                $('#cart > button').button('loading');
            },
            complete: function() {
                $('#cart > button').button('reset');
            },
            success: function(json) {
                if (json['success']) {
                    $('#content').parent().before('<div class="alert alert-success alert-dismissible"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

                    $('html, body').animate({ scrollTop: 0 }, 'slow');

                    $('.amount .quantity span').html(json['total_product_cart']);

                    $('.amount .total').html(json['total_into_money']);

                    $('#add_cart_notify').modal('show');
                    
                    // insert number total to count cart when add cart
                    $('.count_item.count_item_pr').text(json['total_product_cart']);
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'update': function(key, quantity) {
        $.ajax({
            url: 'index.php?route=checkout/cart/edit',
            type: 'post',
            data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
            dataType: 'json',
            beforeSend: function() {
                $('#cart > button').button('loading');
            },
            complete: function() {
                $('#cart > button').button('reset');
            },
            success: function(json) {
                // Need to set timeout otherwise it wont update the total
                setTimeout(function () {
                    $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
                }, 100);

                if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
                    location = 'index.php?route=checkout/cart';
                } else {
                    $('#cart > ul').load('index.php?route=common/cart/info ul li');
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'remove': function(key) {
        $.ajax({
            url: 'index.php?route=checkout/cart/remove',
            type: 'post',
            data: 'key=' + key,
            dataType: 'json',
            beforeSend: function() {
                $('#cart > button').button('loading');
            },
            complete: function() {
                $('#cart > button').button('reset');
            },
            success: function(json) {
                // Need to set timeout otherwise it wont update the total
                setTimeout(function () {
                    $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
                }, 100);

                if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
                    location = 'index.php?route=checkout/cart';
                } else {
                    $('#cart > ul').load('index.php?route=common/cart/info ul li');
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    }
}

var voucher = {
    'add': function() {

    },
    'remove': function(key) {
        $.ajax({
            url: 'index.php?route=checkout/cart/remove',
            type: 'post',
            data: 'key=' + key,
            dataType: 'json',
            beforeSend: function() {
                $('#cart > button').button('loading');
            },
            complete: function() {
                $('#cart > button').button('reset');
            },
            success: function(json) {
                // Need to set timeout otherwise it wont update the total
                setTimeout(function () {
                    $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
                }, 100);

                if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
                    location = 'index.php?route=checkout/cart';
                } else {
                    $('#cart > ul').load('index.php?route=common/cart/info ul li');
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    }
}

var wishlist = {
    'add': function(product_id) {
        $.ajax({
            url: 'index.php?route=account/wishlist/add',
            type: 'post',
            data: 'product_id=' + product_id,
            dataType: 'json',
            success: function(json) {
                $('.alert-dismissible').remove();

                if (json['redirect']) {
                    location = json['redirect'];
                }

                if (json['success']) {
                    $('#content').parent().before('<div class="alert alert-success alert-dismissible"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                }

                $('#wishlist-total span').html(json['total']);
                $('#wishlist-total').attr('title', json['total']);

                $('html, body').animate({ scrollTop: 0 }, 'slow');
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'remove': function() {

    }
}

var compare = {
    'add': function(product_id) {
        $.ajax({
            url: 'index.php?route=product/compare/add',
            type: 'post',
            data: 'product_id=' + product_id,
            dataType: 'json',
            success: function(json) {
                $('.alert-dismissible').remove();

                if (json['success']) {
                    $('#content').parent().before('<div class="alert alert-success alert-dismissible"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

                    $('#compare-total').html(json['total']);

                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'remove': function() {

    }
}

/* Agree to Terms */
$(document).delegate('.agree', 'click', function(e) {
    e.preventDefault();

    $('#modal-agree').remove();

    var element = this;

    $.ajax({
        url: $(element).attr('href'),
        type: 'get',
        dataType: 'html',
        success: function(data) {
            html  = '<div id="modal-agree" class="modal">';
            html += '  <div class="modal-dialog">';
            html += '    <div class="modal-content">';
            html += '      <div class="modal-header">';
            html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
            html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
            html += '      </div>';
            html += '      <div class="modal-body">' + data + '</div>';
            html += '    </div>';
            html += '  </div>';
            html += '</div>';

            $('body').append(html);

            $('#modal-agree').modal('show');
        }
    });
});
/// update product detail when choose version
$(document).ready(function () {
    if (jQuery('#add-to-cart .attr-item').length) {
        ajaxChangeVersion();
    }
    jQuery('#add-to-cart .attr-item input').on('click', function () {
        ajaxChangeVersion();
    });
});

function ajaxChangeVersion() {
    $.ajax({
        url: 'index.php?route=product/product/updateCartWhenChangeVersion',
        type: 'post',
        data: $('#add-to-cart').serialize(),
        dataType: 'json',
        beforeSend: function() {
            //TODO loading
        },
        complete: function() {
            //TODO loaded
        },
        success: function(json) {
            if (json['success']) {
                updateHtmlVersion(json['sale_on_out_of_stock'], json['product_version']);
                console.log(json['product_version']);
            } else {
                jQuery('#add-to-cart button').attr('data-status', 'disabled');
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
             alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}

function updateHtmlVersion(sale_on_out_of_stock, product) {
    //update price
    if (product['price'] == 0) {
        jQuery('.show_contact').removeClass('button_off');
        jQuery('.price-box.main-font > a').attr('data-target','#modal-buys');
        if(product['compare_price_format'] == '0 VND'){
            product['compare_price_format'] = 'Liên hệ';
          jQuery('.show_contact').addClass('button_off'); 
          jQuery('.price-box.main-font > a').attr('data-target','#modal-buy');
        }
        jQuery('.product-detail .price span').html(product['compare_price_format']);
        jQuery('.product-detail .price del').html('');
        jQuery('.product-teaser-fix .second-color').html(product['version'] + ' - ' + product['compare_price_format']);
        jQuery('.price-box .second-color').html(product['compare_price_format']);
        
    } else {
        jQuery('.product-detail .price span').html(product['price_format']);
        jQuery('.product-detail .price del').html(product['compare_price_format']);
        jQuery('.product-teaser-fix .second-color').html(product['version'] + ' - ' + product['price_format']);
        
    }
    //active button add cart
    if (product['status'] == 1 && (sale_on_out_of_stock == 1 || (sale_on_out_of_stock == 0 && product['quantity'] > 0))) {
        jQuery('#add-to-cart button').removeAttr('data-status');
        jQuery('.product-teaser-fix button').removeAttr('data-status');
        jQuery('.block-status span').html('Còn hàng');
        jQuery('#add-to-cart button[type="button"]').addClass("second-color-hover");
         jQuery('.show_contact').removeClass('button_outstock');
    } else {
        jQuery('#add-to-cart button').attr('data-status', 'disabled');
        jQuery('.product-teaser-fix button').attr('data-status', 'disabled');
        jQuery('.block-status span').html('Hết hàng');
        jQuery('#add-to-cart button').removeClass("second-color-hover");
        jQuery('.show_contact').addClass('button_outstock');
    }
}

function validateSerialize() {
    var invalidFields = jQuery('#add-to-cart').find( ":invalid" );
    if (invalidFields.length > 0) return false;
    return true;
}