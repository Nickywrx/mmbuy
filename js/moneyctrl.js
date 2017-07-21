(function () {
    //点击商品跳转到商品详情页
    // $('mc-list a').click(function(){
    //     $.ajax({
    //         url:'http://139.199.192.48:9090/api/getmoneyctrlproduct?productid=',
    //         success:function(data){
    //             console.log(data);
    //         }
    //     });
    // })

    $(document).ajaxStart(function(){
        $('.overlay').show();
    }).ajaxStop(function(){
        $('.overlay').hide();
        
    })

    getCargo(getPages, 1);

    // 记录当前页数的变量
    var pageNum = 1;

    function getCargo(fn, page) {
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getmoneyctrl',
            data: {
                pageid: page
            },
            success: function (data) {
                // var html = template('haitaoDiscount', data);
                // $('.htd-list').html(html);
                console.log(data);
                data.result.pageid = page || 1;
                data.result.forEach(function (nav) {
                    nav.pageid = page;
                })
                $('.mc-list').html(template('moneyCtrl', data));
                fn && fn(data);
            }
        })
        
    }

    // 生成页数数据
    function getPages(data) {
        for (var i = 1; i <= Math.ceil(data.totalCount / 10); i++) {
            var tpl = template('page_number', {
                page: i + '/' + Math.ceil(data.totalCount / 10),
                num: i
            });
             $("#selectPage").append(tpl);
        }
    }

    pageSelected();

    // 注册上下翻页事件
    $('.mc-page .box1').on('click', function () {
        // pageNum > 1 ? --pageNum : pageNum = 1;
        if(pageNum<=1){
            // console.log(this);
            $(this).addClass('disabled');
        }else {
            $(this).removeClass('disabled');
        }
        if($(this).hasClass('disabled')){
            return false;
        }
        pageNum--;
        console.log(pageNum);
        $("#selectPage").val(pageNum);
        getCargo(undefined, pageNum);
        toTop();
    })

    $('.mc-page .box3').on('click', function () {
        // pageNum < $("#selectPage option").last().val() ? ++pageNum : pageNum = $("#selectPage option").last().val();
        if(pageNum>=15){
            // console.log(this);
            $(this).addClass('disabled');
        }else {
            $(this).removeClass('disabled');
        }
        if($(this).hasClass('disabled')){
            return false;
        }
        pageNum++;
        console.log(pageNum);
        $("#selectPage").val(pageNum);
        getCargo(undefined, pageNum);
        toTop();
    })


    // 下拉框选页
    function pageSelected() {
        $("#selectPage").on('click', function () {
            // 获取当前页数
            console.log($("#selectPage").val());
            if (pageNum != $("#selectPage").val()) {
                pageNum = $("#selectPage").val();
                getCargo(undefined, pageNum);
                toTop();
            }
        })
    }

    /*回到顶部*/
    function toTop() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }


})();