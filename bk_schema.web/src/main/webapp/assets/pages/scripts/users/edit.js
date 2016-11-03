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

var userEdit = function () {
  'use strict';

  // 全局属性参数
  var configMap = {
    path: '',
    dataUrl: '/users/user',
    getOrgUrl: '/organization/org',
    setOrgPageUrl: '/users/set-org.jsp',
    id: '',
    orgId: '',
    validationRule: {}
  };

  // 全局Dom
  var jqueryMap = {
    $userForm: null,
    $selectOrgDialog: null
  };

  var setJqueryMap = function () {
    jqueryMap.$userForm = $('#user-form-datas');
  };

  var saveUser = function (callback) {
    var blockTarget = jqueryMap.$userForm.closest(".modal-content");
    App.blockUI({
      target: blockTarget,
      boxed: true,
      message: '正在保存数据...'
    });

    var data = {
      name: jqueryMap.$userForm.find('input[name="name"]').val(),
      userAccount: jqueryMap.$userForm.find('input[name="userAccount"]').val(),
      password: jqueryMap.$userForm.find('input[name="userPwd"]').val(),
      email: jqueryMap.$userForm.find('input[name="email"]').val(),
      remark: jqueryMap.$userForm.find('textarea[name="remark"]').val(),
      orgId: jqueryMap.$userForm.find('input[name="org"]').val(),
      enabled: 'true'
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
      dataType: 'JSON',
      data: JSON.stringify(data),
      success: function (result) {
        App.unblockUI(blockTarget);
        if(result.success){
          callback(true);
        }
        else{
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
      error: function (ex, e, ee) {
        App.unblockUI(blockTarget);
        App.alert({
          container: jqueryMap.$userForm.closest(".modal-body"),
          place: 'prepend',
          type: 'danger',
          message: '保存失败！',
          icon: 'fa fa-warning'
        });
        callback(false);
      }
    });
  };

  var getOrgName = function (orgId) {
    var orgName = '单击选择部门';
    $.ajax({
      url: configMap.path + configMap.getOrgUrl + '/' + orgId,
      dataType: 'JSON',
      type: 'GET',
      async: false,
      success: function (org) {
        if (org && org.name) {
          orgName = org.name;
        }
      },
      error: function () {
      }
    });

    return orgName;
  };

  var getUser = function (id) {
    $.ajax({
      url: configMap.path + configMap.dataUrl + '/' + id,
      dataType: 'JSON',
      type: 'GET',
      success: function (data) {
        jqueryMap.$userForm.find('input[name="name"]').val(data.name);
        jqueryMap.$userForm.find('input[name="userAccount"]').val(data.userAccount);
        jqueryMap.$userForm.find('input[name="email"]').val(data.email);
        jqueryMap.$userForm.find('textarea[name="remark"]').val(data.remark);
        jqueryMap.$userForm.find('input[name="org"]').val(data.orgId);
        jqueryMap.$userForm.find('[id=btnSelectOrg] span').text(getOrgName(data.orgId));
      },
      error: function () {
        Messenger().post({
          message: '获取组织结构数据失败！',
          type: 'error'
        });
      }
    });
  };

  var userValidation = function () {
    jqueryMap.$userForm.validate({
      errorElement: 'span',
      errorClass: 'help-block help-block-error',
      focusInvalid: false,
      ignore: "",
      rules: configMap.validationRule,
      messages: { // 自定义显示消息
        rePwd: {
          equalTo: '两次输入的密码不一致！'
        }
      },
      errorPlacement: function (error, element) { // 为每种input设置错误输出位置
        if (element.parent(".input-group").size() > 0) {
          error.insertAfter(element.parent(".input-group"));
        } else if (element.attr("data-error-container")) {
          error.appendTo(element.attr("data-error-container"));
        } else if (element.parents('.checkbox-list').size() > 0) {
          error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
        } else if (element.parents('.radio-list').size() > 0) {
          error.appendTo(element.parents('.radio-list').attr("data-error-container"));
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

  var openModal = function (title, url, type) {
    var dialogButtons = {
      cancel: {
        label: '关闭',
        className: 'btn-default'
      }
    };

    if (type === 'edit') {
      dialogButtons.success = {
        label: "保存",
        className: "btn-success",
        callback: function (result) {
          setUserOrg.getSelectedOrg(function (result) {
            if (result) {
              jqueryMap.$userForm.find('input[name=org]').val(result.id);
              jqueryMap.$userForm.find('[id=btnSelectOrg] span').text(result.text);
              jqueryMap.$selectOrgDialog.modal('hide');
            }
          });
          return false;
        }
      };
    }

    $.get(url, function (html) {
      jqueryMap.$selectOrgDialog = bootbox.dialog({
        title: title,
        message: html,
        buttons: dialogButtons
      });
    });
  };

  var selectOrg = function () {
    openModal('选择所属部门',
      configMap.path + configMap.setOrgPageUrl + "?orgid=" + jqueryMap.$userForm.find(
        'input[name=org]').val(), 'edit');
  };

  return {
    // 初始化
    init: function (id, orgId) {
      configMap.id = id;
      configMap.orgId = orgId;
      setJqueryMap();

      configMap.validationRule = {
        name: {
          minlength: 2,
          required: true
        },
        userAccount: {
          minlength: 2,
          required: true
        },
        org: {
          required: false
        }
      };

      $('#btnSelectOrg', jqueryMap.$userForm).off('click').on('click', function () {
        selectOrg();
      });

      if (configMap.id) {
        getUser(configMap.id);
        jqueryMap.$userForm.find('div[data-type=pwd]').hide();
        jqueryMap.$userForm.find('input[name=userAccount]').attr('disabled', 'disabled');
      }
      else {
        configMap.validationRule.userPwd = {
          required: true,
          minlength: 6
        };

        configMap.validationRule.rePwd = {
          required: true,
          minlength: 6,
          equalTo: '#userPwd'
        };

        if (configMap.orgId) {
          jqueryMap.$userForm.find('[id=btnSelectOrg]').attr('disabled', 'disabled');
          jqueryMap.$userForm.find('[id=btnSelectOrg] span').text(getOrgName(configMap.orgId));
          $('#btnSelectOrg').off('click');
        }
      }

      // 控件验证
      userValidation();
    },
    // 设置路径
    setPath: function (path) {
      configMap.path = path;
    },
    // 保存雇员信息，参数为回掉函数
    saveUser: function (callback) {
      if (jqueryMap.$userForm.valid()) {
        saveUser(callback);
      }
      else {
        callback(false);
      }
    }
  };
}();
//@ sourceURL=users/edit.js