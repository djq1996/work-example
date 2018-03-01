var mask = mui.createMask();//callback为用户点击蒙版时自动执行的回调；
mask.show();//显示遮罩

var BuyOrRent,
	isCollectInit = 0,
	BuyOrRentUrl = '',
	MyHouseSource,
	wating;
var vm = new Vue({
	el: '#vue-app',
	data: {
		info: {
			HouseID: null,
		},
		detail: {"HouseId":496,"RoomID":1725,"SaleLockState":0,"HouseNo":"FY000496","Housename":"演示-碧水云天","Builder":"5号楼","Unit":"/单元","Floor":1,"fang":"101","IsSell":1,"SaleType":1,"SaleLevel":3,"Area_of_Structure":123,"Indoor_Area":120,"Construction_Ratio":98,"Given_Area":0,"Shi":4,"Ting":1,"Wei":1,"Chu":1,"ShowImg":"","Savings":1,"FullYear":0,"IsOnly":0,"BuyPersonBill":35,"BuyDevelopers":35,"QuotePrice":2121212,"LowPrice":212121,"OrienTation":2,"DecorateType":0,"ResidenceStatus":0,"ShowingsWay":0,"BuyBright":"","oneprice":17245.6260162602,"developername":"屈凯","billname":"屈凯","UseChannel":1,"BillDepID":14,"DevDepID":14,"jgtime":"2017-11-13T12:00:58","LookCount":0,"BuyPersonBillTime":"2017-11-13T12:00:58","RoomIDs":"S5,5,16,27,296,","smwt":0,"ycwt":0,"mmwt":0,"zlwt":0,"tpcon":0,"HousePicture":[],"HouseRolePer":[{"UserId":35,"UserName":"屈凯","DepId":14,"DepShopsame":"新起点店","HeaderImage":"File/HeadImg/51fabeb344c04294bab111e850a27501.jpg","MobilePhone":"13910016439","HouseId":496,"RoleName":"跟单人","OrderNo":2,"SelectType":2},{"UserId":35,"UserName":"屈凯","DepId":14,"DepShopsame":"新起点店","HeaderImage":"File/HeadImg/51fabeb344c04294bab111e850a27501.jpg","MobilePhone":"13910016439","HouseId":496,"RoleName":"责任人","OrderNo":2,"SelectType":2}],"HouseOwner":[{"OwnerId":370,"RoomID":1725,"houseID":496,"ContactUser":"大哥","IsLookUser":"共有产权人","Sex":"","RelationRemark":"","ZIndex":0,"Operator":"屈凯","OperatorID":35,"Addtime":"2017-11-13T12:00:58","UpdateTime":null,"Note":"","Phone":"18813134545","OwnerPId":376,"OwnerPhone":[{"OwnerPId":376,"OwnerId":370,"RoomID":1725,"HouseID":496,"Phone":"18813134545","ShieldPhone":0,"AnswerStatus":0,"PhoneStatus":0,"Remark":"","ZIndex":0,"Operator":"屈凯","OperatorID":35,"Addtime":"2017-11-13T12:00:58","UpdateTime":"","EncryptionPhone":""}]}],"HousePark":null,"HouseFllow":[{"UserId":35,"UserName":"屈凯","Depid":14,"DepShopname":"新起点店","HeadeImage":"File/HeadImg/51fabeb344c04294bab111e850a27501.jpg","MobilePhone":"13910016439","OwnerId":370,"RoomId":1725,"HouseId":496,"AddPerid":35,"Addtime":"2017-11-13 02:16:45","Remark":"是不是","AnswerStatus":0}],"Rentattached":null,"Sellattached":{"Sell_attachedId":137,"HouseID":496,"LowPrice":212121,"LowPriceExplain":"","WhetherLoan":0,"WhetherCarport":0,"QuotePrice":2121212,"QuoteExplain":"","WhetherLoan2":0,"WhetherCarport2":0,"PaymentMethod":"2","OverseasPayment":0,"FullYear":0,"IsOnly":0,"OriginalValue":0,"PayerType":0,"PayerRemark":"","ResidenceType":0,"ApplianceGive":0,"ApplianceRemark":"","ValueAddedTax":0,"DeedTax":0,"IndividualTax":0,"AdditionTax":0,"SynthesizePrice":0,"RemiseMoney":0,"CostPrice":0,"BuyDevelopers":35,"BuyDevelopersTime":"2017-11-13T12:00:58","BuyPersonBill":35,"BuyPersonBillTime":"2017-11-13T12:00:58","LookCount":0,"BuyBright":""},"CarportNum":0,"BuilderYear":2003},
		HouseRolePer:[],
		HouseOwner:[],
		HouseFllow:[],
		CustomerPhoneList: null,
		CustomerFollw:false,
		HousePicture:[{PicUrl:'../../img/hosing/home.png'}],
		BuyOrRent:1,
		imgUrl:imgUrl,
		firstImg:null,
		lastImg:null
	},
	methods: {
		getInfo(){
			/*获取客户信息*/
			var _this = this;
			console.log(baseUrl +BuyOrRentUrl)
			console.log(JSON.stringify(MyHouseSource))
			mui.ajax(baseUrl +BuyOrRentUrl, {
					type: 'post',
					data:MyHouseSource,
					success: function(data, type, status) {
						console.log('房源详情MyHouseSourceNextRow'+JSON.stringify(data));
						if(data.succ&&data.results != null) {
							/* 拿到基本信息*/
							vm.$data.detail = data.results;
//							console.log('我要用的-----'+JSON.stringify(data.results));							
							/*角色信息*/
							if(data.results.HouseRolePer !=null){
								vm.$data.HouseRolePer = data.results.HouseRolePer;
							}
							if(data.results.HouseFllow !=null){
								vm.$data.HouseFllow = data.results.HouseFllow;
							}
							if(data.results.HouseOwner !=null){
								vm.$data.HouseOwner = data.results.HouseOwner;
							}
							/*图片信息*/
							if(JSON.stringify(data.results.HousePicture) !='[]'){
								var imgArray = [];
								for(var i=0;i<data.results.HousePicture.length;i++){
									if(data.results.HousePicture[i].PicType == 1&&data.results.HousePicture[i].PrcStatus == 2){
										imgArray.push(data.results.HousePicture[i])
									}
								};
								if(imgArray.length  == 0){
									imgArray.push({PicUrl:'../../img/hosing/home.png'})
								};
								vm.$data.HousePicture = imgArray;
								vm.$data.firstImg = imgArray[0].PicUrl; 
								vm.$data.lastImg = imgArray[imgArray.length-1].PicUrl; 
//								console.log(JSON.stringify(vm.$data.HousePicture))
							};
							/*跟进信息*/
//							console.log(JSON.stringify(data.results.HouseFllow));
							mask.close();//关闭遮罩
							plus.nativeUI.closeWaiting(wating);
							/*判断是否收藏*/
							
//							console.log(baseUrl + 'API_House/IsFavorite?HouseID=' + vm.$data.info.HouseID + '&Perid=' + parseInt(localStorage.getItem('userId')) + '&BuyOrRent=' + BuyOrRent)
							mui.ajax(baseUrl + 'API_House/IsFavorite?HouseID=' + vm.$data.info.HouseID + '&Perid=' + parseInt(localStorage.getItem('userId')) + '&BuyOrRent=' + BuyOrRent, {
								type: 'post',
								success: function(data) {
									if(data.succ){
										if(data.results == 1){
											isCollectInit = 1;
											$('#love').text('取消收藏')
										}
									}else{
										mui.toast('检测收藏失败')
									}
//									console.log('是否收藏'+JSON.stringify(data))
								},
								error: function(xhr, type, errorThrown) {
									mui.toast('是否收藏' + type + '-' + errorThrown)
								}
							});
							//轮播图数字显示
//							console.log('录播个数')
							$(".djq").text((1)+'/'+vm.$data.HousePicture.length);
							document.querySelector('.mui-slider').addEventListener('slide', function(event) {
								var current_num = event.detail.slideNumber;
								$('.djq').text((current_num+1)+'/'+$(".mui-slider-indicator .mui-indicator").length);
							});
						} else if(data.succ&&data.results == null){
							mui.toast('已经是最后一个了亲')
							MyHouseSource.RowNum--;
						}else {
							mui.toast(data.msg.replace(/[a-zA-Z\(\)]/g, ''))
						}
					},
					error: function(xht, type, cont) {
						mui.toast(console.log('房源信息' + type + '--' + cont))
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
			};
			var date = new Date(obj),
				y = 1900 + date.getYear(),
				m = "0" + (date.getMonth() + 1),
				d = "0" + date.getDate();
			return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
		},
		orderby(index) {
			return this.CustomerLookFollw.length - index
		},
		jiequ(obj){
			var str = obj.toFixed(2);
			if(str.substr(str.length-1,1)=='0'){
				return obj.toFixed(1);
			};
			return obj.toFixed(2);
		},
	},
	mounted: function() {
//		this.getInfo();
	}
});

mui.init({
	swipeBack: true
});

mui.plusReady(function() {
	//获取传值
	var self = plus.webview.currentWebview();
	vm.$data.info.HouseID = self.HouseID;
	MyHouseSource = self.MyHouseSource;
	BuyOrRent = self.BuyOrRent;
	vm.$data.BuyOrRent = self.BuyOrRent;
	BuyOrRentUrl = self.detailUrl;
	vm.getInfo();
	wating = plus.nativeUI.showWaiting( "加载中..." );
	var scroll = mui('.mui-scroll-wrapper').scroll();
	document.querySelector('.mui-scroll-wrapper').addEventListener('scroll', function(e) {
		if(scroll.y <= -140) {
			$('header').addClass('headerAnimate');
		} else {
			$('header').removeClass('headerAnimate');
		}
	});
	console.log('传值'+JSON.stringify(MyHouseSource));
	
});


$("#nextPage").click(function(){
	MyHouseSource.RowNum++;
	console.log(MyHouseSource.RowNum);
	vm.getInfo();
});
$("#upPage").click(function(){
	if(MyHouseSource.RowNum <= 1){
		MyHouseSource.RowNum = 1;
		mui.toast('已经是第一个了')
	}else{
		MyHouseSource.RowNum--;
	};
	console.log(MyHouseSource.RowNum)
	vm.getInfo();
});
/*进入跟进*/
$('body').on('tap', '#toAddFollow', function(e) {
	openNewPage({
		url: '_www/html/Housing/FollowUp.html',
		data: {
			_housename: vm.$data.detail.Housename+vm.$data.detail.Builder+vm.$data.detail.Unit+vm.$data.detail.fang,
			RoomID: vm.$data.detail.RoomID,
			HouseID: vm.$data.detail.HouseId,
			BuyOrRent:BuyOrRent,
		}
	});
	return false;
});
/*收藏ajax*/
mui('.mui-bar').on('tap', '#love', function() {
	var _this = this;
	if(isCollectInit == 0){
		console.log('走收藏')
//		console.log(baseUrl + 'API_House/FavoriteHouseInfo?HouseID=' + vm.$data.info.HouseID + '&Perid=' + parseInt(localStorage.getItem('userId')) + '&BuyOrRent=' + vm.$data.info.BuyOrRent)
		mui.ajax(baseUrl + 'API_House/FavoriteHouseInfo?HouseID=' + vm.$data.info.HouseID + '&Perid=' + parseInt(localStorage.getItem('userId')) + '&BuyOrRent=' + BuyOrRent, {
			type: 'post',
			success: function(data) {
				//console.log('收藏'+JSON.stringify(data))
				mui.toast(data.msg);
				_this.innerText = '取消收藏';
			},
			error: function(xhr, type, errorThrown) {
				mui.toast('收藏' + type + '-' + errorThrown)
			}
		});
		isCollectInit = 1;
	}else{
		console.log('取消收藏')
//		console.log(baseUrl + 'API_House/FavoriteHouseInfo?HouseID=' + vm.$data.info.HouseID + '&Perid=' + parseInt(localStorage.getItem('userId')) + '&BuyOrRent=' + vm.$data.info.BuyOrRent)
		mui.ajax(baseUrl + 'API_House/CancelFavorite?HouseID=' + vm.$data.info.HouseID + '&Perid=' + parseInt(localStorage.getItem('userId')) + '&BuyOrRent=' + BuyOrRent, {
			type: 'post',
			success: function(data) {
				//console.log('收藏'+JSON.stringify(data))
				mui.toast(data.msg);
				_this.innerText = '收藏';
				
			},
			error: function(xhr, type, errorThrown) {
				mui.toast('取消收藏' + type + '-' + errorThrown)
			}
		});
		isCollectInit = 0
		
	}
});

mui.previewImage();
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});


