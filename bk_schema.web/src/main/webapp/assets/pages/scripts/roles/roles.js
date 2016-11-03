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

/*global $, App, moment, jQuery, bootbox, roleEdit */

var roles = function () {
  'use strict';

  // 全局属性参数
  var configMap = {
    path: '',
    dataUrl: 'roles/role',
    rolesGrid: null,
    editPageUrl: 'roles/edit.jsp',
    setAuthPageUrl: 'resources/set-auth.jsp',
    setRoleUser: 'roles/setuser.jsp',
    editBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="edit" data-toggle="tooltip" title="编辑角色信息"><i class="fa fa-edit"></i></a>',
    deleteBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="del" data-toggle="tooltip" title="删除角色"><i class="fa fa-times"></i></a>'
  };

  // 全局Dom
  var jqueryMap = {
    $container: null,
    $blockTarget: null,
    $rolesDialog: null,
    $selectedRow: null,
    $roleDataTable: null
  };

  var setJqueryMap = function () {
    jqueryMap.$container = $('#role-manager-content');
    jqueryMap.$blockTarget = jqueryMap.$container;
    jqueryMap.$roleDataTable = $('#roles_data', jqueryMap.$container);
  };

  var initRolesData = function () {
    App.blockUI({
      target: jqueryMap.$blockTarget,
      boxed: true,
      message: '正在加载数据，请稍候...'
    });
    $.ajax({
      url: configMap.path + configMap.dataUrl,
      dataType: 'JSON',
      type: 'GET',
      success: function (datas) {
        App.unblockUI(jqueryMap.$blockTarget);
        configMap.rolesGrid.clear().draw();
        if (datas.length > 0) {
          return configMap.rolesGrid.rows.add(datas).draw();
        }
      },
      error: function () {
        return App.unblockUI(jqueryMap.$blockTarget);
      }
    });
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
        label: '<i class="fa fa-times"></i> 保&nbsp;存 ',
        className: "btn-primary",
        callback: function () {
          func();
          return false;
        }
      };
    }

    $.get(url, function (html) {
      jqueryMap.$rolesDialog = bootbox.dialog({
        title: title,
        message: html,
        buttons: dialogButtons
      });
    });
  };

  var addRoles = function () {
    openModal('添加角色', configMap.path + configMap.editPageUrl, 'edit', function () {
      roleEdit.saveRole(function (result) {
        if (result) {
          initRolesData();
          jqueryMap.$rolesDialog.modal('hide');
        }
      });
    });
  };

  var setRolAuth = function () {
    if (jqueryMap.$selectedRow === null) {
      Messenger().post({
        message: '请选择一个角色！',
        type: 'warning'
      });
    } else {
      var id = jqueryMap.$selectedRow.data().id;
      openModal('设置功能权限', configMap.path + configMap.setAuthPageUrl + "?id=" + encodeURI(id)
        + '&type=role', 'edit',
        function () {
          setAuth.saveAuth(function (result) {
            if (result) {
              jqueryMap.$rolesDialog.modal('hide');
            }
          });
        });
    }
  };

  var setUser = function () {
    if (jqueryMap.$selectedRow === null) {
      Messenger().post({
        message: '请选择一个角色！',
        type: 'warning'
      });
    } else {
      var id = jqueryMap.$selectedRow.data().id;
      openModal('设置角色用户',
        configMap.path + configMap.setRoleUser + "?id=" + encodeURI(id),
        'edit',
        function () {
          SetRoleUser.saveRoleUser(function (result) {
            if (result) {
              jqueryMap.$rolesDialog.modal('hide');
            }
          });
        });
    }
  };

  var editRoles = function () {
    var el = $(this);
    var rowIndex = configMap.rolesGrid.cell(el.closest('td')).index().row;
    var id = configMap.rolesGrid.row(rowIndex).data().id;
    openModal('编辑角色信息', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit',
      function () {
        roleEdit.saveRole(function (result) {
          if (result) {
            initRolesData();
            jqueryMap.$rolesDialog.modal('hide');
          }
        });
      });
  };

  var delRoles = function (event, element) {
    App.blockUI({
      target: jqueryMap.$blockTarget,
      boxed: true,
      message: '正在删除数据，请稍候...'
    });

    var rowIndex = configMap.rolesGrid.cell(element.closest('td')).index().row;
    var id = configMap.rolesGrid.row(rowIndex).data().id;
    $.ajax({
      url: configMap.path + configMap.dataUrl + "/" + id,
      type: 'DELETE',
      success: function (result) {
        App.unblockUI(jqueryMap.$blockTarget);
        if (result) {
          initRolesData();
          Messenger().post({
            message: '删除成功！'
          });
        }
        else {
          Messenger().post({
            message: '删除失败！',
            type: 'error'
          });
        }
      },
      error: function () {
        App.unblockUI(jqueryMap.$blockTarget);
        Messenger().post({
          message: '删除失败！',
          type: 'error'
        });
      }
    });
  };

  var initRolesGrid = function () {
    configMap.rolesGrid =
      jqueryMap.$roleDataTable.DataTable({
        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
        "ordering": false,
        "destroy": true,
        "lengthMenu": [10, 20, 50, 100],
        "autoWidth": false,
        "columns": [
          {"data": "name"},
          {"data": "remark"},
          {
            "render": function (data, type, row) {

              return '<div class="data-center">'
                + configMap.editBtn_html
                + configMap.deleteBtn_html
                + '</div>';
            }
          }
        ],
        "drawCallback": function () { // 数据加载完成后执行
          var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$roleDataTable);
          var editContainer = $('[data-type="edit"]', jqueryMap.$roleDataTable);
          var delContainer = $('[data-type="del"]', jqueryMap.$roleDataTable);

          if (editContainer.length > 0) {
            editContainer.off('click')
              .on('click', editRoles);
          }

          if (delContainer.length > 0) {
            delContainer.confirmation({
              "title": '确定要删除角色？',
              "btnOkLabel": '是',
              "btnCancelLabel": '否',
              "placement": 'left',
              "onConfirm": delRoles
            });
          }

          if (tootipContainer.length > 0) {
            tootipContainer.tooltip();
          }
        }
      });

    $('tbody', jqueryMap.$roleDataTable).on('click', 'tr', function () {
      if ($(this).hasClass('success')) {
        $(this).removeClass('success');
        jqueryMap.$selectedRow = null;
      }
      else {
        configMap.rolesGrid.$('tr.success').removeClass('success');
        $(this).addClass('success');
        jqueryMap.$selectedRow = configMap.rolesGrid.row('.success');
      }
    });
  };

  return {
    init: function () {
      $('#btnNewRole', jqueryMap.$roleDataTable).off().on('click', function () {
        addRoles();
      });
      $('#btnSetRoleAuth', jqueryMap.$roleDataTable).off().on('click', function () {
        setRolAuth();
      });
      $('#btnSetUser', jqueryMap.$roleDataTable).off().on('click', function () {
        setUser();
      });

      setJqueryMap();
      initRolesGrid();
      initRolesData();
    }
  };
}();
//@ sourceURL=roles/roles.js