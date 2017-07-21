
'use strict';

$(document).ajaxStart(function(){
    $('.overlay').show();
    console.log(123);
}).ajaxStop(function(){
    $('.overlay').hide();

})

$(function() {
    setCouponList($('.coupon-list'), $.getUrlParam('couponid'))

    function setCouponList(dom, couponid, callback) {
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getcouponproduct',
            data: { 'couponid': couponid },
            success: function(data) {
                var html = template('couponList', data);
                dom.html(html);

                
        //              console.log($(".cover"))
        //     $('.cover').eq(0).on('click',function(){
        //     $(this).remove();
        //     console.log('324');
        // });
            }
        })
    }
});
