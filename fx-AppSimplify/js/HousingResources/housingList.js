var uId = parseInt(localStorage.getItem('userId'));
//mui.toast('登录人ID'+uId);
/*ajax data 上传*/
var MyHouseSource = {
		pageSize: 5,
		PageIndex: 1,
		Perid: uId,
		deptid: parseInt(localStorage.getItem('depId'))
	},
	BuyOrRent = 1, //代表二手房
	getData = null,
	defaultSource = 'MyHouseSource',
	BuyOrRentUrl = 'API_House',
	isNoInfo = false,
	CustomerPhoneList = {},
	parameter,
	detailUrl = 'API_House/MyHouseSourceNextRow',
	customerLevelIndex = 1,
	LastDayDisplay = 'inline-block';
noUpload = false;
/*----------------全局变量--------------------*/
/*初始化mui*/
//列表上拉加载，下拉刷新
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0006 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
mui.init({});
var self;
mui.plusReady(function() {
	self = plus.webview.currentWebview();
	/*录入修改房源*/
	$('#inAddHosing').on('tap', function(e) {

		openNewPage({
			url: '_www/html/Housing/addHosing.html',
			data: {
			}
		});
	});
	
	loadList({
		isRent: false
	});
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
		}
	},
	up: {
		contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
		contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
		callback: function() {
			MyHouseSource.PageIndex++;
			setTimeout(function() {
				if(BuyOrRent == 1) {
					loadList({
						isRent: false,
						isClear: false,
					});
				} else {
					loadList({
						isClear: false,
					});
				};
			}, 1000);
			console.log(JSON.stringify('执行了上啦'))
		}
	}
});
/*加载列表数据*/
function loadList(setting) {
	var defaults = {
		isClear: true,
		isRent: true,
	};
	var obj = $.extend({}, defaults, setting);
	if(obj.isClear) {
		$("#myHouseList").empty();

	};

	mui.ajax(baseUrl + BuyOrRentUrl + '/' + defaultSource, {
		type: 'post',
		data: MyHouseSource,
		//		async:false,
		success: function(data, type, status) {
			mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(data.results == null);
			//			console.log('woyaode'+JSON.stringify(data));
			console.log('房源列表' + JSON.stringify(data.results))
			if(data.succ && data.results != null) {

				//				console.log(JSON.stringify(data.results[0]))
				/*获取列表信息*/
				var i = 0,
					custListHtml = '',
					LevelStyle,
					Level,
					oneprice,
					QuotePrice,
					luruTime,
					display = 'inline-block',
					getData = data.results;
				for(i = 0; i < getData.length; i++) {
					//console.log(fangxiang(getData[i].HouseForward))
					if(obj.isRent) {
						luruTime = fmtDate(getData[i].RentPersonBillTime);
						QuotePrice = getData[i].QuotePrice + '元';
						/*截取平均价格*/
						oneprice = getData[i].oneprice.toFixed(2) + '元/平';
						display = 'none'
					} else {
						luruTime = fmtDate(getData[i].BuyPersonBillTime);
						QuotePrice = getData[i].QuotePrice + '万';
						/*截取平均价格*/
						var onepriceStr = getData[i].oneprice.toFixed(2);
						oneprice = onepriceStr + '万/平';
						if(onepriceStr.substr(onepriceStr.length - 1, 1) == '0') {
							oneprice = getData[i].oneprice.toFixed(1) + '万/平';
						};
						display = 'inline-block'
					};
					//					HouseForward = escape({
					//						type:'HouseForwardType',
					//						value:getData[i].HouseForward
					//					});
					/*判断一些满五满二  独家 委托 车位等*/
					var lala = (function() {
						var str = '';
						if(getData[i].tpcon != 0) {
							str += '<span class="kan">实勘</span>'
						};
						if(getData[i].ycwt != 0) {
							str += '<span class="yao">钥匙</span>'
						};
						if(obj.isRent) {
							if(getData[i].zlwt != 0) {
								str += '<span class="shu">租赁</span>'
							};
						};
						if(!obj.isRent) {
							if(getData[i].mmwt != 0) {
								str += '<span class="kan">独家</span>'
							};
						};
						if(getData[i].smwt != 0) {
							str += '<span class="shu">书面</span>'
						};
						if(getData[i].FullYear >= 2 && getData[i].FullYear < 5) {
							str += '<span class="qian">满二</span>'
						};
						if(getData[i].FullYear >= 5) {
							str += '<span class="shu">满五</span>'
						};

						return str
					})();

					custListHtml += '<li class="mui-table-view-cell mui-media" id="toHouseDetails" data-id="' + getData[i].HouseId + '" data-RowNum="' + getData[i].RowNum + '">' +
						'<a href="javascript:;">' +
						'<img class="mui-media-object mui-pull-left" src="' + getData[i].ShowImg + '" onerror="this.src=\'../../img/hosing/imgHome.png\' "/>' +
						'<div class="mui-media-body">' +
						'<h3 class="mui-ellipsis">' + getData[i].Housename + ' ' + getData[i].Builder + '#' + getData[i].Unit + '#' + getData[i].fang + '</h3>' +
						'<div class="mui-row">' +
						'<div class="text1 mui-col-xs-6">' +
						'<p>' + getData[i].Shi + '室' + getData[i].Ting + '厅' + getData[i].Wei + '卫' + getData[i].Savings + '储</p>/' +
						'<p >' + getData[i].Area_of_Structure + '㎡</p>' +
						'</div>' +
						'<div style="display:' + LastDayDisplay + '" class="mui-col-xs-6">' +
						'<p class="time">' + luruTime + '</p>' +
						'</div>' +
						'</div>' +
						'<div class="iconbox">' +
						lala +
						'</div>' +
						'<div class="mui-row">' +
						'<div class="mui-col-xs-6 text2">' +
						'<p class="money">' + QuotePrice + '</p>' +
						'<p class="pm" style="display:' + display + '">' + oneprice + '</p>' +
						'</div>' +
						'<div style="display:' + LastDayDisplay + '" class="mui-col-xs-6 mui-text-right lose">' +
						getData[i].LastDay + '天后掉' +
						'</div>' +
						'</div>' +
						'</div>' +
						'</a>' +
						'</li>'
				};
				isNoInfo = false;
				$('#myHouseList').append(custListHtml);
				$(".noinfoImg").hide();
				$(".mui-pull").show();
				//mui.toast('数据列表'+data.msg)
				/*获取联系人信息*/
				//_this.$data.CustomerPhoneList = data.results.CustomerPhoneList;
			} else {
				//				mui.toast('暂无数据');
				/*暂无数据*/

				isNoInfo = true;
				if($("#myHouseList li").length == 0) {
					$(".noinfoImg").show();
					$(".mui-pull").hide();
				} else {
					$(".mui-pull").show();
				}
			}
		},
		error: function(xht, type, cont) {
			mui.toast('房源数据列表' + type + '--' + cont)
		}
	});

};
/*求租-求购*/
$(".rent-purchase a").on('tap', function() {
	mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
	/*重置租赁买卖搜索条件和文字*/
	MyHouseSource = {
		pageSize: 5,
		PageIndex: 1,
		Perid: uId,
		deptid: parseInt(localStorage.getItem('depId'))
	};
	$('.sText1').text('我的房源');
	$('.sText2').text('价格');
	$('.sText3').text('居室');
	$('.sText4').text('面积');
	$('.sText5').text('委托');
	$('.sText6').text('图片');
	$('.sText7').text('排序');
	/*切换样式*/
	$(this).addClass("active").siblings().removeClass("active");
	BuyOrRent = parseInt($(this).attr('data-type'));
	defaultSource = 'MyHouseSource',
		MyHouseSource.PageIndex = 1;
	/*加载列表数据*/
	if(BuyOrRent == 1) {
		detailUrl = 'API_House/MyHouseSourceNextRow';
		BuyOrRentUrl = 'API_House';
		loadList({
			isRent: false
		});
	} else {
		detailUrl = 'API_Rent/MyHouseSourceNextRow';
		BuyOrRentUrl = 'API_Rent';
		loadList();
	};
	/*滚动到顶部*/
	mui('.mui-scroll-wrapper').scroll().setTranslate(0,0);
	console.log(JSON.stringify(MyHouseSource));
	console.log(baseUrl + BuyOrRentUrl + '/' + defaultSource)
	/*切换类型来切换字典值*/
	loadDic()
});

