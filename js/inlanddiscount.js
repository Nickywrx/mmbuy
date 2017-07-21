(function(){
     $.ajax({
        url:'http://139.199.192.48:9090/api/getinlanddiscount',
        success:function(data){
            console.log(data);
            var html = template('inlandDiscount',data);
            $('.idm-list ul').html(html);
        }
    })
})()