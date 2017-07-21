/**
 * Created by Administrator on 2017/6/16.
 */

'use strict';
$(function (){
    setCoupon($('.coupon-title'))
    function setCoupon(dom,callback){
        $.ajax({url:"http://139.199.192.48:9090/api/getcoupon",success:function (data) {
            var html = template('couponTitle',data);
            dom.html(html);
        }})
    }
});



// 'use strict';
// $(function (){
//     setCoupon($('.coupon-title'))
//     function setCoupon(dom,callback){
//         $.ajax({url:"http://139.199.192.48:9090/api/getcoupon",success:function (data) {
//             var html = template('couponTitle',data);
//             dom.html(html);
//         }})
//     }
// });