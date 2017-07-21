(function (window) {
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getsitenav',
        success: function (data) {
            console.log(data);
            var html = template('sitenavTpl', data);
            $('.container .sitenav').html(html);
        }
    });
})(window);