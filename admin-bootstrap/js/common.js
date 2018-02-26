/** common.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */
layui.define(['layer'], function(exports) {
	"use strict";
	
	var $ = layui.jquery,
		layer = layui.layer;
//		laydate = layui.laydate;
//		layerTips = parent.layer === undefined ? layui.layer : parent.layer; //获取父窗口的layer对象;

	var common = {
		/**
		 * 抛出一个异常错误信息
		 * @param {String} msg
		 */
		throwError: function(msg) {
			throw new Error(msg);
			return;
		},
		/**
		 * 弹出一个错误提示
		 * @param {String} msg
		 */
		msgError: function(msg) {
			layer.msg(msg, {
				icon: 5
			});
			return;
		}
	};

	exports('common', common);
});


/*ajax弹框函数*/
function layerParent(site, title, width, height, arr, yfn, success,end) {
	//site 获取地址  string
	//title 弹框title  string
	//width 宽 number
	//height 高  number
	//arr 按钮  数组形式 ['提交保存','取消']
	//yfn 提交的函数   可为空
	//nfn 取消的执行函数 可为空
	//success  弹出窗口成功后渲染表单 可为空
	$.get(site, null, function(form) {
		layer.open({
			type: 1,
			title: title,
			content: form,
			btn: arr,
			shade: 0.6,
			offset: ['100px'],
			area: [width + 'px', height + 'px'],
			zIndex: 19950924,
			maxmin: true,
			yes: function(index) {
				//确定事件   有两个参数，索引和DOM对象
				if(yfn){ yfn()}
				closeAllT(); //如果设定了yes回调，需进行手工关闭   closeAllT() 
			},
			success: function(layero, index) {
				if(success){ success()}
			},
			fail: function(msg) { //获取数据失败的回调
				parent.layer.alert('获取数据失败')
			},
			end:function(){
				//无论确定还是取消，只要弹出层被销毁 就执行
				if(end){end()}
			}
			
		});
	});
}

function layAlert(content) {
	//content    string
	layer.closeAll()
	parent.layer.closeAll()
	parent.layer.alert(content)
}
/*页面内弹框*/
function layerContent(title,url,width,height,type) {
	var _type = type ==undefined ? 1 : type;
	layer.open({
		  type: _type,
		  title:title,
		  skin: 'layui-layer-lan', //样式类名
		  anim: 2,
		  offset:['50px'],
		//shade: 0.8,
		  area: [width+'px', height+'px'],
		  shadeClose: true, //开启遮罩关闭
		  content: url,
//		  btn:['开始上传','取消'],
		  closeBtn:1
	});
}
//关闭弹窗
function closeAllT(){
	layer.closeAll()
	parent.layer.closeAll()
}

//增加新的tab页	
function addTab(src,icon,title){
	parent.tab.tabAdd({
                href: src, //地址
                icon: icon,
                title: title
         });
}
//显示文本框
function isDisplayNone(a){
		$('input[name='+a+']').on('ifChecked', function(event){
		 	if($(this).val() == '1'){
		 		$(this).parents('label').siblings('input').show()
		 	}else{
		 		$(this).parents('label').siblings('input').hide()
		 	}
		});
	}