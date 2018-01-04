
/*跳转新页面*/
function openNewPage(option) {
	var setting = {
		btn: false,
		data: {},
	};
	var pageOption = {
		url: option.url,
		id: option.url.slice(1, option.url.length - 5),
		show: {
			aniShow: 'pop-in',
			duration: '300',
		},
		styles: {
			popGesture: "close"
		},
		extras: option.data,
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
			title: '飞速加载...', //等待对话框上显示的提示内容
		}
	};
	if(option.btn || setting.btn) {
		mui('body').on('tap', option.btn, function() {
			mui.openWindow(pageOption);
			return false;
		});
	} else {
		mui.openWindow(pageOption);
	};
	
};