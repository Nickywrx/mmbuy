
/**
 * Created by Administrator on 2017/6/15.
 */

/*var str=window.location.search
    str=str.substring(1)
    console.log(str);
console.log(window.location.href);
var page=str.substring(str.length-1);
console.log(page);*/

$(document).ajaxStart(function(){
    $('.overlay').show();
    console.log(123);
}).ajaxStop(function(){
    $('.overlay').hide();

})

function render(){
    var searchStr=window.location.search,
        searchStr=searchStr.substring(1),
        searchArr=searchStr.split('&pageid=');
        $.removeCookie('listInfo');
        $.cookie('listInfo',(searchArr[0]+'|'+searchArr[1]));
        console.log(searchArr[0]);
        console.log(searchArr[1]);

    $.ajax({
        url:'http://139.199.192.48:9090/api/getcategorybyid?categoryid='+searchArr[0],
        success:function(data){
            console.log(data);
            var crumbStr=template('crumbTmp',data);
            $('.crumb p').append(crumbStr);
        }
    })

    $.ajax({
        url:'http://139.199.192.48:9090/api/getproductlist',
        data:{
                categoryid:searchArr[0],
                pageid:searchArr[1]
        },
        success:function(data){
            console.log(data);
            console.log(data.pagesize);
            console.log(data.totalCount);
            var size=Math.ceil(data.totalCount/data.pagesize);
            $('.pageCount .total').text(size);
            $('.changePage .now').text(searchArr[1]);
            var listStr=template('listTmp',data);
            $('.productList-content').html(listStr);

            var countStr=template('countTmp',{
                size:size,
                now:searchArr[1]
            });
            $('.pageCount').append(countStr);
            /*下一页*/
            $('.next').click(function(){
                if(searchArr[1]>=size){
                    alert('已经是最后一页了');
                    return;
                }else{
                    searchArr[1]++;
                }
                changeHref();

            })
            /*上一页*/
            $('.prev').click(function(){
                if(searchArr[1]<=1){
                    alert('已经是最后一页了');
                    return;
                }else{
                    searchArr[1]--;
                }
            changeHref();
            })

           /* for (var i = 1; i <= size; i++) {
                var tpl = template('page_number', {
                    page: i + '/' + size,
                    num: i
                });
                $("#selectPage").append(tpl);
            }*/

            function changeHref(){
                var str=window.location.href;
                var str2=str.substring(0,str.length-1),
                    newHref=str2+searchArr[1];
                window.location.href=newHref;
            }
        }
    })
}




render();