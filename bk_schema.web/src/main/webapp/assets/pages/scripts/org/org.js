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

var organization = function () {
  'use strict';

  // 全局属性参数
  var configMap = {
    path: '',
    dataUrl: '/organization/org',
    createUserPageUrl: '/users/edit.jsp',
    currentSelectedNode: null,
    optType: null
  };

  // 全局Dom
  var jqueryMap = {
    $container: null,
    $orgFrom: null,
    $blockTarget: null,
    $orgTree: null
  };

  var openModal = function (title, url, type, func) {
    var dialogButtons = {
      cancel: {
        label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
        className: 'btn-default'
      }
    };

    if (type === 'edit') {
      dialogButtons.success = {
        label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
        className: "btn-primary",
        callback: function () {
          func();
          return false;
        }
      };
    }

    $.get(url, function (html) {
      jqueryMap.$orgDialog = bootbox.dialog({
        title: title,
        message: html,
        buttons: dialogButtons
      });
    });
  };

  var setJqueryMap = function () {
    jqueryMap.$container = $('#org-manager-content');
    jqueryMap.$blockTarget = jqueryMap.$container;
    jqueryMap.$orgFrom = $('#orgForm', jqueryMap.$container);
    jqueryMap.$orgTree = $('#org_manage_tree', jqueryMap.$container);
  };

  var clearFormInput = function () {
    jqueryMap.$orgFrom.find('input[name=orgCode]').val('');
    jqueryMap.$orgFrom.find('[name="orgType"]').val('').trigger('change');
    jqueryMap.$orgFrom.find('input[name=orgName]').val('');
    jqueryMap.$orgFrom.find('textarea[name=orgRemark]').val('');
  };

  var addNewOrg = function () {
    configMap.optType = 'add';
    jqueryMap.$orgFrom.find('input, select, textarea, button').removeAttr('disabled');
    clearFormInput();
  };

  var addNewNextOrg = function () {
    if (configMap.currentSelectedNode == null) {
      Messenger().post({message: '请选择一个组织结构！', type: 'warning'});
      return;
    }

    jqueryMap.$orgFrom.find('input, select, textarea, button').removeAttr('disabled');
    clearFormInput();
    configMap.optType = 'addNext';
  };

  var deleteOrg = function () {
    if (configMap.currentSelectedNode == null) {
      Messenger().post({message: '请选择一个组织结构！', type: 'warning'});
      return;
    }

    clearFormInput();
    configMap.optType = 'del';
    if (configMap.currentSelectedNode.children.length > 0) {
      Messenger().post({message: '包含下级组织结构，不能删除！', type: 'warning'});
    }
    else {
      bootbox.dialog({
        title: '提示',
        message: '确定要删除该组织结构？',
        buttons: {
          cancel: {
            label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
            className: 'btn-default'
          },
          success: {
            label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
            className: "btn-danger",
            callback: function () {
              App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在删除组织结构，请稍候...'
              });

              $.ajax({
                url: configMap.path + configMap.dataUrl + "/" + configMap.currentSelectedNode.id,
                type: 'DELETE',
                success: function (result) {
                  App.unblockUI(jqueryMap.$blockTarget);
                  if (result) {
                    if (configMap.currentSelectedNode != null) {
                      jqueryMap.$orgTree.jstree(true).delete_node(configMap.currentSelectedNode);
                      if (configMap.currentSelectedNode.parent != '#') {
                        jqueryMap.$orgTree.jstree(true)
                          .select_node(configMap.currentSelectedNode.parent);
                      }
                      else {
                        configMap.currentSelectedNode = null;
                        jqueryMap.$orgFrom.find('input, select, textarea, button')
                          .attr('disabled', 'disabled');
                      }
                    }

                    Messenger().post({message: "删除成功!", type: 'success'});
                  }
                  else {
                    Messenger().post({message: "删除失败!", type: 'error'});
                  }
                },
                error: function () {
                  App.unblockUI(jqueryMap.$blockTarget);
                  Messenger().post({message: '删除失败！', type: 'error'});
                }
              });
            }
          }
        }
      });
    }
  };

  var saveOrg = function () {
    if (!jqueryMap.$orgFrom.valid()) {
      return;
    }

    var data = {
      code: jqueryMap.$orgFrom.find('input[name=orgCode]').val(),
      name: jqueryMap.$orgFrom.find('input[name=orgName]').val(),
      orgType: jqueryMap.$orgFrom.find('input[name=orgType]').val(),
      remark: jqueryMap.$orgFrom.find('textarea[name=orgRemark]').val(),
      parentId: ''
    };

    var url = configMap.path + configMap.dataUrl;
    var requestType = 'POST';
    if (configMap.optType === 'add') {
      if (configMap.currentSelectedNode != null && configMap.currentSelectedNode.parent != '#') {
        data.parentId = configMap.currentSelectedNode.parent;
      }
    }
    else if (configMap.optType === 'addNext') {
      data.parentId = configMap.currentSelectedNode.id;
    }
    else if (configMap.optType === 'edit') {
      url = url + "/" + configMap.currentSelectedNode.id;
      requestType = 'PUT';
    }

    App.blockUI({
      target: jqueryMap.$blockTarget,
      boxed: true,
      message: '正在保存数据，请稍候...'
    });
    $.ajax({
      url: url,
      type: requestType,
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      data: JSON.stringify(data),
      success: function (result) {
        App.unblockUI(jqueryMap.$blockTarget);
        if (result.errmsg) {
          Messenger().post({message: result.errmsg, type: 'error'});
        }
        else {
          var nodeData = {
            id: result.id,
            text: data.name,
            li_attr: {
              independent: data.independent
            }
          };
          if (configMap.optType === 'edit') {
            configMap.currentSelectedNode.text = data.name;
            configMap.currentSelectedNode.li_attr.independent = data.independent;
            jqueryMap.$orgTree.jstree(true).rename_node(configMap.currentSelectedNode, data.name);
          }
          else {
            jqueryMap.$orgTree.jstree(true)
              .create_node(data.parentId ? data.parentId : '#', nodeData);
            jqueryMap.$orgTree.jstree(true).deselect_all();
            jqueryMap.$orgTree.jstree(true).select_node(result.id);
          }

          Messenger().post({message: '保存数据成功！', type: 'success'});
        }
      },
      error: function (ex, e, ee) {
        App.unblockUI(jqueryMap.$blockTarget);
        Messenger().post({message: '保存数据失败！', type: 'error'});
      }
    });
  };

  var createOrgUser = function () {
    openModal('创建用户',
      configMap.path + configMap.createUserPageUrl + '?orgid=' + configMap.currentSelectedNode.id,
      'edit', function () {
        userEdit.saveUser(function (result) {
          if (result) {
            jqueryMap.$orgDialog.modal('hide');
          }
        });
      });
  };

  var initOrganization = function () {
    jqueryMap.$orgTree.jstree({
      'core': {
        "themes": {
          "responsive": false
        },
        "check_callback": true,
        'data': {
          'url': configMap.path + configMap.dataUrl
        }
      },
      "types": {
        "default": {
          "icon": "fa fa-folder icon-state-warning icon-lg"
        },
        "file": {
          "icon": "fa fa-file icon-state-warning icon-lg"
        }
      },
      'plugins': ["contextmenu", "types"],
      "contextmenu": {
        items: function (o, cb) {
          var actions = {};
          actions.create = {
            "separator_before": false,
            "separator_after": false,
            "_disabled": false,
            "icon": 'fa fa-plus',
            "label": "新增组织结构",
            "action": function (data) {
              addNewOrg();
            }
          };
          actions.createNext = {
            "separator_before": false,
            "separator_after": false,
            "_disabled": false,
            "icon": 'fa fa-plus',
            "label": "新增下级组织结构",
            "action": function (data) {
              addNewNextOrg();
            }
          };
          actions.delete = {
            "separator_before": false,
            "separator_after": false,
            "_disabled": false,
            "icon": 'fa fa-trash-o',
            "label": "删除组织结构",
            "action": function (data) {
              deleteOrg();
            }
          };
          actions.createUser = {
            "separator_before": false,
            "separator_after": false,
            "_disabled": false,
            "icon": 'fa fa-user',
            "label": "创建用户",
            "action": function (data) {
              createOrgUser();
            }
          };
          return actions;//返回右键菜单项
        }
      }
    });

    jqueryMap.$orgTree.on('select_node.jstree', function (e, data) {
      jqueryMap.$orgFrom.find('input, select, textarea, button').removeAttr('disabled');
      clearFormInput();
      configMap.currentSelectedNode = data.node;
      jqueryMap.$orgFrom.find('input[name=orgCode]').attr('disabled', 'disabled');
      configMap.optType = 'edit';
      App.blockUI({
        target: jqueryMap.$blockTarget,
        boxed: true,
        message: '正在获取数据，请稍候...'
      });

      $.ajax({
        url: configMap.path + configMap.dataUrl + "/" + configMap.currentSelectedNode.id,
        dataType: 'JSON',
        type: 'GET',
        success: function (result) {
          App.unblockUI(jqueryMap.$blockTarget);
          jqueryMap.$orgFrom.find('input[name=orgCode]').val(result.code);
          jqueryMap.$orgFrom.find('input[name=orgName]').val(result.name);
          jqueryMap.$orgFrom.find('[name="orgType"]').val(result.orgType).trigger('change');
          jqueryMap.$orgFrom.find('textarea[name=orgRemark]').val(result.remark);
        },
        error: function () {
          App.unblockUI(jqueryMap.$blockTarget);
          Messenger().post({message: '获取数据失败！', type: 'error'});
        }
      });
    });
  };

  var orgValidation = function () {
    jqueryMap.$orgFrom.validate({
      errorElement: 'span',
      errorClass: 'help-block help-block-error',
      focusInvalid: false,
      ignore: "",
      rules: { // rules 中的属性name、code、sex等为Input的name属性值
        orgCode: {
          minlength: 2,
          required: true
        },
        orgName: {
          minlength: 2,
          required: true
        }
      },
      messages: {
        orgCode: {
          required: '部门编码为必填项！'
        },
        orgName: {
          required: '部门名称编码为必填项！'
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
      setJqueryMap();

      Layout.addResizeContent(jqueryMap.$container);
      setTimeout(function () {
        var layout = jqueryMap.$container.layout({
          center__onresize: App.initLayoutContentScrollbar,
          west__onresize: App.initLayoutContentScrollbar,
          west__size: 300
        });

        App.initLayoutContentScrollbar('west', layout.panes.west);
        App.initLayoutContentScrollbar('center', layout.panes.center);
      }, 10);

      jqueryMap.$orgFrom.find('input, select, textarea, button').attr('disabled', 'disabled');

      $('#orgType', jqueryMap.$orgFrom).select2({
        placeholder: '选择类型',
        width: '100%',
        language: 'zh-CN',
        allowClear: true
      });

      $('#btnNewOrg', jqueryMap.$container).off().on('click', function () {
        addNewOrg();
      });

      $('#btnNewNextOrg', jqueryMap.$container).off().on('click', function () {
        addNewNextOrg();
      });

      $('#btnDelOrg', jqueryMap.$container).off().on('click', function () {
        deleteOrg();
      });

      $('#btnSaveOrg', jqueryMap.$container).off().on('click', function () {
        saveOrg();
      });

      initOrganization();
      orgValidation();
    },
    // 设置路径
    setPath: function (path) {
      configMap.path = path;
    }
  };
}();
//@ sourceURL=org/org.js