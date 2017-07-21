/**
 * Created by Administrator on 2017/6/15.
 */
function Category(url){
    this.url=url;

}

$(document).ajaxStart(function(){
    $('.overlay').show();
}).ajaxStop(function(){
    $('.overlay').hide();

})

Category.prototype={
    getTitle:function(){
        var url=this.url;
        $.ajax({
            url:url,
            type:'get',
            success:function(data){
                console.log(data);
                var titleStr=template('titleTmp',data);
                $('#accordion').html(titleStr);
                $('#headingOne .panel-title a').on('click',function(){

                    var that=this;
                    var titleId=$(this).attr('index');
                    $.ajax({
                        url:'http://139.199.192.48:9090/api/getcategory?titleid='+titleId,
                        success:function(data){
                            console.log(data);
                            var bodyStr=template('bodyTmp',data);
                           $(that).parent().parent().parent().find('.panel-collapse>.panel-body').html(bodyStr) ;

                        }
                    })

                })

            }
        })
    },

}



var title=new Category('http://139.199.192.48:9090/api/getcategorytitle');
title.getTitle();