$(function() {

//	//角色信息调用电话接口
//	$('.jueseMsg').on('tap', '.mui-icon-phone', function() {
//		plus.device.dial($(this).prev().children('.js_telNumber').text(), true);
//	});
	
	//基本信息显示更多
	$('.ask-to-buy').on('tap', '.down', function() {
		var curHeight = $('.topMessage').height();
		var autoHeight = $('.topMessage').css('height', 'auto').height();
		if($(this).children('span').hasClass('mui-icon-arrowdown')) {
			$('.topMessage').height(curHeight).animate({
				"height": autoHeight + 'px'
			}, 200);
			$('.down span').attr('class', 'mui-icon mui-icon-arrowup');
		} else {
			$('.topMessage').animate({
				'height': '7.1rem'
			}, 200);
			$('.down span').attr('class', 'mui-icon mui-icon-arrowdown');
		}
	});
	//轮播图
//	$(".djq").text((1) + '/' + vm.$data.HousePicture.length);
//	document.querySelector('.mui-slider').addEventListener('slide', function(event) {
//		var current_num = event.detail.slideNumber;
//		$('.djq').text((current_num + 1) + '/' + vm.$data.HousePicture.length.length);
//	});
});
//
/*上传实勘图片*/
$('#toaddPic').on('tap', function() {
	/*判断是否有权限上传*/
	console.log(baseUrl + 'API_House/UploadCheck?HouseId='+vm.$data.info.HouseID+'&ImgType=1&UserId='+parseInt(localStorage.getItem('userId')))
	mui.ajax(baseUrl + 'API_House/UploadCheck?HouseId='+vm.$data.info.HouseID+'&ImgType=1&UserId='+parseInt(localStorage.getItem('userId')), {
		type: 'post',
		success: function(data) {
			console.log(JSON.stringify(data))
			if(data.succ&&data.results){
				/*去上传页面*/
				openNewPage({
					url: '_www/html/Housing/addPic.html',
					data: {
						roomId:vm.$data.detail.RoomID,
						HouseID:vm.$data.info.HouseID
					}
				});
//				mui.toast(data.msg);
			}else{
				mui.toast(data.msg)
			}
		},
		error: function(xhr, type, errorThrown) {
			mui.toast('检测是否有权限上传图片' + type + '-' + errorThrown)
		}
	});
	
});
/*上传钥匙委托*/
$('#toaddKeyEntrust').on('tap', function() {
	/*判断是否有权限上传*/
	console.log(baseUrl + 'API_House/UploadCheck?HouseId='+vm.$data.info.HouseID+'&ImgType=2&UserId='+parseInt(localStorage.getItem('userId')))
	mui.ajax(baseUrl + 'API_House/UploadCheck?HouseId='+vm.$data.info.HouseID+'&ImgType=2&UserId='+parseInt(localStorage.getItem('userId')), {
		type: 'post',
		success: function(data) {
			console.log(JSON.stringify(data))
			if(data.succ&&data.results){
				/*去上传页面*/
				openNewPage({
					url: '_www/html/Housing/addKeyEntrust.html',
					data: {
						roomId:vm.$data.detail.RoomID,
						HouseID:vm.$data.info.HouseID
					}
				});
//				mui.toast(data.msg);
			}else{
				mui.toast(data.msg)
			}
		},
		error: function(xhr, type, errorThrown) {
			mui.toast('检测是否有权限上传图片' + type + '-' + errorThrown)
		}
	});
	
});
/*上传买卖独家委托*/
$('#toaddExclusiveEntrust').on('tap', function() {
	/*判断是否有权限上传*/
	console.log(baseUrl + 'API_House/UploadCheck?HouseId='+vm.$data.info.HouseID+'&ImgType=3&UserId='+parseInt(localStorage.getItem('userId')))
	mui.ajax(baseUrl + 'API_House/UploadCheck?HouseId='+vm.$data.info.HouseID+'&ImgType=3&UserId='+parseInt(localStorage.getItem('userId')), {
		type: 'post',
		success: function(data) {
			console.log(JSON.stringify(data))
			if(data.succ&&data.results){
				/*去上传页面*/
				openNewPage({
					url: '_www/html/Housing/addExclusiveEntrust.html',
					data: {
						roomId:vm.$data.detail.RoomID,
						HouseID:vm.$data.info.HouseID
					}
					
				});
//				mui.toast(data.msg);
			}else{
				mui.toast(data.msg)
			}
		},
		error: function(xhr, type, errorThrown) {
			mui.toast('检测是否有权限上传图片' + type + '-' + errorThrown)
		}
	});
	
});
/*上传租赁独家委托*/
$('#toaddRentEntrust').on('tap', function() {
	/*判断是否有权限上传*/
	console.log(baseUrl + 'API_House/UploadCheck?HouseId='+vm.$data.info.HouseID+'&ImgType=6&UserId='+parseInt(localStorage.getItem('userId')))
	mui.ajax(baseUrl + 'API_House/UploadCheck?HouseId='+vm.$data.info.HouseID+'&ImgType=6&UserId='+parseInt(localStorage.getItem('userId')), {
		type: 'post',
		success: function(data) {
			console.log(JSON.stringify(data))
			if(data.succ&&data.results){
				/*去上传页面*/
				openNewPage({
					url: '_www/html/Housing/addRentEntrust.html',
					data: {
						roomId:vm.$data.detail.RoomID,
						HouseID:vm.$data.info.HouseID
					}
				});
//				mui.toast(data.msg);
			}else{
				mui.toast(data.msg)
			}
		},
		error: function(xhr, type, errorThrown) {
			mui.toast('检测是否有权限上传图片' + type + '-' + errorThrown)
		}
	});
	
});
/*上传书面委托*/
$('#toapplyWritten').on('tap', function() {
	/*判断是否有权限上传*/
	console.log(baseUrl + 'API_House/UploadCheck?HouseId='+vm.$data.info.HouseID+'&ImgType=7&UserId='+parseInt(localStorage.getItem('userId')))
	mui.ajax(baseUrl + 'API_House/UploadCheck?HouseId='+vm.$data.info.HouseID+'&ImgType=7&UserId='+parseInt(localStorage.getItem('userId')), {
		type: 'post',
		success: function(data) {
			console.log(JSON.stringify(data))
			if(data.succ&&data.results){
				/*去上传页面*/
				openNewPage({
					url: '_www/html/Housing/applyWrittenEntrust.html',
					data: {
						roomId:vm.$data.detail.RoomID,
						HouseID:vm.$data.info.HouseID
					}
				});
//				mui.toast(data.msg);
			}else{
				mui.toast(data.msg)
			}
		},
		error: function(xhr, type, errorThrown) {
			mui.toast('检测是否有权限上传图片' + type + '-' + errorThrown)
		}
	});
	
});

/*去计算器*/
openNewPage({
	btn: '#jisuanqi',
	url: '_www/html/personalCenter/Mortgage/Dksl2.html',
	data: {
//		roomId:vm.$data.detail.RoomID
	}
});
////跳转跟进传参等
//openNewPage({
//	btn: '#toAddFollow',
//	url: '_www/html/myHousingResources/addFollowUp.html',
//	data: {}
//});
/*head bg toggle*/

/*刷新页面*/
window.addEventListener("shuaxin", function(e) {
	vm.getInfo();
//	plus.webview.currentWebview().reload(true)//刷新当前页面
});