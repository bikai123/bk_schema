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

var jizushezhiView = function () {
  'use strict';

  var configMap = {
    path: '',
 //   getOrgUrl: '/organization/org',
    dataUrl: '/jizushezhi/getjizushezhiById/'
  };

  var jqueryMap = {
    $container: null
  };

  var getJizushezhi = function (id) {
    $.ajax({
      url: configMap.path + configMap.dataUrl + id,
      dataType: 'JSON',
      type: 'GET',
      success: function (data) {
       // var orgName = '';
//        $.ajax({
//          url: configMap.path + configMap.getOrgUrl + '/' + data.orgId,
//          dataType: 'JSON',
//          type: 'GET',
//          async: false,
//          success: function (org) {
//            if (org && org.name) {
//              orgName = org.name;
//            }
//          },
//          error: function () {
//            Messenger().post({
//              message: '获取组织结构数据失败！',
//              type: 'error'
//            });
//          }
//        });

        $('#bianhao', jqueryMap.$container).text(data.bianhao);
        $('#mingcheng', jqueryMap.$container).text(data.mingcheng);
        $('#mingpai', jqueryMap.$container).text(data.mingpai);
        $('#ranliao', jqueryMap.$container).text(data.ranliao);
        $('#riqi', jqueryMap.$container).text(data.riqi);
        $('#leixing', jqueryMap.$container).text(data.leixing);
        $('#tingyong', jqueryMap.$container).text((data.tingyong==1) ? '未停用' : '已停用');
        $('#beizhu', jqueryMap.$container).text(data.beizhu);
      },
      error: function () {
      }
    });
  };

  return {
    init: function (id) {
      getJizushezhi(id);
    },
    setPath: function (path) {
      configMap.path = path;
      jqueryMap.$container = $('#jizushezhi-manager-view-data');
    }
  };
}();
//@ sourceURL=jizushezhiView.js