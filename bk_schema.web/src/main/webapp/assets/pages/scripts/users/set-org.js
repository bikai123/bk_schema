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

var setUserOrg = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',
		dataUrl: '/organization/org',
		id: ''
	};

	// 全局Dom
	var jqueryMap = {
		$selectOrgTree: null
	};

	var initOrg = function () {
		jqueryMap.$selectOrgTree.jstree({
			'plugins': ["types"],
			'core': {
				"themes": {
					"responsive": false
				},
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
			}
		});

		jqueryMap.$selectOrgTree.on('loaded.jstree',function(){
			if (configMap.id != '') {
				$('#org_tree').jstree(true).select_node(configMap.id);
			}
		});
	};

	return {
		// 初始化
		init: function (id) {
			jqueryMap.$selectOrgTree = $('#user-manager-orgtreedata');
			configMap.id = id;
			initOrg();
		},
		// 设置路径
		setPath: function (path) {
			configMap.path = path;
		},
		// 保存用户功能权限，参数为回掉函数
		getSelectedOrg: function (callback) {
			var selectedNodeIds = jqueryMap.$selectOrgTree.jstree(true).get_selected();
			if (selectedNodeIds.length > 0) {
				var selectedNode = {
					id: selectedNodeIds[0],
					text: jqueryMap.$selectOrgTree.jstree(true).get_text(selectedNodeIds[0])
				};
				callback(selectedNode);
			}
			else {
				App.alert({
					container: jqueryMap.$selectOrgTree.closest(".modal-body"),
					place: 'prepend',
					type: 'danger',
					message: '请选择一个组织结构！',
					icon: 'fa fa-warning'
				});
			}
		}
	};
}();
//@ sourceURL=users/set-org.js