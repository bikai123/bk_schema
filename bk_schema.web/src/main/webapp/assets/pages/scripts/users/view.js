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

/*global $, App, moment */

var userView = function () {
  'use strict';

  var configMap = {
    path: '',
    getOrgUrl: '/organization/org',
    dataUrl: '/users/user/'
  };

  var jqueryMap = {
    $container: null
  };

  var getUser = function (id) {
    $.ajax({
      url: configMap.path + configMap.dataUrl + id,
      dataType: 'JSON',
      type: 'GET',
      success: function (data) {
        var orgName = '';
        $.ajax({
          url: configMap.path + configMap.getOrgUrl + '/' + data.orgId,
          dataType: 'JSON',
          type: 'GET',
          async: false,
          success: function (org) {
            if (org && org.name) {
              orgName = org.name;
            }
          },
          error: function () {
            Messenger().post({
              message: '获取组织结构数据失败！',
              type: 'error'
            });
          }
        });

        $('#name', jqueryMap.$container).text(data.name);
        $('#account', jqueryMap.$container).text(data.userAccount);
        $('#status', jqueryMap.$container).text(data.enabled ? '已启用' : '已停用');
        $('#org', jqueryMap.$container).text(orgName);
        $('#createDate', jqueryMap.$container).text(moment(data.createDate).format('YYYY-MM-DD'));
        $('#email', jqueryMap.$container).text(data.email);
        $('#remark', jqueryMap.$container).text(data.remark);
      },
      error: function () {
      }
    });
  };

  return {
    init: function (id) {
      getUser(id);
    },
    setPath: function (path) {
      configMap.path = path;
      jqueryMap.$container = $('#user-manager-view-data');
    }
  };
}();
//@ sourceURL=view.js