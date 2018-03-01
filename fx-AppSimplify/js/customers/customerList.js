var uId = parseInt(localStorage.getItem('userId'));
//mui.toast('登录人ID'+uId);
/*ajax data 上传*/
var MyCustomerSource = {
		pageSize: 8,
		PageIndex: 1,
		Perid: uId,
		BuyOrRent: 1,
	},
	getData = null,
	defaultSource = 'MyCustomerSource',
	CustomerPhoneList = {},
	parameter,
	iscollect = false,
	customerLevelIndex = 1;

/*加载列表数据*/
loadList({isRent: false});
function loadList(setting) {
//	console.log('字典值更多'+JSON.stringify(MyCustomerSource))
	var defaults = {
			isClear: true,
			isRent: true
		};
	var obj = $.extend({}, defaults, setting);
	
	if(obj.isClear) {
		$("#customerList").empty()
	};
	mui.ajax(baseUrl + 'API_Customer/' + defaultSource, {
		type: 'post',
		data: MyCustomerSource,
		success: function(data, type, status) {
			console.log(JSON.stringify(MyCustomerSource));
//			console.log('客户列表数据'+JSON.stringify(data.results));
			mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(data.results == null);
			if(data.succ && data.results != null) {
				mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
				//				console.log(JSON.stringify(data.results[0]))
				/*获取列表信息*/
				var i = 0,
					custListHtml = '',
					LevelStyle,
					Level,
					HouseForward,
					JGTime,
					AddTime;
				getData = data.results;
				for(i = 0; i < getData.length; i++) {
					//console.log(fangxiang(getData[i].HouseForward))
					if(obj.isRent) {
						LevelStyle = escape({
							type: 'LevelClass',
							value: getData[i].RentLevel
						});
						Level = escape({
							type: 'LevelText',
							value: getData[i].RentLevel
						});
						PriceStart = getData[i].RentPriceStart;
						PriceEnd = getData[i].RentPriceEnd + '元'

					} else {
						LevelStyle = escape({
							type: 'LevelClass',
							value: getData[i].BuyLevel
						});
						Level = escape({
							type: 'LevelText',
							value: getData[i].BuyLevel
						});
						PriceStart = getData[i].PriceStart;
						PriceEnd = getData[i].PriceEnd + '万'
					}

					HouseForward = escape({
						type: 'HouseForwardType',
						value: getData[i].HouseForward
					});

					AddTime = fmtDate(getData[i].AddTime);
					JGTime = fmtDate(getData[i].JGTime);
					//console.log(LevelClass(getData[i].RentLevel))
					custListHtml += '<li class="mui-table-view-cell" data-id=' + getData[i].CustomerID + ' data-RowNum=' + getData[i].row_number + '>' +
						'<div class="mui-row">' +
						'<div class="mui-col-xs-9 title">' +
						'<h4 class="mui-ellipsis">' +
						'<p class="name">' + getData[i].CustomerName + '</p>' +
						'<span class="pf">' +
						'<i class="' + LevelStyle + '">' + Level + '</i>' +
						'</span>' +
						'</h4>' +
						'</div>' +
						'<div class="btnbox">' +
						'<span class="update mui-icon mui-icon-compose mui-badge-primary mui-badge-inverted" data-level=' + Level + ' data-name=' + getData[i].CustomerName + '></span>' +
						'<span class="phones mui-icon mui-icon-phone mui-badge-primary mui-badge-inverted"></span>' +
						'</div>' +
						'</div>' +
						'<div class="mui-row">' +
						'<div class="mui-col-xs-12">' +
						'<h6 class="hosing-detail">' +
						'<div class="ju"><img src="../../img/customers/hux.png"/><span>' + getData[i].SleepRoom + '-' + getData[i].Parlour + '居</span></div>' +
						'<div class="pm"><img src="../../img/customers/mj.png"/><span>' + getData[i].HouseAreaStart + '-' + getData[i].HouseAreaEnd + ' ㎡</span></div>' +
						'<div class="wan"><img src="../../img/customers/money.png"/><span>' + PriceStart + '-' + PriceEnd + '</span></div>' +
						'<div class="cx"><img src="../../img/customers/fx.png"/><span> ' + HouseForward + ' </span></div>' +
						'</h6>' +
						'</div>' +
						'</div>' +
						'<div class="mui-row mui-h6">' +
						'<span class="mui-col-xs-6">开发时间：' + AddTime + '</span>' +
						'<span class="mui-col-xs-6">最近跟进：' + JGTime + '</span>' +
						'</div>' +
						'</li>'
				};
				$('#customerList').append(custListHtml);
//				mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
				$(".noinfoImg").hide();
				$(".mui-pull").show();
				//mui.toast('数据列表'+data.msg)
				//console.log('数据列表'+JSON.stringify(MyCustomerSource))
				/*获取联系人信息*/
				//_this.$data.CustomerPhoneList = data.results.CustomerPhoneList;
			} else {
				/*暂无数据*/
				
				if($("#customerList li").length == 0) {
					$(".noinfoImg").show();
					$(".mui-pull").hide();
				} else {
					$(".mui-pull").show();
				}
			}
		},
		error: function(xht, type, cont) {
			mui.toast('数据列表' + type + '--' + cont)
		}
	});
};
mui.init();
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.001 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
var self;
mui.plusReady(function() {
	self = plus.webview.currentWebview();
	/*打电话*/
	$('#customerList').on('tap', '.phones', function() {
		//	mui.toast($(this).attr('data-id'))
		mui.ajax(baseUrl + 'API_Customer/GetCustomerPhones?CustomerID=' + $(this).parents('li').attr('data-id'), {
			type: 'post',
			success: function(data) {
				if(data.succ) {
					if(data.results.length == 1) {
						plus.device.dial(data.results[0]._contactphone, false);
					} else if(data.results.length >= 1) {
						var phonelist = [],
							i;
						for(i = 0; i < data.results.length; i++) {
							var obj = {};
							obj.title = data.results[i]._contactphone;
							phonelist.push(obj)

						}
						plus.nativeUI.actionSheet({
							title: "选择要拨打的电话",
							cancel: "取消",
							buttons: phonelist
						}, function(e) {
							plus.device.dial(phonelist[e.index - 1].title, false);
						});
					}
				}
			},
			error: function() {
				mui.toast(跟进 + '保存失败')
			}
		});
		return false
	});
});

