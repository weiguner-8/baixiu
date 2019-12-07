//添加分类操作
$('#addCategory').on('submit', function () {
    var formData = $(this).serialize();//获取用户输入的信息
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload();//请求成功刷新页面
        }
    })
    return false;
})

//开始调用ajax 把用户添加的分类 渲染到表格中
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (data) {
        console.log(
            data
        );
        
        var html = template('Tbs', { data: data })//把用户输入的值添加到Tbs模块中 把请求成功的值data给data
        $('#tbs-ps').html(html)
    }
})

//点击编辑按钮操作
$('#tbs-ps').on('click', '.edit', function () {
    var id = $(this).attr('data-id');//获取点击的这个元素的id
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (data) {
            var html = template('modifyTpl', data)//指定js模块 把用户输入的值加入到模板中
            $('#formBox').html(html)//把html代码添加到左边的表单中
        }
    })
})

//编辑分类并且重新提交操作
$('#formBox').on('submit', '#modifytegory', function () {
    var formData = $(this).serialize();//获取用户的输入的内容
    var id = $(this).attr('data-id')//获取这个表单的自定义属性
    // console.log(formData);
    // console.log(id);
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function (data) {
            location.reload()//成功后刷新页面
        }
    })
    return false;
})

//全选按钮
$('#table-hover-checkbox').on('change', function () {
    $('.Tbs-checkbox').prop('checked', $(this).prop('checked'))
    var check = $(this).prop('checked')
    if (check) {
        $('#deletes').show()
    } else {
        $('#deletes').hide()
    }
})

//单选按钮
$('.table-hover').on('change', '.Tbs-checkbox', function () {
    if ($($('.Tbs-checkbox:checked')).length == $('.Tbs-checkbox').length) {
        $('#table-hover-checkbox').prop('checked', true);
    } else {
        $('#table-hover-checkbox').prop('checked', false);

    }
    var check = $(this).prop('checked')
    if (check) {
        $('#deletes').show()
    } else {
        $('#deletes').hide()
    }
})


//删除按钮操作
$('#tbs-ps').on('click', '.btn-delete', function () {
    if (confirm('您确认要删除吗?')) {
        var id = $(this).attr('data-id')
        // console.log(id);
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function () {
                location.reload()
            }
        })
    }
})
