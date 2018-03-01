var mask = mui.createMask();//callback为用户点击蒙版时自动执行的回调；
mask.show();//显示遮罩

/*初始化实例vue*/		
var vm = new Vue({
	el: '#vue-app',
	data: {
		info: {
			
		},
		detail: {"CustomerID":3665,"CustomerNumber":"CA003665","BuyOrRent":2,"BuyStatus":1,"BuyLevel":0,"LockState":0,"RentStatus":0,"RentLevel":1,"FromSource":5,"CustomerName":"小强","QQ":"","Email":"","IDNumber":"","Nationality":0,"NowAddress":"","HouseholdAddress":"","Sex":"男","Intention":0,"TimeLimit":0,"Job":0,"liveStatus":0,"Purpose":0,"Remark":"","UseChannel":1,"SleepRoom":2,"Parlour":1,"Toilet":1,"Balcony":1,"HouseAreaStart":1,"HouseAreaEnd":200,"PriceStart":0,"PriceEnd":0,"RentPriceStart":200,"RentPriceEnd":2000,"AreaID":0,"GardenSName":"","SchoolName":"","FloorNStart":0,"FloorNEnd":0,"NotTop":0,"NotOneFloor":0,"PayFunction":0,"HouseForward":6,"DegreeLevel":4,"HouseUser":0,"Followtime":null,"RentUser":68,"InputPerson":68,"Developer":68,"Operator":"梅西","Remark2":"大哥哥大姐姐","LookCount":0,"AddTime":"2017-11-16T16:32:14","UpdateTime":null,"Notes":"","JGTime":"0001-01-01T00:00:00","DaiKanTime":"0001-01-01T00:00:00","IsCollect":false,"row_number":1,"CustomerPhoneList":[{"_customercid":0,"_customerid":3665,"_contactuser":"社会我大哥","_contactphone":"17811111111","_operator":null,"_addtime":"0001-01-01T00:00:00","_updatetime":"0001-01-01T00:00:00"}],"CustomerLookFollw":null,"CustomerFollw":null},
		CustomerLookFollw: false,
		CustomerPhoneList: null,
		CustomerFollw:false,
		firstPhone:'',
		detailUrl:'GetCustomerInfoPage',
		isCollectInit:false,
		count:0,
	},
	methods: {
		getInfo() {
			/*获取客户信息*/
			var _this = this;
			mui.ajax(baseUrl + 'API_Customer/'+_this.$data.detailUrl, {
					type: 'post',
					data:_this.$data.info,
					success: function(data, type, status) {
						console.log(JSON.stringify(data))
						if(data.succ&&data.results !=null) {
							/*信息总量*/
							vm.$data.count = data.count;
							/*拿到基本信息*/
							vm.$data.detail = data.results;
							/*CustomerPhoneList*/
							vm.$data.CustomerPhoneList = data.results.CustomerPhoneList;
							vm.$data.firstPhone = data.results.CustomerPhoneList[0]._contactphone;
							if(vm.$data.CustomerPhoneList != null) {
								if(vm.$data.CustomerPhoneList.length == 1) {
									document.querySelector('#telPhone').addEventListener('tap', function(e) {
										e.stopPropagation();
										plus.device.dial(vm.$data.CustomerPhoneList[0]._contactphone, false);
									}, false);
								} else if(vm.$data.CustomerPhoneList.length >= 1) {
									document.querySelector('#telPhone').addEventListener('tap', function(e) {
										e.stopPropagation();
										var phonelist = [],
											i;
										for(i = 0; i < vm.$data.CustomerPhoneList.length; i++) {
											var obj = {};
											obj.title = vm.$data.CustomerPhoneList[i]._contactphone;
											phonelist.push(obj)

										}
										plus.nativeUI.actionSheet({
											title: "选择要拨打的电话",
											cancel: "取消",
											buttons: phonelist
										}, function(e) {
											plus.device.dial(phonelist[e.index - 1].title, false);
										});
									}, false);
								}
							}
							/*带看信息*/ 
							vm.$data.CustomerLookFollw = data.results.CustomerLookFollw;
//							console.log(JSON.stringify(data.results.CustomerLookFollw))
							/*跟进信息*/
							vm.$data.CustomerFollw = data.results.CustomerFollw;
							/*关闭等待框*/
							mask.close();
							plus.nativeUI.closeWaiting(wating);
							/*进入跟进*/
							$('body').on('tap', '#AddFollow', function(e) {
								/*传递等级*/
								var level;
								if(vm.$data.detail.BuyOrRent == 2) {
									level = escape({
										value: vm.$data.detail.RentLevel,
										type: 'LevelText'
									})
								} else {
									level = escape(vm.$data.detail.BuyLevel, 'LevelText')
								}
								openNewPage({
									url: '_www/html/myCustomers/addFollowUp.html',
									data: {
										CustomerId: vm.$data.detail.CustomerID,
										BuyOrRent: vm.$data.detail.BuyOrRent,
										CustomerName: vm.$data.detail.CustomerName,
										Customerlevel: level
									}
								});
								return false;
							});
							/*进入带看*/
							$('body').on('tap', '#Look', function(e) {
								/*传递等级*/
								var level;
								if(vm.$data.detail.BuyOrRent == 2) {
									level = escape({
										value: vm.$data.detail.RentLevel,
										type: 'LevelText'
									})
								} else {
									level = escape(vm.$data.detail.BuyLevel, 'LevelText')
								}
								/*打开页面*/
								openNewPage({
									url: '_www/html/myCustomers/takeLookAt.html',
									data: {
										CustomerId: vm.$data.detail.CustomerID,
										BuyOrRent: vm.$data.detail.BuyOrRent,
										CustomerName: vm.$data.detail.CustomerName,
										Customerlevel: level
									}
								});
								return false;
							});
							/*是否收藏*/
							var IsCollect;
							/*收藏ajax*/
							if(data.results.IsCollect){
								$("#love").text('取消收藏');
								IsCollect = 2;
							}else{
								$("#love").text('收藏');
								IsCollect = 1;
							};
							mui('.mui-bar').on('tap', '#love', function() {
								var _this = this;
								mui.ajax(baseUrl + 'API_Customer/AddCustomerFavorite?CustomerID=' + data.results.CustomerID + '&UserID=' + parseInt(localStorage.getItem('userId')) + '&isCollect=' + IsCollect, {
									type: 'post',
									success: function(data) {
										//console.log('收藏'+JSON.stringify(data))
										if(data.succ){
											mui.toast(data.msg);
											if(IsCollect ==1){
												IsCollect = 2;
												_this.innerText = '取消收藏';
											}else{
												IsCollect = 1;
												_this.innerText = '收藏';
												
											}
										}else{
											mui.toast(data.msg.replace(/[a-zA-Z\(\)]/,''));
										}
									},
									error: function(xhr, type, errorThrown) {
										mui.toast('收藏' + type + '-' + errorThrown)
									}
								})
							});
							
						} else {
							mui.toast(data.msg.replace(/[a-zA-Z\(\)]/g, ''))
						}
					},
					error: function(xht, type, cont) {
						mui.toast(console.log('客户信息' + type + '--' + cont))
					}
				})
		},
		shaixuan(value, type) {
			return escape({
				type: type,
				value: value
			})
		},
		fmtDate(obj) {
			if(obj == '0001-01-01T00:00:00') {
				return '暂无信息'
			}
			return obj.slice(0,10);
		},
		orderby(index) {
			return this.CustomerFollw.length - index
		},orderbys(index) {
			return this.CustomerLookFollw.length - index
		}
	},
	mounted: function() {
//		this.getInfo();
	}
});
var wating;
/*mui 初始化*/
mui.init();
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
/*获取到页面之间的传值*/

