/*jshint
 strict:true,
 noempty:true,
 noarg:true,
 eqeqeq:true,
 browser:true,
 bitwise:true,
 curly:true,
 undef:true,
 nonew:true,
 forin:true */

/*global $, App, moment, jQuery, bootbox, _ */

var roleEdit = function () {
  'use strict';

  // 全局属性参数
  var configMap = {
    path: '',
    dataUrl: '/roles/role',
    id: ''
  };

  // 全局Dom
  var jqueryMap = {
    $roleForm: null
  };

  var setJqueryMap = function () {
    jqueryMap.$roleForm = $('#role-manager-formdata');
  };

  var saveRole = function (callback) {
    var blockTarget = jqueryMap.$roleForm.closest(".modal-body");
    App.blockUI({
      target: blockTarget,
      boxed: true,
      message: '正在保存数据...'
    });
    var interest = [];
    var selectedInterests = $('input[name="interest"]:checked');
    _(selectedInterests).forEach(function (value) {
      interest.push(value.value);
    });

    var data = {
      name: jqueryMap.$roleForm.find('input[name="roleName"]').val(),
      remark: jqueryMap.$roleForm.find('textarea[name="roleRemark"]').val()
    };

    var url = configMap.path + configMap.dataUrl;
    var requestType = 'POST';
    if (configMap.id) {
      url = url + "/" + configMap.id;
      requestType = 'PUT';
    }

    $.ajax({
      url: url,
      type: requestType,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      success: function (result) {
        App.unblockUI(blockTarget);
        if (result.success) {
          callback(true);
        }
        else {
          App.alert({
            container: jqueryMap.$userForm.closest(".modal-body"),
            place: 'prepend',
            type: 'danger',
            message: result.message,
            icon: 'fa fa-warning'
          });
          callback(false);
        }
      },
      error: function () {
        App.unblockUI(blockTarget);
        App.alert({
          container: jqueryMap.$roleForm.closest(".modal-body"),
          place: 'prepend',
          type: 'danger',
          message: '保存失败！',
          icon: 'fa fa-warning'
        });
        callback(false);
      }
    });
  };

  var getRole = function (id) {
    $.ajax({
      url: configMap.path + configMap.dataUrl + '/' + id,
      dataType: 'JSON',
      type: 'GET',
      success: function (data) {
        jqueryMap.$roleForm.find('[name="roleName"]').val(data.name);
        jqueryMap.$roleForm.find('[name="roleRemark"]').val(data.remark);
      },
      error: function () {
        bootbox.alert('获取角色信息失败！');
      }
    });
  };

  var roleValidation = function () {
    jqueryMap.$roleForm.validate({
      errorElement: 'span',
      errorClass: 'help-block help-block-error',
      focusInvalid: false,
      ignore: "",
      rules: { // rules 中的属性name、code、sex等为Input的name属性值
        roleName: {
          minlength: 2,
          required: true
        }
      },
      errorPlacement: function (error, element) { // 为每种input设置错误输出位置
        if (element.parent(".input-group").size() > 0) {
          error.insertAfter(element.parent(".input-group"));
        } else if (element.attr("data-error-container")) {
          error.appendTo(element.attr("data-error-container"));
        } else {
          error.insertAfter(element);
        }
      },
      highlight: function (element) { // 高亮显示控件form-group和has-error都是样式类
        $(element)
          .closest('.form-group').addClass('has-error');
      },
      unhighlight: function (element) { // 取消高亮显示
        $(element)
          .closest('.form-group').removeClass('has-error');
      },
      success: function (label) {
        label
          .closest('.form-group').removeClass('has-error');
        label.remove();
      }
    });
  };

  return {
    // 初始化
    init: function (id) {
      configMap.id = id;
      setJqueryMap();

      // 控件验证
      roleValidation();
      if (configMap.id) {
        getRole(configMap.id);
      }
    },
    setPath: function (path) {
      configMap.path = path;
    },
    // 保存雇员信息，参数为回掉函数
    saveRole: function (callback) {
      if (jqueryMap.$roleForm.valid()) {
        saveRole(callback);
      }
      else {
        callback(false);
      }
    }
  };
}();
//@ sourceURL=roles/edit.js