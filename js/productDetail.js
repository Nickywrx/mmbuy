/**
 * Created by Administrator on 2017/6/15.
 */

var url=window.location.search.substring(1);
console.log(url);

/*详细信息*/

$.ajax({
    url:'http://139.199.192.48:9090/api/getproduct?productid='+url,
    success:function(data){
        var detailTmp=template('detailTmp',data);
        $('.detailHead').html(detailTmp);
    }
})


/*评论*/
$.ajax({
    url:'http://139.199.192.48:9090/api/getproductcom?productid='+url,
    success:function(data){
        var listTmp=template('listTmp',data);
        console.log(data);
        $('.detailplist').html(listTmp);
    }
})




var info=$.cookie('listInfo');
console.log(info.split('|'));
    info=info.split('|');
$('.back').attr('href','productList.html?'+info[0]+'&pageid='+info[1]+'');

$.ajax({
    url:'http://139.199.192.48:9090/api/getcategorybyid?categoryid='+info[0],
    success:function(data){
        console.log(data);
        $('.crumb .back').text(data.result[0].category);
    }
})