/**
 * Created by Administrator on 2017/6/14.
 */

$(document).ajaxStart(function(){
    $('.overlay').show();
}).ajaxStop(function(){
    $('.overlay').hide();

})

/*首页发送ajax*/
function mmBuyIndex(url){
    this.url=url;

}
mmBuyIndex.prototype={
    getMenu:function(){
        var url=this.url;
        $.ajax({
            url:url,
            type:'get',
            success:function(data){
                console.log(data);
                var navStr=template('navTmp',data);
                $('.navList').html(navStr);
            }
        })
    },
    getMoneyCtrl:function(){
        var url=this.url;
        $.ajax({
            url:url,
            type:'get',
            success:function(data){
                console.log(data);
                var nrecommendStr=template('recommendTmp',data);
                $('.recommend-content').html(nrecommendStr);
            }
        })
    }
}

    /*获取导航栏*/
    var mm1=new mmBuyIndex('http://139.199.192.48:9090/api/getindexmenu');
        mm1.getMenu();
    /*获取商品列表*/
    var mm2=new mmBuyIndex('http://139.199.192.48:9090/api/getmoneyctrl');
        mm2.getMoneyCtrl();


/*点击更多来显示剩余的导航栏数据*/
    $(function(){
        /*获取到更多那儿*/
        var li7=$('.navList li :eq(7)');
        $('.navList').on('click',li7,function(){
           $('.navList li :gt(7)').slideToggle(200);
        })
    })

/*回到顶部*/
document.getElementById('goBack').onclick = function(){
    console.log(122);
    document.documentElement.scrollTop = document.body.scrollTop =0;
}