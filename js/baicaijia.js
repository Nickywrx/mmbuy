// tabs的导航栏的数据渲染
 $(document).ajaxStart(function(){
        $('.overlay').show();
    }).ajaxStop(function(){
        $('.overlay').hide();
        
    })

$.ajax({
    url: 'http://139.199.192.48:9090/api/getbaicaijiatitle',
    type: 'get',
    dataType: 'jsonp',
    success: function (data) {
        document.querySelector('.bcj-title .tabs').innerHTML = template('tabsTpl', data);
        $('.bcj-title .tabs li:first-child').addClass('active');

        var outerBox = $('.bcj-title .ul-wapper'),
            ul = $('.bcj-title .tabs'),
            lis = ul.children('li');
        var tabsWidth = 40;
        for (var i = 0; i < lis.length; i++) {
            tabsWidth += $(lis[i]).width();
        }
        
        ul.css('width', tabsWidth);
        $('.bigTitle').html('白菜价-淘宝内部券');


        // 点击位移并变色
        topClick();

        // 导航栏触摸移动切换导航


    }


})

// 渲染list页面
$.ajax({
    url: 'http://139.199.192.48:9090/api/getbaicaijiaproduct',
    data: {
        titleid: 0
    },
    datatype: 'json',
    success: function (data) {
        var html = template('listTpl', data);
        document.querySelector('.bcj-list-ul').innerHTML = html;
    }
})



function topClick() {
    var currentX = 0;
    var outerBox = $('.bcj-title .ul-wapper'),
        ul = $('.bcj-title .tabs'),
        lis = ul.children('li');
    // ------0.临界值------------------------------
    //记录ul当前的位移
    var maxLeft = 0,
        minLeft = outerBox[0].offsetWidth - ul[0].offsetWidth,
        maxSwipe = maxLeft + 50,
        minSwipe = minLeft - 50 ;

    // ----------封装复用代码---------------------
    //添加过渡
    var addTransition = function () {
        ul[0].style.webkitTransition = 'transform 0.2s';
        ul[0].style.transition = 'transform 0.2s';
    }
    //删除过渡
    var removeTransition = function () {
        ul[0].style.webkitTransition = 'none';
        ul[0].style.transition = 'none';
    }
    //ul位移
    var setTranslateX = function (translateX) {
        ul[0].style.webkitTransform = 'translateX(' + translateX + 'px)';
        ul[0].style.transform = 'translateX(' + translateX + 'px)';
    }


    $(".bcj-title .tabs").on('click', function (e) {

        var titleId = e.target.parentNode.getAttribute('data-id');
        var targetLi = $(e.target.parentNode);
        var text = e.target.innerHTML;
        $('.bigTitle').html(text+'-白菜价');
        if(titleId==0){
            $('.bigTitle').html('白菜价-淘宝内部券');
        }

        // 给被点击的事件添加样式
        targetLi.addClass('active').siblings().removeClass('active');

        // 点击导航滑动到最左边
        // 左侧导航位移的距离
        var x = 0;
        for (var i = 0; i < titleId; i++) {
            x -= $(lis[i]).width();
        }
        // 判断临界值
        if (x > maxLeft) {
            x = maxLeft;
        }
        if (x < minLeft) {
            x = minLeft;
        }
        addTransition();

        setTranslateX(x);
        currentX = x;


        // list商品列表的数据渲染
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getbaicaijiaproduct',
            data: {
                titleid: titleId
            },
            datatype: 'json',
            success: function (data) {
                var html = template('listTpl', data);
                document.querySelector('.bcj-list-ul').innerHTML = html;
            }
        })
    })

    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    outerBox[0].addEventListener('touchstart', function (e) {
        // 记录起始位置
        startX = e.targetTouches[0].clientX;
    })
    outerBox[0].addEventListener('touchmove', function (e) {
        // 记录起始位置
        moveX = e.targetTouches[0].clientX;
        distanceX = moveX - startX;
        // 让ul跟随鼠标一起移动，
        x = distanceX + currentX;
        // 边界检测,随着手指滑动可以滑动到的最远值
        if (x > maxSwipe) {
            x = maxSwipe;
        }
        if (x < minSwipe) {
            x = minSwipe;
        }                                                                               

        removeTransition();
        setTranslateX(x);
    })
    outerBox[0].addEventListener('touchend', function (e) {
        // 滑动结束要记录当前ul位移
        currentX = currentX + distanceX;
        // 当超过临界值时让其反弹回来
        if (currentX > maxLeft) {
            currentX = maxLeft;
            addTransition();
            setTranslateX(currentX);
        }
        if (currentX < minLeft) {
            currentX = minLeft;
            addTransition();
            setTranslateX(currentX);
        }
        // 数据重置
        startX = 0;
        moveX = 0;
        distanceX = 0;
    })

}

