/*layer 封装*/

function Layer() {};

Layer.prototype = {

	toplayer: window.top.layer, // 获取顶层窗口的layer对象
	topWin: window.top, // 获取顶层窗口对象
	colseTime: 1000, // 关闭弹出框的默认时间 1S
	width: '800px', // 默认窗口的宽度
	height: '600px', // 默认窗口的高度
	px: 'px', // 对话框宽高单位
	/**
	 * 警告框
	 * @param {} content    警示的内容
	 */
	showAlert: function(content) {
		this.toplayer.alert(content, {
			icon: 0
		});
	},
	/**
	 * 操作成功提示框
	 * @param {} content    提示内容  默认：操作成功
	 * @param {} callback    回调方法
	 */
	showSucAlert: function(content, callback) {
		var length = arguments.length; //  实际传入参数的长度
		var options = {
			icon: 1,
			time: this.colseTime
		};
		if(length == 0) { // 没有传入任何参数
			this.toplayer.alert("操作成功", options);
		} else if(length == 1) { // 传入了提示内容
			this.toplayer.alert(content, options);
		} else if(length == 2) { // 有回调函数的,将不自动关闭
			this.toplayer.alert(content, {
				icon: 1
			}, callback);
		}
	},
	/**
	 * 操作失败提示框
	 * @param {} content    提示内容 默认：操作失败
	 * @param {} time       关闭时间(单位毫秒) 默认：1S,0:表示不自动关闭  
	 */
	showFailAlert: function(content, time) {
		var length = arguments.length; //  实际传入参数的长度
		var options = {
			icon: 2,
			time: this.colseTime
		};
		if(length == 0) { // 没有传入任何参数
			this.toplayer.alert("操作失败", options);
		} else if(length == 1) { // 传入了提示内容
			this.toplayer.alert(content, options);
		} else if(length == 2) { // 传入了关闭时间
			options.time = time;
			this.toplayer.alert(content, options);
		}
	},
	/**
	 * 打开一个对话框iframe(没有回调函数)
	 * @param {} title       对话框标题(必须)
	 * @param {} url        对话框URL(必须)
	 * @param {} width        对话框宽度 默认：800px
	 * @param {} height        对话框高低 默认：600px
	 */
	openDialogNoCallBack: function(title, url, width, height) {
		this.toplayer.open({
			type: 2,
			title: title,
			content: url,
			maxmin: true,
			area: [width, height]
		});
	},

	/**
	 * 打开一个对话框(带回调函数)(内容为iframe url的  type 不同)
	 * @param {} title       对话框标题(必须)
	 * @param {} url        对话框URL(必须)
	 * @param {} width        对话框宽度 默认：800px
	 * @param {} height        对话框高低 默认：600px
	 */
	openDialogWithCallBackAndIframe: function(title, url, width, height, callback) {
		this.toplayer.open({
			type: 2,
			title: title,
			content: url,
			area: [width, height],
			maxmin: true,
			end: callback
		});
	},
	/**
	 * 打开一个对话框(没有回调函数)
	 * @param {} title       对话框标题(必须)
	 * @param {} url        对话框URL(必须)
	 * @param {} width        对话框宽度 默认：800px
	 * @param {} height        对话框高低 默认：600px
	 * @param {} callback   窗口销毁时的回调方法
	 */
	openDialog: function(title, url, width, height, callback) {
		var length = arguments.length; //  实际传入参数的长度
		if(length == 2) { // 默认宽高
			this.openDialogNoCallBack(title, url, this.width, this.height)
		} else if(length == 3) { // 只传入宽度参数
			width += this.px;
			this.openDialogNoCallBack(title, url, width, this.height)
		} else if(length == 4) { // 传入宽度和高度
			width += this.px;
			height += this.px;
			this.openDialogNoCallBack(title, url, width, height)
		} else if(length == 5) { // 带回调函数
			width += this.px;
			height += this.px;
			this.openDialogWithCallBackAndIframe(title, url, width, height, callback);
		}
	},
	/**********************************上面是iframe 下面是DOM **********************************************/
	/**
	 * 打开一个对话框DOM(没有回调函数)
	 * @param {} title       对话框标题(必须)
	 * @param {} url        对话框URL(必须)
	 * @param {} width        对话框宽度 默认：800px
	 * @param {} height        对话框高低 默认：600px
	 */
	openDomNoCallBack: function(title, DOM, width, height) {
		this.toplayer.open({
			type: 1,
			title: title,
			content: DOM,
			maxmin: true,
			area: [width, height]
		});
	},
	/**
	 * 打开一个对话框(带回调函数)(内容为div dom，type不同)
	 * @param {} title       对话框标题(必须)
	 * @param {} dom        对话框dom 例如$("#app") (必须)
	 * @param {} width        对话框宽度 默认：800px
	 * @param {} height        对话框高低 默认：600px
	 */
	openDialogWithCallBackAndDom: function(title, dom, width, height, callback) {
		this.toplayer.open({
			type: 1,
			title: title,
			content: dom,
			area: [width, height],
			maxmin: true,
			end: callback
		});
	},
	/**
	 * 打开一个对话框(没有回调函数)
	 * @param {} title       对话框标题(必须)
	 * @param {} dom        对话框dom(必须) 例如$("#content")
	 * @param {} width        对话框宽度 默认：800px
	 * @param {} height        对话框高低 默认：600px
	 * @param {} callback   窗口销毁时的回调方法
	 */
	openDom: function(title, dom, width, height, callback) {
		var length = arguments.length; //  实际传入参数的长度
		if(length == 2) { // 默认宽高
			this.openDomNoCallBack(title, dom, this.width, this.height)
		} else if(length == 3) { // 只传入宽度参数
			width += this.px;
			this.openDomNoCallBack(title, dom, width, this.height)
		} else if(length == 4) { // 传入宽度和高度
			width += this.px;
			height += this.px;
			this.openDomNoCallBack(title, dom, width, height)
		} else if(length == 5) { // 带回调函数
			width += this.px;
			height += this.px;
			this.openDialogWithCallBackAndDom(title, dom, width, height, callback);
		}
	},
	/**
	 * 显示提示框
	 * @param {} content 
	 */
	showMsg: function(content) {
		this.toplayer.msg(content, {
			time: this.colseTime
		});
	},
	/**
	 * 显示操作成功的提示框
	 * @param {} content
	 */
	showSucMsg: function(content) {
		if(!content) content = "操作成功";
		this.toplayer.msg(content, {
			icon: 1,
			time: this.colseTime
		});
	},
	/**
	 * 显示确认验证框
	 * @param {} content   提示内容
	 * @param {} yesFunction 确定以后的回调函数
	 */
	showConfirm: function(content, yesFunction) {
		this.toplayer.confirm(content, {

			btn: ['确定', '取消'],
			icon: 3
		}, yesFunction);
	},
	/**
	 * 显示加载框
	 * @param {} content   提示内容
	 * @param {} isLong 等待时间  1000： 1后关闭   0：为不关闭（必选）
	 */
	showLoading: function(content, isLong) {
		var index = this.toplayer.msg(content, {
			icon: 16,
			shade: .2,
			time: isLong
		});
		return index;
	},
	/**
	 * 关闭弹出层
	 * @param {} index 例如 var index = parent.layer.msg('加载中', {});
	 */
	closeLayer: function(index) {
		this.toplayer.close(index);
	},
	/**
	 * 关闭已经打开的全部弹出层
	 * @param {} index 例如 var index = parent.layer.msg('加载中', {});
	 */
	closeAllLayer: function() {
		this.toplayer.closeAll();
	},

};

var Layer = new Layer();


/*文本框限制非法字符*/
$(document).on({
	keyup: function(){
		this.value = this.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'');
	},
	change: function(){
		this.value = this.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'');
	},
	blur: function(){
		this.value = this.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'');
	}
},'.limit');