/*求租-求购*/
$(".rent-purchase a").on('tap', function() {
	mui('.mui-scroll-wrapper').pullRefresh().refresh();
	/*重置租赁买卖搜索条件和文字*/
	defaultSource = 'MyCustomerSource',
	MyCustomerSource = {
		pageSize: 8,
		PageIndex: 1,
		Perid: uId,
		BuyOrRent: 1,
	};
	$('.sText1').text('我的客源');
	$('.sText2').text('价格');
	$('.sText3').text('居室');
	/*变换样式*/
	$(this).addClass("active").siblings().removeClass("active");
	//plus.navigator.setStatusBarStyle('black');
	/*判断求租或求购*/
	MyCustomerSource.BuyOrRent = parseInt($(this).attr('data-type'));
	
	MyCustomerSource.PageIndex = 1;
	/*加载列表数据*/
	if(MyCustomerSource.BuyOrRent == 2) {
		loadList();
	} else {
		loadList({
			isRent: false
		});
	};
	/*重置下拉刷新 和 滚动到顶部*/
	mui('.mui-scroll-wrapper').scroll().setTranslate(0,0)
	console.log(JSON.stringify(MyCustomerSource))
	/*字典值*/
	loadDic();
});

//列表上拉加载，下拉刷新
mui('.mui-scroll-wrapper').pullRefresh({
	down: {
		callback: function() {
			MyCustomerSource.PageIndex = 1;
			mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
			setTimeout(function() {
				if(MyCustomerSource.BuyOrRent == 2) {
					loadList({});
				} else {
					loadList({
						isRent: false,
					});
				};
				mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
			}, 1500)
			console.log('上拉')
		}
	},
	up: {
		contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
		contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
		callback: function() {
			MyCustomerSource.PageIndex++;
			setTimeout(function() {
				if(MyCustomerSource.BuyOrRent == 2) {
					loadList({
						isClear: false
					});
				} else {
					loadList({
						isRent: false,
						isClear: false
					});
				};
			}, 1000)
			//				console.log(MyCustomerSource.PageIndex)
			//				mui.toast("加载成功");
		}
	}
});

