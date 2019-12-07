
$('#resterForm').on('submit', function (e) {

    var obj = $(this).serialize()
    $.ajax({
        type: 'put',
        url: '/users/password',
        data:obj,
        success: function () {
            alert('密码修改成功请重新登录')
            location.href="/admin/login.html"
        }
    })
    return false;
})  