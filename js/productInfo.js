
var str=window.location.search.split('=');
console.log(str);
(function(){
     $.ajax({
        url:'http://139.199.192.48:9090/api/getmoneyctrlproduct?productid='+str[1],
        success:function(data){
            console.log(data);
            console.log(data.productComment);
            var html = template('productInfo',data);
            $('.detail').html(html);
        }
    })
})()