/*详情页*/
$('#customerList').on('tap', '.mui-table-view-cell', function() {
	//	mui.toast()
	MyCustomerSource.RowNum = parseInt($(this).attr('data-RowNum'));
	delete MyCustomerSource.pageSize;
	delete MyCustomerSource.PageIndex;
	openNewPage({
		url: '_www/html/myCustomers/customersDetails.html',
		data: {
			info: MyCustomerSource,
			iscollect: iscollect
		}
	});
});
/*添加客户*/
$('#inAddCus').on('tap', function(e) {
	openNewPage({
		url: '_www/html/myCustomers/addCus.html',
		data: {
			BuyOrRent: MyCustomerSource.BuyOrRent,
			uid: uId
		}
	});
	return false;
});

/*进入跟进*/
$('#customerList').on('tap', '.update', function(e) {
	//	console.log($(this).index())
	openNewPage({
		url: '_www/html/myCustomers/addFollowUp.html',
		data: {
			CustomerId: $(this).parents('li').attr('data-id'),
			BuyOrRent: MyCustomerSource.BuyOrRent,
			CustomerName: $(this).attr('data-name'),
			Customerlevel: $(this).attr('data-level')
		}
	});
	return false;
});

/*打开侧滑菜单*/
$(document).ready(function() {
	ReadyMorePage('offcanvasMore.html', 'houselistMore');
	/*打开侧滑*/
	document.getElementById("show-btn").addEventListener('tap', openMenu);
	/*清除更多参数*/
	var arr = ['fitmentType', 'LevelType', 'Area', 'OrienTation'];
	for(var i = 0; i < arr.length; i++) {
		delete MyCustomerSource[arr[i]];
	};

	//	console.log(JSON.stringify(plus.webview.currentWebview()))
})

/*筛选条件*/
$(".cutomerFilter > ul > li").on('click', function() {
	$('.bg').hide();
	$('.cutomerFilterName').slideUp();
	$('.cutomerFilter a').removeClass('active');
	$(".customerSerach input").removeAttr('readonly');
	if($(this).find('.cutomerFilterName').css('display') == 'none') {
		$(this).find('a').addClass('active');
		$(this).find('.cutomerFilterName').slideDown();
		$('.bg').css({
			"top": ($(this).offset().top + 41)
		}).show();
		$(".customerSerach input").attr('readonly')
	}
	//				return false
});

$('.moneyZ').on('tap', function() {
	return false;
});
$('.moneyZ button').on('tap', function() {
	$('.cutomerFilterName').slideUp();
	$('.bg').hide()
})

$('.bg').on('tap', function() {
	$(this).slideUp()
	$('.cutomerFilterName').hide();
});

/*加载数据字典*/
loadDic()

