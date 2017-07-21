(function (window, $, template) {

    function setInit() {
        // 获取地址的 queryString（例：?id=1），并截取字符串取得 1
        var searchQuery = window.location.search,
            brandtitleid = searchQuery.slice(4);

        // 创建一个获取编号的模板方法
        template.helper('getIndex', getIndex);
        function getIndex(brand, brandTitle) {
            return brand - brandTitle * 10 + 1;
        }

        return function () {
            // 若地址有 queryString，访问十大品牌页面；若无 queryString，则访问品牌大全页面
            if (brandtitleid != '') {
                // 从 localStorage 获取数据用来更新分类标题内容
                var brandTitleStr = localStorage.getItem('brandTitle' + brandtitleid),
                    strIndex = brandTitleStr.indexOf('十');
                brandTitleStr = brandTitleStr.slice(0, strIndex);

                // 十大品牌 ajax 请求
                $.ajax({
                    url: 'http://139.199.192.48:9090/api/getbrand',
                    data: { brandtitleid: brandtitleid },
                    success: function (data) {
                        // 渲染模板
                        var html = template('topTenTpl', data);
                        $('.container .topTen').html(html);

                        // 编号 1、2、3 设置特殊颜色
                        $('.brandItems em')[0].setAttribute('style', 'background-color: red');
                        $('.brandItems em')[1].setAttribute('style', 'background-color: #ff9314');
                        $('.brandItems em')[2].setAttribute('style', 'background-color: #aadf5b');

                        // 更新面包屑和分类标题
                        $('.crumb span').html(brandTitleStr + '哪个牌子好');
                        $('.brand_title').html(brandTitleStr + '哪个牌子好');
                    }
                });

                // 销售排行 ajax 请求、最新评论 ajax 请求
                $.ajax({
                    url: 'http://139.199.192.48:9090/api/getbrandproductlist',
                    data: {
                        brandtitleid: brandtitleid,
                        pageSize: 4
                    },
                    success: function (data) {
                        // 渲染模板
                        var html = template('sellRankTpl', data);
                        $('.container .sellRank').html(html);

                        // 更新分类标题
                        $('.sellRank .brand_title').html(brandTitleStr + '产品销售排行');

                        // 为 sellRank 的 a 标签 添加 自定义属性 data-productId，用来请求评论数据 
                        data.result.forEach(function (ele, index) {
                            $('.sellRank a')[index].setAttribute('data-productId', ele.productId);
                        });

                        // 最新评论 ajax 请求
                        $('.sellRank a').click(function () {
                            var productId = this.getAttribute('data-productId');
                            $.ajax({
                                url: 'http://139.199.192.48:9090/api/getproductcom',
                                data: { productid: productId },
                                success: function (data) {
                                    // 渲染模板
                                    var html = template('commentTpl', data);
                                    $('.comment').html(html);

                                    // 跟新分类标题
                                    $('.comment .brand_title').html(brandTitleStr + '最新评论');
                                }
                            });
                        });
                    }
                });
            } else {
                // 产品大全 ajax 请求
                $.ajax({
                    url: 'http://139.199.192.48:9090/api/getbrandtitle',
                    success: function (data) {
                        // 渲染模板
                        var html = template('brandTitleTpl', data);
                        $('.container').html(html);

                        // 将产品大全页面的相关数据存储到 localStorage， 在十大品牌页面中的用于更新分类标题内容
                        data.result.forEach(function (ele, index) {
                            localStorage.setItem('brandTitle' + index, ele.brandTitle);
                        });
                    }
                });
            }
        };
    }

    setInit()();

})(window, jQuery, template);