mui.plusReady(function() {
	wating = plus.nativeUI.showWaiting( "加载中..." );
	/*获取传参*/
	var self = plus.webview.currentWebview();
	vm.$data.info = self.info;
	vm.$data.info.sUserId = localStorage.getItem('userId');
	/*判定是否是收藏列表*/
	if(self.iscollect){
		vm.$data.info.Perid = localStorage.getItem('userId');
		vm.$data.detailUrl = 'GetMyFavoritesSourcePage';
		vm.$data.isCollectInit = true;
		delete vm.$data.info.sUserId;
	};
	console.log(JSON.stringify(vm.$data.info));
//	console.log('收藏路径'+baseUrl + 'API_Customer/'+vm.$data.detailUrl);
	/*加载详情信息*/
	vm.getInfo();
});
$("#nextPage").click(function(){
	if(vm.$data.info.RowNum >= vm.$data.count){
		vm.$data.info.RowNum = vm.$data.count;
		mui.toast('已经是最后一个了亲')
	}else{
		vm.$data.info.RowNum++;
	}
	
	console.log(vm.$data.info.RowNum);
	vm.getInfo();
});
$("#upPage").click(function(){
	if(vm.$data.info.RowNum <= 1){
		vm.$data.info.RowNum = 1;
		mui.toast('已经是第一个了')
	}else{
		vm.$data.info.RowNum--;
	};
	console.log(vm.$data.info.RowNum)
	vm.getInfo();
});
/*跟进带看收展*/
$('.show-hidden').on('tap', '.down', function() {
	var $domUl = $(this).parents('.show-hidden').find('ul'),
		$icon = $(this).find('span');

	if($icon.hasClass('mui-icon-arrowdown')) {
		$domUl.height($domUl.innerHeight()).animate({
			"height": $domUl.css('height', 'auto').innerHeight() + 'px'
		}, 200);
		$icon.attr('class', 'mui-icon mui-icon-arrowup');
	} else {
		$domUl.animate({
			'height': '165px'
		}, 200);
		$icon.attr('class', 'mui-icon mui-icon-arrowdown');
	}
});

/*刷新页面*/
window.addEventListener("shuaxin", function(e) {
	vm.getInfo();
//	plus.webview.currentWebview().reload(true)//刷新当前页面
});