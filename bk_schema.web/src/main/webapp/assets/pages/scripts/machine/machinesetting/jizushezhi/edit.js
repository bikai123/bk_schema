var jizushezhi_edit=(function(){

	  'use strict';

	  // 全局属性参数
	  var configMap = {
	    path: '',
	    insertUrl: '/jizushezhi/insertJizushezhi',
	    selectUrl:'/jizushezhi/getjizushezhiById',
	   // getOrgUrl: '/organization/org',
	   // setOrgPageUrl: '/users/set-org.jsp',
	    id: '',
	    orgId: '',
	    validationRule: {},
	    $select2:null
	  };

	  // 全局Dom
	  var jqueryMap = {
	    $jizushezhiForm: null,
	 //   $selectOrgDialog: null
	  };

	  var setJqueryMap = function () {
	    jqueryMap.$jizushezhiForm = $('#jizushezhi-form-datas');
	  };

	  var saveJizushezhi = function (callback) {
	    var blockTarget = jqueryMap.$jizushezhiForm.closest(".modal-content");
	    App.blockUI({
	      target: blockTarget,
	      boxed: true,
	      message: '正在保存数据...'
	    });

	    var data = {
	    		bianhao: jqueryMap.$jizushezhiForm.find('input[name="bianhao"]').val(),
	    		mingcheng: jqueryMap.$jizushezhiForm.find('input[name="mingcheng"]').val(),
	    		mingpai: jqueryMap.$jizushezhiForm.find('input[name="mingpai"]').val(),
	    		ranliao: jqueryMap.$jizushezhiForm.find('input[name="ranliao"]').val(),
	    		riqi: jqueryMap.$jizushezhiForm.find('input[name="riqi"]').val(),
	    		leixing: jqueryMap.$jizushezhiForm.find('input[name="leixing"]').val(),
	    		tingyong: jqueryMap.$jizushezhiForm.find('select[name="tingyong"]').val(),
	    		beizhu: jqueryMap.$jizushezhiForm.find('textarea[name="beizhu"]').val(),	      
	    };

	    var url = configMap.path + configMap.insertUrl;
	    var requestType = 'POST';
	    if (configMap.id) {
	      url = url + "/" + configMap.id;
	      requestType = 'PUT';
	    }

	    $.ajax({
	      url: url,
	      type: requestType,
	      contentType: 'application/json; charset=utf-8',
	      //dataType: 'JSON',
	      data: JSON.stringify(data),
	      success: function (result) {
	        App.unblockUI(blockTarget);
	        if(result){
	          callback(true);
	        }
	        else{
	          App.alert({
	            container: jqueryMap.$jizushezhiForm.closest(".modal-body"),
	            place: 'prepend',
	            type: 'danger',
	            message: result,
	            icon: 'fa fa-warning'
	          });
	          callback(false);
	        }
	      },
	      error: function (e) {
	    	  
	        App.unblockUI(blockTarget);
	        App.alert({
	          container: jqueryMap.$jizushezhiForm.closest(".modal-body"),
	          place: 'prepend',
	          type: 'danger',
	          message: '保存失败！',
	          icon: 'fa fa-warning'
	        });
	        callback(false);
	      }
	    });
	  };

//	  var getOrgName = function (orgId) {
//	    var orgName = '单击选择部门';
//	    $.ajax({
//	      url: configMap.path + configMap.getOrgUrl + '/' + orgId,
//	      dataType: 'JSON',
//	      type: 'GET',
//	      async: false,
//	      success: function (org) {
//	        if (org && org.name) {
//	          orgName = org.name;
//	        }
//	      },
//	      error: function () {
//	      }
//	    });
//
//	    return orgName;
//	  };

	  var getJizushezhi = function (id) {
	    $.ajax({
	      url: configMap.path + configMap.selectUrl + '/' + id,
	      dataType: 'JSON',
	      type: 'GET',
	      success: function (data) {
	    	 jqueryMap.$jizushezhiForm.find('input[name="bianhao"]').val(data.bianhao);
	    	 jqueryMap.$jizushezhiForm.find('input[name="mingcheng"]').val(data.mingcheng);
	    	 jqueryMap.$jizushezhiForm.find('input[name="mingpai"]').val(data.mingpai);
	    	 jqueryMap.$jizushezhiForm.find('input[name="ranliao"]').val(data.ranliao);
	    	 jqueryMap.$jizushezhiForm.find('input[name="riqi"]').val(data.riqi);
	    	 jqueryMap.$jizushezhiForm.find('input[name="leixing"]').val(data.leixing);
	    	 configMap.$select2.val(data.tingyong).trigger("change");
//	    	 jqueryMap.$jizushezhiForm.find('select[name="tingyong"]').val(data.tingyong);
	    	 jqueryMap.$jizushezhiForm.find('textarea[name="beizhu"]').val(data.beizhu);
	        
	      },
	      error: function (e ) {
	    	  alert(JSON.stringify(e));
	        Messenger().post({
	          message: '获取机组设置失败！',
	          type: 'error'
	        });
	      }
	    });
	  };

	  var jizushezhiValidation = function () {
	    jqueryMap.$jizushezhiForm.validate({
	      errorElement: 'span',
	      errorClass: 'help-block help-block-error',
	      focusInvalid: false,
	      ignore: "",
	      rules: configMap.validationRule,
	      messages: { // 自定义显示消息
//	        rePwd: {
//	          equalTo: '两次输入的密码不一致！'
//	        }
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

//	  var openModal = function (title, url, type) {
//	    var dialogButtons = {
//	      cancel: {
//	        label: '关闭',
//	        className: 'btn-default'
//	      }
//	    };
//
//	    if (type === 'edit') {
//	      dialogButtons.success = {
//	        label: "保存",
//	        className: "btn-success",
//	        callback: function (result) {
//	          setUserOrg.getSelectedOrg(function (result) {
//	            if (result) {
//	              jqueryMap.$jizushezhiForm.find('input[name=org]').val(result.id);
//	              jqueryMap.$jizushezhiForm.find('[id=btnSelectOrg] span').text(result.text);
//	              jqueryMap.$selectOrgDialog.modal('hide');
//	            }
//	          });
//	          return false;
//	        }
//	      };
//	    }
//
//	    $.get(url, function (html) {
//	      jqueryMap.$selectOrgDialog = bootbox.dialog({
//	        title: title,
//	        message: html,
//	        buttons: dialogButtons
//	      });
//	    });
//	  };

//	  var selectOrg = function () {
//	    openModal('选择所属部门',
//	      configMap.path + configMap.setOrgPageUrl + "?orgid=" + jqueryMap.$jizushezhiForm.find(
//	        'input[name=org]').val(), 'edit');
//	  };
	  var initPlugin=function(){		  
		  $('#riqi').datetimepicker({
	          language: 'zh-CN',
	          pickTime: false,
	          todayBtn: true,
	          autoclose: true,
	          minView: '2',
	          forceParse: false,
	          format:"yyyy-mm-dd"
	      });
	      configMap.$select2= $("#tingyong").select2({
	    	
	    	  });
	  };

	  return {
	    // 初始化
	    init: function (id, orgId) {
	      configMap.id = id;
	      configMap.orgId = orgId;
	      setJqueryMap();
	      initPlugin();

	      configMap.validationRule = {
	    		  biaohao: {
	          minlength: 2,
	          required: true
	        },
	        mingcheng: {
	          minlength: 2,
	          required: true
	        },
	        leixing: {
	          required: false
	        }
	      };

//	      $('#btnSelectOrg', jqueryMap.$jizushezhiForm).off('click').on('click', function () {
//	        selectOrg();
//	      });

	      if (configMap.id) {
	    	  getJizushezhi(configMap.id);
//	        jqueryMap.$jizushezhiForm.find('div[data-type=pwd]').hide();
//	        jqueryMap.$jizushezhiForm.find('input[name=userAccount]').attr('disabled', 'disabled');
	      }
//	      else {
//	        configMap.validationRule.userPwd = {
//	          required: true,
//	          minlength: 6
//	        };
//
//	        configMap.validationRule.rePwd = {
//	          required: true,
//	          minlength: 6,
//	          equalTo: '#userPwd'
//	        };
//
//	        if (configMap.orgId) {
//	          jqueryMap.$jizushezhiForm.find('[id=btnSelectOrg]').attr('disabled', 'disabled');
////	          jqueryMap.$jizushezhiForm.find('[id=btnSelectOrg] span').text(getOrgName(configMap.orgId));
//	          $('#btnSelectOrg').off('click');
//	        }
//	      }

	      // 控件验证
	      jizushezhiValidation();
	    },
	    // 设置路径
	    setPath: function (path) {
	      configMap.path = path;
	    },
	    // 保存雇员信息，参数为回掉函数
	    saveJizushezhi: function (callback) {
	      if (jqueryMap.$jizushezhiForm.valid()) {
	    	  saveJizushezhi(callback);
	      }
	      else {
	        callback(false);
	      }
	    }
	  };

	
})()
//@ sourceURL=jizushezhi_edit.js