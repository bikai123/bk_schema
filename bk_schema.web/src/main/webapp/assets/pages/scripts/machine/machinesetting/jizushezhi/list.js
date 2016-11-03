var jizushezhi_list=(function(){

	'use strict';
	
	//全局属性参数
	var  configMap={
	  	path:'',
	  	dataUrl:'/jizushezhi/getAllJizushezhi',
	  	selectUrl:'/jizushezhi/getJizushezhiBySomething',
	  	deleteUrl:'/jizushezhi/deleteJizushezhi',
	  	editPageUrl:'/machine/machinesetting/jizushezhi/edit.jsp',
	  	viewPageUrl: '/machine/machinesetting/jizushezhi/view.jsp',
	  	uploadUrl:'/jizushezhi/insertJizushezhibyExcel',
	  	tingyongUrl:'/jizushezhi/tingyong/',
		dataGrid:null,
		editBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="edit" data-toggle="tooltip" title="编辑"><i class="fa fa-edit"></i></a>',
		deleteBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="del" data-toggle="tooltip" title="删除"><i class="fa fa-times"></i></a>',
		viewBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="view" data-toggle="tooltip" title="查看"><i class="fa fa-search"></i></a>'			
	    
	};
	
	//全局Dom
	var jqueryMap={
		$container:null,
		$blockTarget:null,
		$DataTable:null,
		$searchDiv:null
			
			
	};
    
	var setJqueryMap=function(){
		
		jqueryMap.$container=$('#jizushzhi-list-container');
		jqueryMap.$blockTarget=jqueryMap.$container;
		jqueryMap.$DataTable=$('#jizushzhi_list_table',jqueryMap.$container);	
		jqueryMap.$searchDiv=$('#jizushzhi-search-div');
		jqueryMap.$exportbyExcelDiv=$('#exportbyExcel-div');
		jqueryMap.$selectExcel=$('#selectExcel',jqueryMap.$exportbyExcelDiv);
	};
	
	var initDataGrid=function(){
		 
	    configMap.dataGrid=jqueryMap.$DataTable.DataTable({
		"dom":'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
		"destory":true,
		"lengthMenu":[10,20,50,100],
		"autoWidth":false,
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
		  "columns":[
		            {"data":"bianhao"},
		            {"data":"mingcheng"},
		            {"data":"mingpai",
		             "render":function(data,type,row){
		            	 return row.mingpai;
		             }},
		            {"data":"ranliao"},
		            {"data":"riqi"},
		            {"data":"leixing"},
		            {"data":"tingyong",
		             "render":function(data,type,row){
		            	 if(row.tingyong==1){
		            		 return '<button type="button" class="btn btn-info"  data-type="islock" >已启用</button>';
		            	 }else{
		            		 return '<button type="button" class="btn btn-danger"  data-type="islock">已停用</button>';
		            	 }
		             }},
		            {"data":"beizhu"},
		            {"render":function(data,type,row){
		            	 return '<div class="data-center">'
		                 + configMap.editBtn_html		                
		                 + configMap.deleteBtn_html
		                 + configMap.viewBtn_html
		                 + '</div>';;
		             }}
		           ],
		    "drawCallback":function(){
		    	  var editContainer = $('[data-type="edit"]', jqueryMap.$DataTable);
		          var delContainer = $('[data-type="del"]', jqueryMap.$DataTable);
		          var viewContainer = $('[data-type="view"]', jqueryMap.$DataTable);
		          var islockContainer=$('[data-type="islock"]', jqueryMap.$DataTable);
		         
		      	if(islockContainer.length>0){
		      		islockContainer.off('click')
		              .on('click',tingyongJizushezhi);
		      	};
		    
		    	if(editContainer.length>0){

		            editContainer.off('click')
		              .on('click', editJizushezhi);
		          		    		
		    	}
		    	if(delContainer.length>0){
		            delContainer.confirmation({
		                "title": '是否确定要删除用户？',
		                "btnOkLabel": '是',
		                "btnCancelLabel": '否',
		                "placement": 'left',
		                "onConfirm": delJizushezhi
		              });
		            }
		    	   if (viewContainer.length > 0) {
		               viewContainer.off('click')
		                 .on('click', viewJizushezhi);
		             }
		    	
		    	
		    }
	
		})
	
	};
	var initData=function(){
		App.blockUI({
			target:jqueryMap.$blockTarget,
			boxed:true,
			message:'正在加载数据，请稍后。。。'
			
		});

		$.ajax({
			url:configMap.path+configMap.dataUrl,
			dataType:'JSON',
			type:'GET',
			success:function(datas){
				
			  App.unblockUI(jqueryMap.$blockTarget);
			  configMap.dataGrid.clear().draw();
		       	  if(datas.length>0){
				  return configMap.dataGrid.rows.add(datas).draw();
				  }
			  },
			  error:function(){
	
				  return 	 App.unblockUI(jqueryMap.$blockTarget);
			  }
						
		})
				
	};
	
	var gaojichaxun=function(){
		var mingcheng=$('#mingcheng',jqueryMap.$searchDiv).val();
		var leixing=$('#leixing',jqueryMap.$searchDiv).val();
		
		var data={
				'mingcheng':mingcheng,
				'leixing': leixing,
		};
		 App.blockUI({
		      target: jqueryMap.$blockTarget,
		      boxed: true,
		      message: '正在查询数据，请稍候...'
		    });
	    $.ajax({
	        url: configMap.path + configMap.selectUrl,
	        type: 'POST',
	        data: JSON.stringify(data),
	        contentType: 'application/json; charset=utf-8',
	        success: function (result) {
	          App.unblockUI(jqueryMap.$blockTarget);
	          configMap.dataGrid.clear().draw();
	          configMap.dataGrid.rows.add(result).draw();
	        },
	        error: function (e) {
	        	alert(JSON.stringify(e));
	          App.unblockUI(jqueryMap.$blockTarget);
	        
	          Messenger().post({
	            message: '查询失败！',
	            type: 'error'
	          });
	        }
	      });
	};
	
	var initexcelupload=function(){
		 jqueryMap.$selectExcel.fileinput({	    
			    language: 'zh', //设置语言
		        uploadUrl: configMap.uploadUrl , //上传的地址
		        allowedFileExtensions: ['xls','xlsx'],//接收的文件后缀
		        showUpload: true, //是否显示上传按钮
		        showCaption: false,//是否显示标题
		        browseClass: "btn btn-primary", //按钮样式     
		        dropZoneEnabled: true,//是否显示拖拽区域
		        //minImageWidth: 50, //图片的最小宽度
		        //minImageHeight: 50,//图片的最小高度
		        //maxImageWidth: 1000,//图片的最大宽度
		        //maxImageHeight: 1000,//图片的最大高度
		        //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
		        //minFileCount: 0,
		        maxFileCount: 1, //表示允许同时上传的最大文件个数
		        enctype: 'multipart/form-data',
		        validateInitialCount:true,
		        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
		        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
    });	
		 jqueryMap.$selectExcel.on("fileuploaded", function(event, data, previewId, index) {
			  jqueryMap.$exportbyExcelDiv.animate({height:'0px'},'slow');
			  initData();
			
		  });
	}
	
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
	var addJizushezhi=function(){
		

	    openModal('添加机组', configMap.path + configMap.editPageUrl, 'edit',
	      function () {
	    	jizushezhi_edit.saveJizushezhi(function (result) {
	          if (result) {
 	            initData();
	            jqueryMap.$usersDialog.modal('hide');
	          }
	        });
	      });
	  
	};
    var editJizushezhi=function(){
	var el=$(this);
	var rowIndex=	configMap.dataGrid.cell(el.closest('td')).index().row;
	var guid=configMap.dataGrid.row(rowIndex).data().guid;
	 openModal('编辑机组', configMap.path + configMap.editPageUrl+'?id='+encodeURI(guid), 'edit',
		      function () {
		    	jizushezhi_edit.saveJizushezhi(function (result) {
		          if (result) {
	 	            initData();
		            jqueryMap.$usersDialog.modal('hide');
		          }
		        });
		      });
		
	};
	
	var delJizushezhi=function(event, element){
		 App.blockUI({
		      target: jqueryMap.$blockTarget,
		      boxed: true,
		      message: '正在删除数据，请稍候...'
		    });
			var rowIndex=	configMap.dataGrid.cell(element.closest('td')).index().row;
			var guid=configMap.dataGrid.row(rowIndex).data().guid;
		    $.ajax({
		        url: configMap.path + configMap.deleteUrl + "/" + guid,
		        type: 'DELETE',
		        success: function (result) {
		          App.unblockUI(jqueryMap.$blockTarget);
		          if (result) {
		        	  initData();
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
	
	var viewJizushezhi=function(){

	var el=$(this);
	var rowIndex=	configMap.dataGrid.cell(el.closest('td')).index().row;
	var guid=configMap.dataGrid.row(rowIndex).data().guid;
	 openModal('查看机组信息', configMap.path + configMap.viewPageUrl+'?id='+encodeURI(guid), 'view');
		
	
	};
	var tingyongJizushezhi=function(){
	var el=$(this);
	var rowIndex=	configMap.dataGrid.cell(el.closest('td')).index().row;
	var guid=configMap.dataGrid.row(rowIndex).data().guid;
  	  var tingyong=1,btnclass='btn btn-info',text='已启用';
  	  if($(this).attr("class")=="btn btn-info"){
  		  tingyong=2;
  		  btnclass='btn btn-danger';
  		  text='已停用';
  	  }
		$.ajax({
			url:configMap.path+configMap.tingyongUrl+guid+'&&'+tingyong,			
			type:'GET',
			success:function(datas){							 		       	  
			  },
			 		        			  		  				
		})
		$(this).attr("class",btnclass);
		$(this).text(text);
  	 		            	  
    
		
	}
	var initbtn=function(){
		   $('#searchFilter_jizushezhi', jqueryMap.$container).on('keyup', function () {
		        configMap.dataGrid.search(this.value).draw();
		      });
		
		 $('#newjizushezhi', jqueryMap.$container).off().on('click', function () {
		        addJizushezhi();
		      });
		 $('#chaxun', jqueryMap.$searchDiv).off().on('click', function () {
			 gaojichaxun();
		      });
		 
		
		//jqueryMap.$searchDiv.hide();	     
		jqueryMap.$searchDiv.css('overflow','hidden');
		jqueryMap.$searchDiv.css('height','0px');		
		$("#jizushzhi-search-btn").click(function(){
			if(jqueryMap.$searchDiv.css('height')=='0px'){
				
				jqueryMap.$searchDiv.animate({height:'70px'},'slow');
				//jqueryMap.$searchDiv.show();	
			}else{
			
				jqueryMap.$searchDiv.animate({height:'0px'},'slow');
				//jqueryMap.$searchDiv.hide();
			
			}
			
			
		});
		jqueryMap.$exportbyExcelDiv.css('overflow','hidden');
		jqueryMap.$exportbyExcelDiv.css('height','0px');
		$("#exportbyExcel").click(function(){

			if(jqueryMap.$exportbyExcelDiv.css('height')=='0px'){
				
				jqueryMap.$exportbyExcelDiv.animate({height:'300px'},'slow');
				//jqueryMap.$searchDiv.show();	
			}else{
			
				jqueryMap.$exportbyExcelDiv.animate({height:'0px'},'slow');
				//jqueryMap.$searchDiv.hide();	
			}
			   		 
		});
		
	}
	return {
		init:function(){
		
			setJqueryMap();
			initDataGrid();			
			initData();
			initexcelupload()			
			initbtn();
		
		},
		setPath: function (path) {
		      configMap.path = path;
		    }	
	}	
})();
//@ sourceURL=jizushezhi_list.js