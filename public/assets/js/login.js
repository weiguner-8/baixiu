$('#logonBtn').click(function () {
    var email = $('#email').val();
    var password = $('#password').val();
    if (email.trim().length == 0) {
      alert('请输入邮箱')
      return;
    }
    if (password.trim().length == 0) {
      alert('请输入密码')
      return;
    }
    $.ajax({
      type: 'post',
      url: '/login',
      data: { email, password },
      success: function (data) {
        location.href = "/admin/"
      },
      error: function () {
        alert('用户名或密码错误')
      }
    })
  })