function loadDic() {
	mui.ajax(baseUrl + 'API_Dictionary/AllDic', {
		type: 'post',
		success: function(data, type, status) {
			if(data.succ) {
//				console.log(JSON.stringify(data.results));
				//mui.toast('数据字典')
				/*获取列表信息*/
				var i = 0,
					sourceHtml = '',
					PriceHtml = '',
					SleepRoomHtml = '',
					CustomerSourceType = null,
					Price,
					SleepRoom = data.results.SleepRoom;
				CustomerSourceType = [{
						'DisplayName': '我的客源',
						'DisplayValue': 'MyCustomerSource'
					},
					{
						'DisplayName': '我的收藏',
						'DisplayValue': 'MyFavoritesSource'
					},
					{
						'DisplayName': '淘宝池',
						'DisplayValue': 'MyShopTaoBaoSource'
					}
				];
				for(i = 0; i < CustomerSourceType.length; i++) {
					sourceHtml += '<li data-type="1" data-value=' + CustomerSourceType[i].DisplayValue + '>' + CustomerSourceType[i].DisplayName + '</li>'
				};
				document.querySelector('.CustomerSourceType').innerHTML = sourceHtml;
				if(MyCustomerSource.BuyOrRent == 2) {
					Price = data.results.RPrice;
				} else {
					Price = data.results.HPrice;
				};
				for(i = 0; i < Price.length; i++) {
					PriceHtml += '<li data-type="2"  data-value=' + Price[i].DisplayValue + '>' + Price[i].DisplayName + '</li>'
				};
				document.querySelector('.RPrice').innerHTML = PriceHtml;
				for(i = 0; i < SleepRoom.length; i++) {
					SleepRoomHtml += '<li data-type="3"  data-value=' + SleepRoom[i].DisplayValue + '>' + SleepRoom[i].DisplayName + '</li>'
				};
				document.querySelector('.SleepRoom').innerHTML = SleepRoomHtml;
				/*点击执行切换筛选*/
				$(".cutomerFilterName > ol > li").on('tap', function() {
					$(this).addClass('active').siblings().removeClass('active');
					var secondtext = $(this).text(),
						type = $(this).attr('data-type'),
						value = $(this).attr('data-value');
					if(secondtext.length > 4) {
						secondtext = secondtext.substr(0, 3) + '...';
					};
					$(this).parents('li').find('.filterText').text(secondtext);
					if(type == '1') {
						/*如果是淘宝池需要参数店id*/

						/*判定是否是收藏列表*/
						if(value == "MyFavoritesSource") {
							MyCustomerSource.Perid = uId
							delete MyCustomerSource.LevelType
							iscollect = true;
							customerLevelIndex = 2;
						} else {
							MyCustomerSource.Perid = uId
							delete MyCustomerSource.LevelType
							iscollect = false;
							customerLevelIndex = 2;
						};
						if(value == "MyCustomerSource") {
							customerLevelIndex = 1;
							MyCustomerSource.Perid = uId
							delete MyCustomerSource.LevelType
						};
						if(value == "MyShopTaoBaoSource") {
							MyCustomerSource.deptid = parseInt(localStorage.getItem('depId'));
							delete MyCustomerSource.Perid;
							MyCustomerSource.LevelType = 3;
							/*更多参数等级显示调整*/
							customerLevelIndex = 3;
						};
						defaultSource = value;
						MyCustomerSource.PageIndex = 1;
						if(MyCustomerSource.BuyOrRent == 2) {
							loadList();
						} else {
							loadList({
								isRent: false
							});
						}
						console.log(JSON.stringify(MyCustomerSource))
					} else if(type == '2') {
						MyCustomerSource.Price = value;
						MyCustomerSource.PageIndex = 1;
						if(MyCustomerSource.BuyOrRent == 2) {
							loadList();
						} else {
							loadList({
								isRent: false
							});
						}
						console.log(JSON.stringify(MyCustomerSource))
					} else if(type == '3') {
						MyCustomerSource.Shi = parseInt(value);
						MyCustomerSource.PageIndex = 1;
						if(MyCustomerSource.BuyOrRent == 2) {
							loadList();
						} else {
							loadList({
								isRent: false
							});
						}
						console.log(JSON.stringify(MyCustomerSource))
					}
					/*重置下拉刷新*/
					mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
//					/*滚动到顶部*/
					mui('.mui-scroll-wrapper').scroll().setTranslate(0,0);
					//					return false
				});
				//				console.log('数据字典' + JSON.stringify(vm.$data.allDic.BuyStatusType)
			} else {
				mui.toast(data.msg.replace(/[a-zA-Z\(\)]/g, ''))
			}
		},
		error: function(xht, type, cont) {
			mui.toast(console.log('数据字典' + type + '--' + cont))
		}
	});
}

/*获取更多搜索条件参数*/
window.addEventListener("shuaxin", function(e) {
	var a = null;
	MyCustomerSource.PageIndex = 1;
	if(JSON.stringify(e.detail.moreDic) == '{}') {
		var arr = ['fitmentType', 'LevelType', 'Area', 'OrienTation'];
		for(var i = 0; i < arr.length; i++) {
			delete MyCustomerSource[arr[i]];
		}
	} else {
		MyCustomerSource = $.extend({}, MyCustomerSource, e.detail.moreDic);
	}
	if(MyCustomerSource.BuyOrRent == 2) {
		loadList();
	} else {
		loadList({
			isRent: false
		});
	}
	console.log('更多'+JSON.stringify(MyCustomerSource))
	//plus.webview.currentWebview().reload(true)//刷新当前页面
});
/*搜索客源*/
function serachList() {
	if(MyCustomerSource.BuyOrRent == 1) {
		loadList({
			isRent: false
		});
	} else {
		loadList();
	}
};
var timer = null;
$(".customerSerach input").on('keyup', function() {
	MyCustomerSource.PageIndex = 1;
	mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
	MyCustomerSource.SearchValue = $(this).val().slice(0, 15).trim();
	console.log(JSON.stringify(MyCustomerSource));
	if(MyCustomerSource.SearchValue ==''){
		clearTimeout(timer);
		timer = setTimeout(serachList, 1000);
		return false
	};
	setTimeout(serachList, 600);
	//	
});


