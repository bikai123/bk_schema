var shebeileixing_list=(function(){
	 'use strict';
	  var configMap = {
			    path: '',
			    dataUrl:'/shebeiliebiao/getAllShebeiliebiao',
			    dataUrlByFenlei:'/shebeiliebiao/getShebeiliebiaosbyfenlei',
			    treeDataUrl: '/shebeifenlei/getAllShebeifenlei',
			    delUrl:'/shebeifenlei/delelteShebeifenlei',
			    dragUrl: '/shebeifenlei/move',
			    currentSelectedNode: null,
			    optType: null,
			    dataGrid:null,
			    editPageUrl:'/machine/machinesetting/shebeileixing/edit.jsp',
			    editBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="edit" data-toggle="tooltip" title="编辑"><i class="fa fa-edit"></i></a>',
				deleteBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="del" data-toggle="tooltip" title="删除"><i class="fa fa-times"></i></a>',
				viewBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="view" data-toggle="tooltip" title="查看"><i class="fa fa-search"></i></a>'			
 		  };

	  var jqueryMap = {
			  
			    $blockTarget: null,
			    $DataTree: null,
			    $container: null,
			    $DataTable:null,
			    $searchDiv:null,
			    $Dialog:null
			  };
	  var setJqueryMap = function () {
		    jqueryMap.$container = $('#shebeileixing-list-container');
		    jqueryMap.$blockTarget = jqueryMap.$container;		  
		    jqueryMap. $DataTree = $('#shebeileixing-list_tree', jqueryMap.$container);
		    jqueryMap.$DataTable=$('#shebeileixing_list_table',jqueryMap.container);	
		    jqueryMap.$searchDiv=$('#shebeileixing-search-div',jqueryMap.container);
		  };
		 var initDataTree=function(){
			 var treeData=[];
			 $.ajax({
					url:configMap.path+configMap.treeDataUrl,
					dataType:'JSON',
				type:'GET',
				success:function(datas){
					treeData=datas;
					jqueryMap.$DataTree.jstree({
						'core' : {
							"themes" : {
								"responsive" : false
							},
							"check_callback" : true,
							'data' :treeData 
						},
						'plugins': ["contextmenu","dnd"],
						"contextmenu": {
					        items: function (o, cb) {
					          var actions = {};
					          actions.create = {
					            "separator_before": false,
					            "separator_after": false,
					            "_disabled": false,
					            "icon": 'fa fa-plus',
					            "label": "新增资源",
					            "action": function (data) {
					              addNewShebeileixing();
					            }
					          };
					          actions.createNext = {
					            "separator_before": false,
					            "separator_after": false,
					            "_disabled": false,
					            "icon": 'fa fa-plus',
					            "label": "新增下级资源",
					            "action": function (data) {
					              addNewNextShebeileixing();
					            }
					          };
					          actions.delete = {
					            "separator_before": false,
					            "separator_after": false,
					            "_disabled": false,
					            "icon": 'fa fa-trash-o',
					            "label": "删除资源",
					            "action": function (data) {
					           	delShebeileixing();
					            }
					          };
					          return actions;//返回右键菜单项
					        }
					      }
					});
					jqueryMap.$DataTree.on('move_node.jstree',function(e,data){
						 $.ajax({
						        url: configMap.path + configMap.dragUrl + "/" + data.node.id + "/" + data.parent + "/"
						        + data.position,
						        type: 'PUT',
						        success: function (result) {

						        },
						        error: function (result) {

						        }
						      });
					});
					 jqueryMap.$DataTree.on('select_node.jstree', function (e, data) {
						 configMap.currentSelectedNode = data.node;
							App.blockUI({
								target:jqueryMap.$blockTarget,
								boxed:true,
								message:'正在加载数据，请稍后。。。'
								
							});
							
							
							$.ajax({
								url:configMap.path+configMap.dataUrlByFenlei+'/'+configMap.currentSelectedNode.id,
								dataType:'JSON',
								type:'GET',
								success:function(datas){
									
								  App.unblockUI(jqueryMap.$blockTarget);
								  configMap.dataGrid.clear().draw();
							       	  if(datas.length>0){
									  return configMap.dataGrid.rows.add(datas).draw();
									  }
								  },
								  error:function(e){
						       alert(JSON.stringify(e));
									  return 	 App.unblockUI(jqueryMap.$blockTarget);
								  }
											
							})
									
						
						
						 
					 });
					   			 
				},
					  
								
				});
				
		 };
		 
		var  addNewShebeileixing=function(){
			var parent=configMap.currentSelectedNode.parent;
			openModal('添加设备类型', configMap.path + configMap.editPageUrl+"?parent="+parent, 'edit',
				      function () {
				shebeileixing_edit.saveShebeileixing(function(result){
					if(result){
						 $.ajax({
								url:configMap.path+configMap.treeDataUrl,
								dataType:'JSON',
							type:'GET',
							success:function(datas){
								jqueryMap.$DataTree.jstree(true).settings.core.data=datas;  
								jqueryMap.$DataTree.jstree(true).refresh();
							}
						 })
						jqueryMap.$Dialog.modal('hide');
					}
					
				});
			});
		};
		var addNewNextShebeileixing=function(){
            
			var parent=configMap.currentSelectedNode.id;
			openModal('添加设备类型', configMap.path + configMap.editPageUrl+"?parent="+parent, 'edit',
				      function () {
				shebeileixing_edit.saveShebeileixing(function(result){
					if(result){
						 $.ajax({
								url:configMap.path+configMap.treeDataUrl,
								dataType:'JSON',
							type:'GET',
							success:function(datas){
								jqueryMap.$DataTree.jstree(true).settings.core.data=datas;  
								jqueryMap.$DataTree.jstree(true).refresh();
							}
						 })
						jqueryMap.$Dialog.modal('hide');
					}
					
				});
			});
		
		};
		var delShebeileixing=function(){

		    if (configMap.currentSelectedNode == null) {
		      Messenger().post({
		        message: '请选择一个资源！',
		        type: 'warning'
		      });
		      return;
		    }if (configMap.currentSelectedNode.children.length > 0) {
		    	
		        Messenger().post({
		            message: '包含下级资源，不能删除！',
		            type: 'warning'
		          });
		        }else{
			   bootbox.dialog({
			        title: '提示',
			        message: '确定要删除该资源？',
			        buttons: {
			          cancel: {
			            label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
			            className: 'btn-default'
			          },
			          success: {
			            label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
			            className: "btn-primary",
			            callback: function () {
			              App.blockUI({
			                target: jqueryMap.$blockTarget,
			                boxed: true,
			                message: '正在删除资源，请稍候...'
			              });

			              $.ajax({
			                url: configMap.path + configMap.delUrl + "/" + configMap.currentSelectedNode.id,
			                type: 'DELETE',
			                success: function (result) {
			                  App.unblockUI(jqueryMap.$blockTarget);
			                  if (result) {
			                    if (configMap.currentSelectedNode != null) {
			                      jqueryMap.$DataTree.jstree(true)
			                        .delete_node(configMap.currentSelectedNode);
			                      if (configMap.currentSelectedNode.parent != '#') {
			                        jqueryMap.$DataTree.jstree(true)
			                          .select_node(configMap.currentSelectedNode.parent);
			                      }
			                      else {
			                        configMap.currentSelectedNode = null;
			                        
			                      }
			                    }
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
			            }
			          }
			        }
			      });
		
		        }			
		}
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
				  "columns":[{"data":"bianma"},
				            {"data":"mingcheng"},
				            {"data":"fenlei"},
				            {"data":"tingyong"},
				            {"data":"beizhu"}, 
				            {"render":function(data,type,row){
				            	 return '<div class="data-center">'
				                 + configMap.editBtn_html		                
				                 + configMap.deleteBtn_html
				                 + configMap.viewBtn_html
				                 + '</div>';;
				             }}
				           ],
			
				
			 
		 })};
		     
			var initData=function(){
				App.blockUI({
					target:jqueryMap.$blockTarget,
					boxed:true,
					message:'正在加载数据，请稍后。。。'
					
				});
				
				 App.unblockUI(jqueryMap.$blockTarget);
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
			var initbtn=function(){
				jqueryMap.$searchDiv.css('overflow','hidden'); 
				jqueryMap.$searchDiv.css('height','0px');		
				$("#shebeileixing-search-btn").click(function(){
					if(jqueryMap.$searchDiv.css('height')=='0px'){
						
						jqueryMap.$searchDiv.animate({height:'60px'},'slow');
						
					}else{
						jqueryMap.$searchDiv.animate({height:'0px'},'slow');
					
					
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
			      jqueryMap.$Dialog = bootbox.dialog({
			        title: title,
			        message: html,
			        buttons: dialogButtons
			      });
			    });
			  };
		
		  return {
			  setPath: function (path) {
			      configMap.path = path;
			    },
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
			    	  initDataTree();
			    	  initDataGrid();
                      initData();
                      initbtn();
			    }
			  
		  }
	
})();
//@ sourceURL=shebeileixing_list.js