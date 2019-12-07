//添加用户提交操作
$('#userForm').on('submit', function () {
    //获取用户输入的内容格式化成参数字符串
    var formData = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,//email=wqeqwe%40qq.com&nickName=1231&password=13123&status=0&role=admin
        success: function () {
            location.reload()
        },
        error: function () {
            alert('用户添加失败')
        }
    })
    //组织表单的默认提交行为
    return false;
})

$('#avatar').on('change', function () {
    var formData = new FormData();
    formData.append('ps', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,//不要解析请求参数
        contentType: false,
        success: function (data) {
            console.log(data[0]);
            //[{ps:''},{}]
            $('#preview').attr('src', data[0].ps);
            $('#hiddenavatar').val(data[0].ps)
        }
    })
})

//渲染到表单操作
$.ajax({
    type: 'get',
    url: '/users',
    success: function (data) {
        //指定模板usersTpl 把data值加入循环
        var html = template('usersTpl', { ins: data });
        $('#tpl').html(html)
        // console.log(html);
    }
});

//编辑用户
$('#tpl').on('click', '.edit', function () {
    //获取点击编辑的这个对象的自定义id值
    var id = $(this).attr('data-id')
    // console.log(id);
    $.ajax({
        type: 'get',
        url: '/users/' + id,//c传递id参数
        success: function (data) {
            var html = template('moidfyTpl', data)//给编辑模板传递参数 data这个对象{a:'eqw',b:'wwqeqw'}
            $('#Tpls').html(html)
        }
    })
})
$

$('#checks').on('change', function () {
    $('.checkss').prop('checked', $(this).prop('checked'))
    var check = $(this).prop('checked')
    if (check) {
        $('#deletes').show()
    } else {
        $('#deletes').hide()
    }
})

$('#tpl').on('change', '.checkss', function () {
    if ($('.checkss:checked').length == $('.checkss').length) {
        $('#checks').prop('checked', true)
    } else {
        $('#checks').prop('checked', false)
    }
    var check = $(this).prop('checked')
    if (check) {
        $('#deletes').show()
    } else {
        $('#deletes').hide()
    }
    // alert(1111)
})

//删除操作
$('#tpl').on('click', '.btn-deletes', function () {
    if (confirm('确认删除?')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                location.reload()
            }
        })
    }
})