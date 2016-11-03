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

/*global $, App, moment, jQuery, bootbox, UsersEdit */

var users = function () {
  'use strict';

  // 全局属性参数
  var configMap = {
    path: '',
    dataUrl: '/users/user',
    pwdUrl: '/users/pwd',
    updateOrg: '/users/setorg',
    getUserOrg: '/users/getorg',
    setUserStatusUrl: '/users/status',
    usersGrid: null,
    editPageUrl: '/users/edit.jsp',
    setRolePageUrl: '/users/set-role.jsp',
    setOrgPageUrl: '/users/set-org.jsp',
    setAuthPageUrl: '/resources/set-auth.jsp',
    viewPageUrl: '/users/view.jsp',
    editBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="edit" data-toggle="tooltip" title="编辑用户信息"><i class="fa fa-edit"></i></a>',
    deleteBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="del" data-toggle="tooltip" title="删除用户"><i class="fa fa-times"></i></a>',
    viewBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="view" data-toggle="tooltip" title="查看用户信息"><i class="fa fa-search"></i></a>'
  };

  // 全局Dom
  var jqueryMap = {
    $container: null,
    $blockTarget: null,
    $usersDialog: null,
    $selectedRow: null,
    $userDataTable: null
  };

  var setJqueryMap = function () {
    jqueryMap.$container = $('#user-manager-container');
    jqueryMap.$blockTarget = jqueryMap.$container;
    jqueryMap.$userDataTable = $('#users_data', jqueryMap.$container);
  };

  var initUsersData = function () {
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
        configMap.usersGrid.clear().draw();
        if (datas.length > 0) {
          return configMap.usersGrid.rows.add(datas).draw();
        }
      },
      error: function () {
        return App.unblockUI(jqueryMap.$blockTarget);
      }
    });
  };

  var openModal = function (title, url, type, fun) {
    var dialogButtons = {
      cancel: {
        label: '<i class="fa fa-times"></i> 关&nbsp;闭',
        className: 'btn-default'
      }
    };

    if (type === 'edit') {
      dialogButtons.success = {
        label: '<i class="fa fa-save"></i> 保&nbsp;存',
        className: "btn-primary",
        callback: function () {
          fun();
          return false;
        }
      };
    }

    $.get(url, function (html) {
      jqueryMap.$usersDialog = bootbox.dialog({
        title: title,
        message: html,
        buttons: dialogButtons
      });
    });
  };

  var setUserStatus = function (event, el) {
    var rowIndex = configMap.usersGrid.cell(el.closest('td')).index().row;
    var id = configMap.usersGrid.row(rowIndex).data().id;
    var currentStatus = el.attr('user-status');
    var title = '';

    var excStatus = 0;
    var disHtml = '';
    if (currentStatus === '1') {
      disHtml = '<i class="fa fa-lock"></i>';
      title = '停用';
      excStatus = 0;
    } else if (currentStatus === '0') {
      disHtml = '<i class="fa fa-unlock"></i>';
      title = '启用';
      excStatus = 1;
    }

    App.blockUI({
      target: jqueryMap.$blockTarget,
      boxed: true,
      message: '正在' + title + '用户，请稍候...'
    });

    $.ajax({
      url: configMap.path + configMap.setUserStatusUrl
      + "/" + id + "/" + excStatus,
      type: 'PUT',
      success: function (datas) {
        App.unblockUI(jqueryMap.$blockTarget);
        el.html(disHtml);
        el.attr('data-original-title', '已' + title);
        el.attr('user-status', excStatus);

        Messenger().post({
          message: '成功' + title + '用户！'
        });
      },
      error: function () {
        App.unblockUI(jqueryMap.$blockTarget);
        Messenger().post({
          message: title + '用户失败！',
          type: 'error'
        });
      }
    });
  };

  var viewUsers = function () {
    var el = $(this);
    var rowIndex = configMap.usersGrid.cell(el.closest('td')).index().row;
    var id = configMap.usersGrid.row(rowIndex).data().id;
    openModal("查看用户信息", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id),
      'view');
  };

  var addUsers = function () {
    openModal('添加用户', configMap.path + configMap.editPageUrl, 'edit',
      function () {
        userEdit.saveUser(function (result) {
          if (result) {
            initUsersData();
            jqueryMap.$usersDialog.modal('hide');
          }
        });
      });
  };

  var setRoles = function () {
    if (jqueryMap.$selectedRow === null) {
      Messenger().post({
        message: '请选择一个用户！',
        type: 'warning'
      });
    } else {
      var id = jqueryMap.$selectedRow.data().id;
      openModal('设置用户角色',
        configMap.path + configMap.setRolePageUrl + "?userid=" + encodeURI(id),
        'edit', function () {
          setUserRole.saveUserRole(function (result) {
            if (result) {
              jqueryMap.$usersDialog.modal('hide');
            }
          });
        });
    }
  };

  var setOrg = function () {
    if (jqueryMap.$selectedRow === null) {
      Messenger().post({
        message: '请选择一个用户！',
        type: 'warning'
      });
    } else {
      var id = jqueryMap.$selectedRow.data().id;
      var userOrg = '';
      $.ajax({
        url: configMap.path + configMap.getUserOrg + "/" + id,
        type: 'GET',
        dataType: 'JSON',
        async: false,
        success: function (result) {
          if (result) {
            userOrg = result.orgId;
          }
        }
      });

      openModal('设置所属部门', configMap.path + configMap.setOrgPageUrl + '?orgid=' + userOrg,
        'edit', function () {
          setUserOrg.getSelectedOrg(function (result) {
            if (result) {
              $.ajax({
                url: configMap.path + configMap.updateOrg + '/' + id + '/'
                + result.id,
                async: false,
                type: 'PUT',
                success: function () {
                  Messenger().post({
                    message: '成功修改部门！',
                    type: 'success'
                  });
                },
                error: function () {
                  Messenger().post({
                    message: '修改部门失败！',
                    type: 'error'
                  });
                }
              });
              jqueryMap.$usersDialog.modal('hide');
            }
          });
        });
    }
  };

  var setUserAuth = function () {
    if (jqueryMap.$selectedRow === null) {
      Messenger().post({
        message: '请选择一个用户！',
        type: 'warning'
      });
    } else {
      var id = jqueryMap.$selectedRow.data().id;
      openModal('设置用户功能权限', configMap.path + configMap.setAuthPageUrl + "?id=" + encodeURI(id)
        + '&type=user', 'edit',
        function () {
          setAuth.saveAuth(function (result) {
            if (result) {
              jqueryMap.$usersDialog.modal('hide');
            }
          });
        });
    }
  };

  var resetPwd = function () {
    if (jqueryMap.$selectedRow === null) {
      Messenger().post({
        message: '请选择一个用户！',
        type: 'warning'
      });
    } else {
      var id = jqueryMap.$selectedRow.data().id;
      bootbox.dialog({
        title: '提示',
        message: '确定要重置密码？',
        buttons: {
          cancel: {
            label: '<i class="fa fa-ban"></i> 取&nbsp;消',
            className: 'btn-default'
          },
          success: {
            label: '<i class="fa fa-check"></i> 确&nbsp;定',
            className: "btn-primary",
            callback: function () {
              App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在重置密码，请稍候...'
              });
              $.ajax({
                url: configMap.path + configMap.pwdUrl + '/'
                + id,
                type: 'PUT',
                success: function (datas) {
                  App.unblockUI(jqueryMap.$blockTarget);
                  Messenger().post({
                    message: '密码重置成功！'
                  });
                },
                error: function () {
                  App.unblockUI(jqueryMap.$blockTarget);
                  Messenger().post({
                    message: '密码重置失败！',
                    type: 'error'
                  });
                }
              });
            }
          }
        }
      });
    }
  };

  var editUsers = function () {
    var el = $(this);
    var rowIndex = configMap.usersGrid.cell(el.closest('td')).index().row;
    var id = configMap.usersGrid.row(rowIndex).data().id;
    openModal('编辑用户信息', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit',
      function () {
        userEdit.saveUser(function (result) {
          if (result) {
            initUsersData();
            jqueryMap.$usersDialog.modal('hide');
          }
        });
      });
  };

  var delUsers = function (event, element) {
    App.blockUI({
      target: jqueryMap.$blockTarget,
      boxed: true,
      message: '正在删除数据，请稍候...'
    });

    var rowIndex = configMap.usersGrid.cell(element.closest('td')).index().row;
    var id = configMap.usersGrid.row(rowIndex).data().id;
    $.ajax({
      url: configMap.path + configMap.dataUrl + "/" + id,
      type: 'DELETE',
      success: function (result) {
        App.unblockUI(jqueryMap.$blockTarget);
        if (result) {
          initUsersData();
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

  var initUsersGrid = function () {
    configMap.usersGrid =
      jqueryMap.$userDataTable.DataTable({
        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
        "destroy": true,
        "lengthMenu": [10, 20, 50, 100],
        "autoWidth": false,
        "columnDefs": [
          {
            "targets": [4],
            "orderable": false
          },
          {
            "searchable": false,
            "targets": [3, 4]
          }
        ],
        "columns": [
          {"data": "name"},
          {"data": "userAccount"},
          {"data": "orgName"},
          {
            "data": "createDate",
            "render": function (data, type, row) {
              return moment(data)
                .format('YYYY-MM-DD');
            }
          },
          {
            "render": function (data, type,
                                row) {
              var statusHtml = '';
              if (row.enabled === true) {
                statusHtml =
                  '<a href="javascript:;" class="btn btn-xs btn-default" data-type="staus" data-toggle="tooltip" user-status="1" title="已启用" data-title="确定要停用用户？"><i class="fa fa-unlock"></i></a>';
              }
              else {
                statusHtml =
                  '<a href="javascript:;" class="btn btn-xs btn-default" data-type="staus" data-toggle="tooltip" user-status="0" title="已停用" data-title="确定要启用用户？"><i class="fa fa-lock"></i></a>';
              }

              return '<div class="data-center">'
                + configMap.editBtn_html
                + statusHtml
                + configMap.deleteBtn_html
                + configMap.viewBtn_html
                + '</div>';
            }
          }
        ],
        "drawCallback": function () { // 数据加载完成后执行
          var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$userDataTable);
          var editContainer = $('[data-type="edit"]', jqueryMap.$userDataTable);
          var delContainer = $('[data-type="del"]', jqueryMap.$userDataTable);
          var viewContainer = $('[data-type="view"]', jqueryMap.$userDataTable);
          var userStatusContainer = $('[data-type="staus"]', jqueryMap.$userDataTable);

          if (editContainer.length > 0) {
            editContainer.off('click')
              .on('click', editUsers);
          }

          if (delContainer.length > 0) {
            delContainer.confirmation({
              "title": '是否确定要删除用户？',
              "btnOkLabel": '是',
              "btnCancelLabel": '否',
              "placement": 'left',
              "onConfirm": delUsers
            });
          }

          if (viewContainer.length > 0) {
            viewContainer.off('click')
              .on('click', viewUsers);
          }

          if (tootipContainer.length > 0) {
            tootipContainer.tooltip();
          }

          if (userStatusContainer.length > 0) {
            userStatusContainer.confirmation({
              "title": '是否确定要启停用户？',
              "btnOkLabel": '是',
              "btnCancelLabel": '否',
              "placement": 'left',
              "onConfirm": setUserStatus
            });
          }
        }
      });

    $('tbody', jqueryMap.$userDataTable).on('click', 'tr', function () {
      if ($(this).hasClass('success')) {
        $(this).removeClass('success');
        jqueryMap.$selectedRow = null;
      }
      else {
        configMap.usersGrid.$('tr.success').removeClass('success');
        $(this).addClass('success');
        jqueryMap.$selectedRow = configMap.usersGrid.row('.success');
      }
    });
  };

  return {
    init: function () {
      $('#btnNewUser', jqueryMap.$container).off().on('click', function () {
        addUsers();
      });
      $('#btnSetRole', jqueryMap.$container).off().on('click', function () {
        setRoles();
      });
      $('#btnSetOrg', jqueryMap.$container).off().on('click', function () {
        setOrg();
      });
      $('#btnResetPwd', jqueryMap.$container).off().on('click', function () {
        resetPwd();
      });
      $('#btnSetUserAuth', jqueryMap.$container).off().on('click', function () {
        setUserAuth();
      });

      $('#searchFilter', jqueryMap.$container).on('keyup', function () {
        configMap.usersGrid.search(this.value).draw();
      });

      setJqueryMap();
      initUsersGrid();
      initUsersData();
    },
    setPath: function (path) {
      configMap.path = path;
    }
  };
}();
//@ sourceURL=users/users.js