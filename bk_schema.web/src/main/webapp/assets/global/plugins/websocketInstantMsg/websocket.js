var socket=(function(){
	var  websocket;
	var input;	
	var win;
	var title="";	
	var output ,dialog ,onlineUser;	
	var  initWebSocket=function(){
		if(window.WebSocket){
			
			websocket=new WebSocket(encodeURI('ws://192.168.8.10:8887'));
			websocket.onopen=function(){
				win.setTitle(title+"&nbsp;&nbsp;(已连接)【开始全局对话】")
				websocket.send('open'+sysuser.name); 
			}
			websocket.onerror=function(){
				win.setTitle(title+"&nbsp;&nbsp;【连接发生错误】")
			}
			websocket.onclose=function(){
				win.setTitle(title+"&nbsp;&nbsp;【已断开连接】")
			}
			websocket.onmessage=function(message){
				 var message=JSON.parse(message.data);
				 if(message.type=='message'){
					 output.receive(message);
					 
				 }  else if(message.type=='get_online_user'){
					 
					 var root=onlineUser.getRootNode();
					 Ext.each(message.list,function(user){
						var node=root.createNode({
							id:user,
							text:user,
							iconCls:"user",
							leaf:true
						});
					 root.appendChild(node);	
						
						 
					 });
					 
				 }
				 else if(message.type=='user_join'){
					 var root=onlineUser.getRootNode();					  
					 var user=message.user;
					 var node=root.createNode({
						 id:user,
						 text:user,
						 iconCls:"user",
						 leaf:true
						 
					 });
				 }
				 
				 else if(message.type=='user_leave'){
					 
					 var root = onlineUser.getRootNode();
					 var user=message.user;
					 var node=root.findChild('id',user);
					 root.removeChild(node);
				 }
			}
			
		}
		
	};
	
	var creatw=function(){
		
		//创建用户输入框
		input = Ext.create('Ext.form.field.HtmlEditor', {
					region : 'south',
					height : 120,
					enableFont : false,
					enableSourceEdit : false,
					enableAlignments : false,
					listeners : {
						initialize : function() {
							Ext.EventManager.on(input.getDoc(), {
										keyup : function(e) {
											if (e.ctrlKey === true
													&& e.keyCode == 13) {
												e.preventDefault();
												e.stopPropagation();
												send();
											}
										}
									});
						}
					}
				});
		
		    
		//创建消息展示容器
		 output = Ext.create('MessageContainer', { 
					region : 'center'
				});

		 dialog = Ext.create('Ext.panel.Panel', {
					region : 'center',
					layout : 'border',
					items : [input, output],
					buttons : [{
								text : '发送',
								handler : send
							}]
				});
		 onlineUser = Ext.create('Ext.tree.Panel', {
			title : '在线用户',
			rootVisible : false,
			region : 'east',
			width : 150,
			lines : false,
			useArrows : true,
			autoScroll : true,
			split : true,
			iconCls : 'user-online',
			store : Ext.create('Ext.data.TreeStore', {
						root : {
							text : '在线用户',
							expanded : true,
							children : []
						}
					})
		});

        title = '欢迎您：';
        //展示窗口
        win = Ext.create('Ext.window.Window', {
			title : title + '&nbsp;&nbsp;(未连接)',
			layout : 'border',
			iconCls : 'user-win',
			minWidth : 650,
			minHeight : 460,
			width : 650,
			animateTarget : 'websocket_button',
			height : 460,
			items : [dialog,onlineUser],
			border : false,
			listeners : {
				render : function() {
					initWebSocket();
				}
			}
		});

        win.show();
        
		
		    
	};
	var send = function() {
		var content = input.getValue();
		var message={};
		if(websocket!=null){
			 message = {
					content : content,
					from : sysuser.name,
					timestamp : new Date().getTime(),
					type:'message'
					
				};
				websocket.send(JSON.stringify(message));
				input.setValue('');
	
			
		} else{
			
			Ext.Msg.alert('提示', '您已经掉线，无法发送消息!');
		}
		
	};
	

	
	
	Ext.define('MessageContainer', {

		extend : 'Ext.view.View',

		trackOver : true,

		multiSelect : false,

		itemCls : 'l-im-message',

		itemSelector : 'div.l-im-message',

		overItemCls : 'l-im-message-over',

		selectedItemCls : 'l-im-message-selected',

		style : {
			overflow : 'auto',
			backgroundColor : '#fff'
		},

		tpl : [
				'<div class="l-im-message-warn">​欢迎使用FH Admin 即时通讯系统。</div>',
				'<tpl for=".">',
				'<div class="l-im-message">',
				'<div class="l-im-message-header l-im-message-header-{source}">{from}  {timestamp}</div>',
				'<div class="l-im-message-body">{content}</div>', '</div>',
				'</tpl>'],

		messages : [],

		initComponent : function() {
			var me = this;
			me.messageModel = Ext.define('Leetop.im.MessageModel', {
						extend : 'Ext.data.Model',
						fields : ['from', 'timestamp', 'content', 'source']
					});
			me.store = Ext.create('Ext.data.Store', {
						model : 'Leetop.im.MessageModel',
						data : me.messages
					});
			me.callParent();
		},

		//将服务器推送的信息展示到页面中
		receive : function(message) {
			var me = this;
			message['timestamp'] = Ext.Date.format(new Date(message['timestamp']),
					'H:i:s');
			if(message.from == sysuser.name){
				message.source = 'self';
			}else{
				message.source = 'remote';
			}
			me.store.add(message);
			if (me.el.dom) {
				me.el.dom.scrollTop = me.el.dom.scrollHeight;
			}
		}
	});
	
	return  {
		
		creatw:function(){
			
			creatw();
		}
		
	}
	
	
	
})();
//@ sourceURL=websocket/socket.js
