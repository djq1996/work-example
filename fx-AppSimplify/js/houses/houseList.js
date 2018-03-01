window.onload = function() {
	var ids = localStorage.getItem('userId'),
		SeeLevel = localStorage.getItem('SeeLevel'),
		depId = localStorage.getItem('depId'),
		page = 1,
		size = 10;
	mui.init({});
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	//加载时渲染数据GET
	housesList();

	function housesList() {
		mui.ajax(baseUrl + 'API_Responsible/GetGardenStageData?userid=' + ids + '&dataType=' + SeeLevel + '&deptId=' + depId + '&PageIndex=' + page + '&PageSize=' + size, {
			"dataType": 'json',
			"type": 'get',
			success: function(data) {
				if(data.succ && data.results != null) {
					var str = '';
					for(var i = 0; i < data.results.length; i++) {
						str += '<li class="mui-table-view-cell" id="tolou">' +
							'<a class="mui-navigate-right">' +
							'<span class="name" data-id=' + data.results[i].GardenSID + '>' + data.results[i].StageName + '</span>' +
							'<span class="mui-badge mui-badge-inverted num">总共<i>' + data.results[i].con + '</i>户</span>' +
							'</a></li>'
					};
					$('.noinfo').hide();
					$('.noinfoImg').hide();
					$('#default #lou').append(str);
				} else {
					if(data.count === 0) {
						$('.noinfo').hide();
						$('.noinfoImg').show();
					} else if(data.count != 0) {
						$('.noinfoImg').hide();
						$('.noinfo').show();
						setTimeout(function() {
							$('.noinfo').fadeOut();
						}, 1500);
					}
				};
			},
			error: function(xhr, error, b) {
				console.log(error);
			}
		});
	};
	//搜索历史纪录添加
	var houses_history = [];
	$('.resultBox').on("tap", '.mui-table-view-cell a', function() {
		var _txt = $(this).text().trim();
		$(".searchI").text(_txt);
		$('#search input[type=search]').val('');
		houses_history.push({
			text: _txt
		});
		localStorage.setItem('houses_history', JSON.stringify(houses_history));
		//删除子节点
		$('.historyBox .mui-table-view .mui-table-view-cell').remove();
		for(var i = 0; i < JSON.parse(localStorage.getItem('houses_history')).length; i++) {
			var historyStr = '<li class="mui-table-view-cell">';
			historyStr += '<a class="mui-navigate-right">' + JSON.parse(localStorage.getItem('houses_history'))[i].text + '</a></li>';
			mui('.historyBox .mui-table-view')[0].insertAdjacentHTML('beforeend', historyStr);
		}
		setTimeout(function() {
			viewApi.back();
		}, 250)
	});
	$('.historyBox').on("tap", ' .mui-table-view-cell a', function() {
		var _txt = $(this).text().trim();
		$('#search input[type=search]').val('');
		$(".searchI").text(_txt);
		setTimeout(function() {
			viewApi.back();
		}, 250)
	});
	//页面跳转时清空搜索条件
	$('.search_middle').on('tap', 'a[href="#search"]', function() {
		if($('#search input[type=search]').val() == "") {
			$('#search .historyBox').show();
			$('#search .resultBox').hide();
		} else {
			$('#search .historyBox').hide();
			$('#search .resultBox').show();
		}
		var table = document.body.querySelector('.resultBox .mui-table-view');
		while(table.hasChildNodes()) //当table下还存在子节点时 循环继续
		{
			table.removeChild(table.firstChild);
		}
	});
	//搜索页输入时
	$('#search input[type=search]').on('blur', function() {
		if($(this).val() == "") {
			$('#search .historyBox').show();
			$('#search .resultBox').hide();
		} else {
			$('#search .historyBox').hide();
			$('#search .resultBox').show();
		}
		$('.resultBox .mui-table-view .mui-table-view-cell').remove();
		var searchtext = $(this).val();
		mui.ajax(baseUrl + 'API_Responsible/GetGardenStageData?userId=' + ids + '&dataType=' + SeeLevel + '&deptId=' + depId + '&GsName=' + searchtext + '&PageIndex=1&PageSize=1', {
			dataType: 'json',
			type: 'get',
			success: function(data) {
				if(data.succ && 　data.results != null) {
					for(var i = 0; i < data.results.length; i++) {
						var str = '<li class="mui-table-view-cell">';
						str += '<a class="mui-navigate-right">' + data.results[i].StageName + '</a></li>';
						mui('.resultBox .mui-table-view')[0].insertAdjacentHTML('beforeend', str);
					}
				} else {
					mui.toast('暂时无此数据');
				}
			}
		});
	});
	//点击搜索结果清空列表数据
	$('.resultBox').on('tap', '.mui-table-view-cell', function() {
		searchResult = $(this).text();
		$('.contBox .mui-table-view').empty();
		mui.ajax(baseUrl + 'API_Responsible/GetGardenStageData?userId=' + ids + '&dataType=' + SeeLevel + '&deptId=' + depId + '&GsName=' + searchResult + '&PageIndex=' + page + '&PageSize=' + size, {
			dataType: 'json',
			type: 'get',
			success: function(data) {
				if(data.succ && data.results != null) {
					for(var i = 0; i < data.results.length; i++) {
						var str = '<li class="mui-table-view-cell" id="tolou">';
						str += '<a class="mui-navigate-right">';
						str += '<span class="name" data-id=' + data.results[i].GardenSID + '>' + data.results[i].StageName + '</span>';
						str += '<span class="mui-badge mui-badge-inverted num">总共<i>' + data.results[i].con + '</i>户</span>';
						str += '</a></li>';
					}
					$('.noinfo').hide();
					$('.noinfoImg').hide();
					$('#default #lou').append(str);
				} else {
					if(data.count === 0) {
						$('.noinfo').hide();
						$('.noinfoImg').show();
					} else if(data.count != 0) {
						$('.noinfoImg').hide();
						$('.noinfo').show();
					}
				}
			},
			error: function(xhr, error, b) {
				console.log(error)
			}
		});
	});
	//点击搜索进入页面让里面的搜索框获得焦点
	$('.searchI').on('tap', function() {
		setTimeout(function() {
			$('#searchInput').focus();
		}, 100);
	});
	//点击跳转页面
	mui('body').on('tap', '#tolou', function() {
		$('#default input[type=search]').val('');
		var houses = mui.openWindow({
			url: 'housesLou.html',
			id: 'house-lou',
			show: {
				aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
				duration: '300' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			},
			styles: {
				popGesture: "close"
			},
			extras: {
				name: $(this).find('.name').text(),
				gardenSID: $(this).find('.name').attr('data-id')
			}
		});
	});
	//初始化单页view
	var viewApi = mui('#app').view({
		defaultPage: '#default'
	});
	var view = viewApi.view;
	(function($) {
		//处理view的后退与webview后退
		var oldBack = $.back;
		$.back = function() {
			if(viewApi.canBack()) { //如果view可以后退，则执行view的后退
				viewApi.back();
			} else { //执行webview后退
				oldBack();
			}
		};
		//监听页面切换事件方案1,通过view元素监听所有页面切换事件，目前提供pageBeforeShow|pageShow|pageBeforeBack|pageBack四种事件(before事件为动画开始前触发)
		//第一个参数为事件名称，第二个参数为事件回调，其中e.detail.page为当前页面的html对象
		view.addEventListener('pageBeforeShow', function(e) {
			//				console.log(e.detail.page.id + ' beforeShow');
		});
		view.addEventListener('pageShow', function(e) {
			//				console.log(e.detail.page.id + ' show');
		});
		view.addEventListener('pageBeforeBack', function(e) {
			//				console.log(e.detail.page.id + ' beforeBack');
		});
		view.addEventListener('pageBack', function(e) {
			//				console.log(e.detail.page.id + ' back');
		});
	})(mui);
	//列表上拉加载，下拉刷新
	mui('.contBox .mui-scroll-wrapper').pullRefresh({
		down: {
			callback: function() {
				setTimeout(function() {
					mui('.contBox .mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
					$('#default .mui-table-view').empty();
					page = 1;
					size = 10;
					housesList();
					mui.toast("刷新成功");
				}, 1500);
			}
		},
		up: {
			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: function() {
				setTimeout(function() {
					page++;
					housesList();
					mui('.contBox .mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
				}, 1500);
			}
		}
	});
};