/*详情页*/
$('#myHouseList').on('tap', '.mui-table-view-cell', function() {
	//mui.toast($(this).attr('data-id'))
	MyHouseSource.RowNum = parseInt($(this).attr('data-RowNum'));
	openNewPage({
		url: '_www/html/Housing/housingDetail.html',
		data: {
			HouseID: parseInt($(this).attr('data-id')),
			MyHouseSource: MyHouseSource,
			BuyOrRent: BuyOrRent,
			detailUrl: detailUrl,
		}
	});

});

/*打开侧滑菜单*/
$(document).ready(function() {
	ReadyMorePage('offcanvasMore.html', 'myHouseListMore');

	document.getElementById("show-btn").addEventListener('tap', openMenu);
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
	$(this).hide()
	$('.cutomerFilterName').slideUp();
});

/*加载数据字典*/
loadDic()

function loadDic() {
	mui.ajax(baseUrl + 'API_Dictionary/AllDic', {
		type: 'post',
		success: function(data, type, status) {
			if(data.succ) {
				/*console.log(JSON.stringify(data.results))*/
				//mui.toast('数据字典')
				/*获取列表信息*/
				var i = 0,
					arr,
					sourceHtml = '',
					PriceHtml = '',
					SleepRoomHtml = '',
					AreaHtml = '',
					HouseDelegateHtml = '',
					HasPictureHtml = '',
					HouseOrderHtml = '',
					info = data.results;
				arr = ["MyHouseSource", "MyStoreSource", "FavoriteSource", "HighGradeSource", "CompanySource", "PoolSource"];
				/*遍历房源来源*/
				for(i = 0; i < info.HouseSourceType.length; i++) {
					sourceHtml += '<li data-type="1" data-value=' + arr[i] + '>' + info.HouseSourceType[i].DisplayName + '</li>'
				};
				document.querySelector('.HouseSourceType').innerHTML = sourceHtml;

				/*遍历价格*/
				if(BuyOrRent == 1) {
					Price = info.HPrice;
				} else {
					Price = info.RPrice;
				};
				for(i = 0; i < Price.length; i++) {
					PriceHtml += '<li data-type="2"  data-value=' + Price[i].DisplayValue + '>' + Price[i].DisplayName + '</li>'
				};
				document.querySelector('.Price').innerHTML = PriceHtml;

				/*室厅*/
				for(i = 0; i < info.SleepRoom.length; i++) {
					SleepRoomHtml += '<li data-type="3"  data-value=' + info.SleepRoom[i].DisplayValue + '>' + info.SleepRoom[i].DisplayName + '</li>'
				};
				document.querySelector('.SleepRoom').innerHTML = SleepRoomHtml;

				/*遍历面积*/
				for(i = 0; i < info.RArea.length; i++) {
					AreaHtml += '<li data-type="4"  data-value=' + info.RArea[i].DisplayValue + '>' + info.RArea[i].DisplayName + '</li>'
				};
				document.querySelector('.Area').innerHTML = AreaHtml;
				/*委托*/
				for(i = 0; i < info.HouseDelegate.length; i++) {
					HouseDelegateHtml += '<li data-type="5"  data-value=' + info.HouseDelegate[i].DisplayValue + '>' + info.HouseDelegate[i].DisplayName + '</li>'
				};
				document.querySelector('.HouseDelegate').innerHTML = HouseDelegateHtml;

				/*图片*/
				for(i = 0; i < info.HasPicture.length; i++) {
					HasPictureHtml += '<li data-type="6"  data-value=' + info.HasPicture[i].DisplayValue + '>' + info.HasPicture[i].DisplayName + '</li>'
				};
				document.querySelector('.HasPicture').innerHTML = HasPictureHtml;

				/*排序*/
				for(i = 0; i < info.HouseOrder.length; i++) {
					HouseOrderHtml += '<li data-type="7"  data-value=' + info.HouseOrder[i].DisplayValue + '>' + info.HouseOrder[i].DisplayName + '</li>'
				};
				document.querySelector('.HouseOrder').innerHTML = HouseOrderHtml;

				/*点击执行切换筛选*/
				$(".cutomerFilterName > ol > li").on('tap', function() {

					$(this).addClass('active').siblings().removeClass('active');
					/*拿到搜索项的值和类型*/
					var secondtext = $(this).text(),
						type = $(this).attr('data-type'),
						value = $(this).attr('data-value');
					/*截取字符*/
					if(secondtext.length > 4) {
						secondtext = secondtext.substr(0, 3) + '...';
					}
					$(this).parents('li').find('.filterText').text(secondtext);
					if(type == '1') {
						defaultSource = value;
						MyHouseSource.PageIndex = 1;
						/*淘宝池几天掉隐藏*/
						LastDayDisplay = 'inline-block'
						/*判断加载我的房源，收藏房源，店内房源等等 ajax的路径*/
						if(value == 'MyHouseSource') {
							customerLevelIndex = 1;
							if(BuyOrRent == 1) {
								detailUrl = 'API_House/MyHouseSourceNextRow';
							} else {
								detailUrl = 'API_Rent/MyHouseSourceNextRow';
							}
						};
						if(value == 'MyStoreSource') {
							/*这个用来判断更多搜索的显示*/
							customerLevelIndex = 1;
							MyHouseSource.deptid = parseInt(localStorage.getItem('depId'));
							if(BuyOrRent == 1) {
								detailUrl = 'API_House/MyStoreSourceNextRow';
							} else {
								detailUrl = 'API_Rent/MyStoreSourceNextRow';
							}
						};
						if(value == 'FavoriteSource') {
							customerLevelIndex = 2;
							if(BuyOrRent == 1) {
								detailUrl = 'API_House/FavoriteSourceNextRow';
							} else {
								detailUrl = 'API_Rent/FavoriteSourceNextRow';
							}
						};
						if(value == 'HighGradeSource') {
							customerLevelIndex = 1;
							if(BuyOrRent == 1) {
								detailUrl = 'API_House/HighGradeSourceNextRow';
							} else {
								detailUrl = 'API_Rent/HighGradeSourceNextRow';
							}
						};
						if(value == 'CompanySource') {
							customerLevelIndex = 1;
							if(BuyOrRent == 1) {
								detailUrl = 'API_House/CompanySourceNextRow';
							} else {
								detailUrl = 'API_Rent/CompanySourceNextRow';
							}
						};
						if(value == 'PoolSource') {
							customerLevelIndex = 3;
							LastDayDisplay = 'none'
							if(BuyOrRent == 1) {
								detailUrl = 'API_House/PoolSourceNextRow';
							} else {
								detailUrl = 'API_Rent/PoolSourceNextRow';
							}
						};
						/*判断加载租售列表*/
						if(BuyOrRent == 1) {
							loadList({
								isRent: false
							});
						} else {
							loadList();
						};
						console.log(JSON.stringify(MyHouseSource))
						console.log(JSON.stringify(baseUrl + BuyOrRentUrl + '/' + defaultSource))
					} else if(type == '2') {
						MyHouseSource.Price = value;
						MyHouseSource.PageIndex = 1;
						if(BuyOrRent == 1) {
							loadList({
								isRent: false
							});
						} else {
							loadList();
						}
						console.log(JSON.stringify(MyHouseSource))
					} else if(type == '3') {
						MyHouseSource.Shi = parseInt(value);
						MyHouseSource.PageIndex = 1;
						if(BuyOrRent == 1) {
							loadList({
								isRent: false
							});
						} else {
							loadList();
						}
						//						console.log(JSON.stringify(vm.$data.MyHouseSource))
					} else if(type == '4') {
						MyHouseSource.Area = value;
						MyHouseSource.PageIndex = 1;
						if(BuyOrRent == 1) {
							loadList({
								isRent: false
							});
						} else {
							loadList();
						}
						//						console.log(JSON.stringify(vm.$data.MyHouseSource))
					} else if(type == '5') {
						MyHouseSource.Delegate = parseInt(value);
						MyHouseSource.PageIndex = 1;
						if(BuyOrRent == 1) {
							loadList({
								isRent: false
							});
						} else {
							loadList();
						}
						//						console.log(JSON.stringify(vm.$data.MyHouseSource))
					} else if(type == '6') {
						MyHouseSource.HasPicture = parseInt(value);
						MyHouseSource.PageIndex = 1;
						if(BuyOrRent == 1) {
							loadList({
								isRent: false
							});
						} else {
							loadList();
						}
						//						console.log(JSON.stringify(vm.$data.MyHouseSource))
					} else if(type == '7') {
						MyHouseSource.Order = parseInt(value);
						MyHouseSource.PageIndex = 1;
						if(BuyOrRent == 1) {
							loadList({
								isRent: false
							});
						} else {
							loadList();
						}
						//						console.log(JSON.stringify(vm.$data.MyHouseSource))
					}
					/*重置下拉刷新 */
					mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
					/*滚动到顶部*/
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
	MyHouseSource.PageIndex = 1;
	if(JSON.stringify(e.detail.moreDic) == '{}') {
		var arr = ['fitmentType', 'LevelType', 'Area', 'OrienTation'];
		for(var i = 0; i < arr.length; i++) {
			delete MyHouseSource[arr[i]];
		}
	} else {
		MyHouseSource = $.extend({}, MyHouseSource, e.detail.moreDic);
	};
	if(BuyOrRent == 1) {
		loadList({
			isRent: false
		});
	} else {
		loadList();
	};
	console.log(JSON.stringify(MyHouseSource))
	//plus.webview.currentWebview().reload(true)//刷新当前页面
});

/*搜索房间名称*/
function serachList() {
	if(BuyOrRent == 1) {
		loadList({
			isRent: false
		});
	} else {
		loadList();
	}
};
/*搜索房源*/

var timer = null;
$(".customerSerach input").on('keyup', function() {
	MyHouseSource.PageIndex = 1;
	mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
	MyHouseSource.SearchValue = $(this).val().trim();
	console.log(JSON.stringify(MyHouseSource));
	if(MyHouseSource.SearchValue == '') {
		clearTimeout(timer);
		timer = setTimeout(serachList, 1000);
		return false
	};
	setTimeout(serachList, 600)
	//	
});