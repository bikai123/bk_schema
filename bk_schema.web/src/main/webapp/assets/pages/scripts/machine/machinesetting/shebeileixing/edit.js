var shebeileixing_edit=(function(){

	  'use strict';

	  // 全局属性参数
	  var configMap = {
	    path: '',
	    insertUrl: '/shebeifenlei/insertShebeifenlei',
	    selectUrl:'/shebeifenlei/getShebeifenleiById',
	    id: '',
	    parent:'',
	    validationRule: {},
	    $select2:null
	  };

	  // 全局Dom
	  var jqueryMap = {
	    $shebeileixingForm: null,
	 //   $selectOrgDialog: null
	  };

	  var setJqueryMap = function () {
	    jqueryMap.$shebeileixingForm = $('#shebeileixing-form-datas');
	  };

	  var saveShebeileixing = function (callback) {
	    var blockTarget = jqueryMap.$shebeileixingForm.closest(".modal-content");
	    App.blockUI({
	      target: blockTarget,
	      boxed: true,
	      message: '正在保存数据...'
	    });

	    var data = {
	    		text: jqueryMap.$shebeileixingForm.find('input[name="text"]').val(),
	    		parent:configMap.parent,
	    		opened: jqueryMap.$shebeileixingForm.find('input[name="opened"]').val(),	    		      
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
	            container: jqueryMap.$shebeileixingForm.closest(".modal-body"),
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
	          container: jqueryMap.$shebeileixingForm.closest(".modal-body"),
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
	    	 jqueryMap.$shebeileixingForm.find('input[name="bianhao"]').val(data.bianhao);
	    	 jqueryMap.$shebeileixingForm.find('input[name="mingcheng"]').val(data.mingcheng);
	    	 jqueryMap.$shebeileixingForm.find('input[name="mingpai"]').val(data.mingpai);
	    	 jqueryMap.$shebeileixingForm.find('input[name="ranliao"]').val(data.ranliao);
	    	 jqueryMap.$shebeileixingForm.find('input[name="riqi"]').val(data.riqi);
	    	 jqueryMap.$shebeileixingForm.find('input[name="leixing"]').val(data.leixing);
	    	 configMap.$select2.val(data.tingyong).trigger("change");
//	    	 jqueryMap.$shebeileixingForm.find('select[name="tingyong"]').val(data.tingyong);
	    	 jqueryMap.$shebeileixingForm.find('textarea[name="beizhu"]').val(data.beizhu);
	        
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

	  var shebeileixingValidation = function () {
	    jqueryMap.$shebeileixingForm.validate({
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
//	              jqueryMap.$shebeileixingForm.find('input[name=org]').val(result.id);
//	              jqueryMap.$shebeileixingForm.find('[id=btnSelectOrg] span').text(result.text);
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
//	      configMap.path + configMap.setOrgPageUrl + "?orgid=" + jqueryMap.$shebeileixingForm.find(
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
	    init: function (id, parent) {
	      configMap.id = id;
	      configMap.parent = parent;
	      setJqueryMap();
	     // initPlugin();

	      configMap.validationRule = {
	    		  text: {
	          minlength: 2,
	          required: true
	        },
	        opened: {
	          
	          required: true
	        },
	       
	      };

//	      $('#btnSelectOrg', jqueryMap.$shebeileixingForm).off('click').on('click', function () {
//	        selectOrg();
//	      });

	      if (configMap.id) {
	    	  getJizushezhi(configMap.id);
//	        jqueryMap.$shebeileixingForm.find('div[data-type=pwd]').hide();
//	        jqueryMap.$shebeileixingForm.find('input[name=userAccount]').attr('disabled', 'disabled');
	      }

	      shebeileixingValidation();
	    },
	    // 设置路径
	    setPath: function (path) {
	      configMap.path = path;
	    },
	    // 保存雇员信息，参数为回掉函数
	    saveShebeileixing: function (callback) {
	      if (jqueryMap.$shebeileixingForm.valid()) {
	    	  saveShebeileixing(callback);
	      }
	      else {
	        callback(false);
	      }
	    }
	  };

	
})()
//@ sourceURL=shebeileixing_edit.js