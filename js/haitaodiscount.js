(function () {

    getCargo(getPages, 1);

    function getCargo(fn, page) {
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getmoneyctrl',
            data: {
                pageid: 1
            },
            success: function (data) {
                // var html = template('haitaoDiscount', data);
                // $('.htd-list').html(html);
                data.result.pageid = page || 1;
                data.result.forEach(function (nav) {
                    nav.pageid = page;
                })
                $('.htd-list').html(template('haitaoDiscount', data));
                console.log(data);
            }
        })
    }

    // 生成页数数据
    function getPages(data){
        for(var i=1;i<= data.totalCount; i++){
            var 
        }
    }




})();