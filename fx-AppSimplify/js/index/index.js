mui.ready(function() {
	mui.init();
	var mask = mui.createMask(), //callback为用户点击蒙版时自动执行的回调；
		wating;
	mask.show(); //显示遮罩
	var ids = localStorage.getItem('userId');
	var userName = localStorage.getItem('userName');
	mui.plusReady(function(e) {
		wating = plus.nativeUI.showWaiting("加载中...");
		/*获取父级id*/
		var parentId = plus.webview.currentWebview().opener();
		/*加载首页数据*/
		loadIndexInfo();

		/*去客源*/
		mui('body').on('tap', '#toCust', function() {
			mui.fire(parentId, 'goTab', {
				index: 3
			});
		});
		/*去房源*/
		mui('body').on('tap', '#toHouse', function() {
			mui.fire(parentId, 'goTab', {
				index: 2
			});
		});
		//		openNewPage({
		//			btn: '',
		//			url: '_www/html/myCustomers/customersLists.html',
		//			data: {}
		//		});
	});
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0006 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	//mui('.honorBox').scroll({
	//	deceleration: 0.0006 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	//});
	/*登录名数据接口*/

	function loadIndexInfo() {

		mui.ajax(baseUrl + 'API_Home/HomeIndex?UserId=' + ids, {
			dataType: "json",
			type: "post",
			success: function(data) {
				console.log('个人信息' + JSON.stringify(data));
				/*判断图片加载失败显示默认图片*/
				var _html;
				if(data.succ && data.results != null) {
					_html = '<div class="head-portrait"><img src="' + data.results.MyBus.HeadeImage + '" onerror = "src = \'img/head.png\' " ></div>' +
						'<div class="head-name">' + data.results.MyBus.LoginName + '</div>' +
						'<div class="head-job">' + data.results.MyBus.DepShopName + ' | ' + data.results.MyBus.PositionName + '</div>';

				} else {
					_html = '<div class="head-portrait"><img src="img/index/honorUser.png" /></div>' +
						'<div class="head-name">admin</div>' +
						'<div class="head-job">' +
						'朝阳店 | 管理员' +
						'</div>'
				};
				$('#toPersonalCenter').html(_html);
				/*业绩排名数据接口*/
				if(data.results.MyBus != null) {
					var StatisticResultMid = '暂无业绩';
					if(data.results.MyBus.StatisticResultMid != null) {
						StatisticResultMid = data.results.MyBus.StatisticResultMid.num;
					};
					var datas = data.results.MyBus;
					var custNum = datas.SellCusUserCount + datas.RentCusUserCount + datas.PriSellCusUserCount + datas.PriRentCusUserCount;
					var _str = '<ul class=""><li id="toHouse"><p>房源总量</p><a href="">' + (datas.SellHouseUserCount + datas.RentHouseUserCount) + '</a></li>' +
						'<li id="toCust"><p>客户总量</p><a href="">' + custNum + '</a></li>' +
						'</ul>' +
						'<ul class=""><li><p>房源跟进</p><a href="">' + datas.HouseFollowCount + '</a></li>' +
						'<li><p>客源跟进</p><a href="">' + datas.CustomerFollowCount + '</a></li></ul>' +
						'<ul class=""><li><p>带看量</p><a href="">' + datas.FollowCount + '</a></li>' +
						'<li id="toYeJi"><p>业绩排名</p><a href="">' + StatisticResultMid + '</a></li>' +
						'</ul>'
				} else {
					var _str = '<ul class=""><li id="toHouse"><p>房源总量</p><a href="">0</a></li>' +
						'<li id="toCust"><p>客户总量</p><a href="">0</a></li>' +
						'</ul>' +
						'<ul class=""><li><p>房源跟进</p><a href="">0</a></li>' +
						'<li><p>客源跟进</p><a href="">0</a></li></ul>' +
						'<ul class=""><li><p>带看量</p><a href="">0</a></li>' +
						'<li id="toYeJi"><p>业绩排名</p><a href="">0</a></li>' +
						'</ul>'
					//				$('.my-business').html(_str);
				};
				$('.my-business').html(_str);
				/*荣誉榜数据接口*/
				(function() {
					var str = '';
					var perIdArr = [];
					var AllTotal = [];
					var total = [];
					var headKuang = ['first', 'second', 'third'];
					if(data.results.listRongYu != null) {
						for(var i = 0; i < data.results.listRongYu.length; i++) {
							if(data.results.listRongYu[i].AllTotal === 0){
								data.results.listRongYu[i].AllTotal = 0;
							}
							str += '<li>' +
								'<div class="head-portrait ' + headKuang[i] + '"><img class="headImg" src="' + data.results.listRongYu[i].HeadeImage + '"onerror = "src = \'img/head.png\' " /></div>' +
								'<div class="head-name">' + data.results.listRongYu[i].UserName + '</div>' +
								'<div class="head-mendian">' + data.results.listRongYu[i].Companyname + '-' + data.results.listRongYu[i].AreaName + '-' + data.results.listRongYu[i].StoreName + '</div>' +
								'<div class="mui-row">' +
								'<div class="mui-col-xs-6 results">' +
								'<p class="results-name">租赁业绩</p>' +
								'<p class="results-number">' + data.results.listRongYu[i].Renttotal + '</p>' +
								'</div>' +
								'<div class="mui-col-xs-6 results">' +
								'<p class="results-name">出售业绩</p>' +
								'<p class="results-number">' + data.results.listRongYu[i].Selltotal + '</p>' +
								'</div>' +
								'</div><p style="color:#fff;font-size:12px;">总业绩</p>' +
								'<div class="total-first" style="color:#35b5e9;margin-bottom:-30px;" yejiSum="' + data.results.listRongYu[i].AllTotal + '">' + data.results.listRongYu[i].AllTotal + '</div><canvas id="_' + data.results.listRongYu[i].Perid + '" width="50" height="50">11</canvas>' +
								'</li>'
							perIdArr.push(data.results.listRongYu[i].Perid);
							AllTotal.push(data.results.listRongYu[i].AllTotal);
						}
						$('#tohonor .noinfo').hide();
						$('#tohonor ul').html(str);
						//计算
						for(var k = 0; k < AllTotal.length; k++) {
							var numTwoPer = Number((AllTotal[1] / AllTotal[0]).toFixed(2));
							var numThreePer = Number((AllTotal[2] / AllTotal[0]).toFixed(2));
							numTwoPer === NaN ? 0 : numTwoPer = numTwoPer;
							numThreePer === NaN ? 0 : numThreePer = numThreePer;
						}
						total.push(1, numTwoPer, numThreePer);
						for(var j = 0; j < perIdArr.length; j++) {
							drawCircle({
								id: '_' + perIdArr[j],
								color: '#35b5e9',
								angle: total[j],
								lineWidth: 2
							});
						}
					} else {
						var djq='';
						for(var i = 0; i < 3; i++) {
							 djq += '<li>' +
								'<div class="head-portrait ' + headKuang[i] + '"><img class="headImg" src = "img/head.png"/></div>' +
								'<div class="head-name">管理员</div>' +
								'<div class="head-mendian">北京地产 / 北京区 / 北京店 </div>' +
								'<div class="mui-row">' +
								'<div class="mui-col-xs-6 results">' +
								'<p class="results-name">租赁业绩</p>' +
								'<p class="results-number">0</p>' +
								'</div>' +
								'<div class="mui-col-xs-6 results">' +
								'<p class="results-name">出售业绩</p>' +
								'<p class="results-number">0</p>' +
								'</div>' +
								'</div><p style="color:#fff;font-size:12px;">总业绩</p>' +
								'<div class="total-first" style="color:#35b5e9;" yejiSum="">0</div>' +
								'</li>';
						};
						$('#tohonor ul').html(djq);
					};
				})();
				/*签约战报*/
				(function() {
					var str1 = '';
					if(data.results.listYeJi != null) {
						for(var i = 0; i < data.results.listYeJi.length; i++) {
							var HouseType = data.results.listYeJi[i].HouseType;
							if(HouseType == 1) {
								HouseType = "售";
							} else {
								HouseType = "租"
							}
							str1 += '<div class="r_list">' +
								'<div class="top">' +
								'<div class="t_userpic">' +
								'<img src="' + data.results.listYeJi[i].HeadeImage + '"onerror = "src = \'img/head.png\'"/>' +
								'</div>' +
								'<div class="t_message">' +
								'<div class="name">' +
								'<p>' + data.results.listYeJi[i].UserName + '</p>' +
								'<span>' + data.results.listYeJi[i].Companyname + '</span>-<span>' + data.results.listYeJi[i].AreaName + '</span>-<span class="store">' + data.results.listYeJi[i].StoreName + '</span>' +
								'</div>' +
								'<div class="text1">' +
								'<p>' + data.results.listYeJi[i].Propertyname + '</p>' +
								'</div>' +
								'<div class="text2">' +
								'<p>成交价：<span>' + data.results.listYeJi[i].SignPrice + '</span>元</p>' +
								'</div>' +
								'</div>' +
								'<div class="r_type">' + HouseType + '</div>' +
								'</div>' +
								'</div>'
						}
						$('.report .noinfo').hide();
						$('.report .r_content').html(str1);
//						if($('.report .r_content .r_list').length == 1) {
//							$('.report .r_content').html(strs);
//						}
					} else {
						$('.report .noinfo').show();
					};
				})();
				/*关闭等待框*/
				mask.close(); //关闭遮罩
				plus.nativeUI.closeWaiting(wating);
			},
			error: function(xhr, error, b) {
				console.log(error)
			}
		});
		
		/*通知公告接口*/
		$(document).ready(function() {
			page = 1;
			size = 1;
			var scrollHeight = 0; //滚动距离的总长
			var scrollTop = 0; //距离顶部的距离
			var bodyHeight = $('.mui-scroll-wrapper').height();
			dataAjax();
			document.querySelector('.mui-scroll').addEventListener('scroll', function(e) {
				scrollTop = -(e.detail.y);
				scrollHeight = $(this)[0].scrollHeight;
				if(scrollTop + bodyHeight >= scrollHeight) {
					setTimeout(function() {
						page++;
						dataAjax();
					}, 1000);
				}
			})
			function dataAjax() {
				mui.ajax(baseUrl + 'API_Home/NewsList?Page=' + page + '&Size=' + size, {
					"dataType": "json",
					"type": "post",
					success: function(data) {
						if(data.succ && data.results != null) {
							var str2 = '';
							for(var i = 0; i < data.results.length; i++) {
								var creatTime = data.results[i].F_Createtime,
									creatTime = creatTime.trim().substr(0, 10);
								str2 += '<div class="n_list" id="toNotice" data-id="' + data.results[i].id + '">' +
									'<div class="mui-row">' +
									'<div class="mui-col-xs-8">' + data.results[i].News_title + '</div>' +
									'<div class="mui-col-xs-4">' + creatTime + '</div>' +
									'<div class="n_listCon">' +
									'<p>' + data.results[i].F_Countent_Sub + '</p>' +
									'</div>' +
									'</div>' +
									'</div>'
							}
							$('.notice .n_content').append(str2);
							$('.load-style').show();
							$('.notice .noinfo').hide();
						} else {
							$('.load-style').hide();
							$('.notice .noinfo').show();
							setTimeout(function() {
								$('.notice .noinfo').fadeOut();
							}, 1500)
						}
					},
					error: function(xhr, error, b) {
						console.log(error);
					}
				})
			};
		})
	};
	/*--------------------跳转页面-----------------------*/
	/*进入通知公告详情*/
	mui('body').on('tap', '#toNotice', function() {
		openNewPage({
			url: '_www/html/index/notice.html',
			data: {
				NoticeId: $(this).attr('data-id')
			}
		});
	});
	/*去排名*/
	openNewPage({
		btn: '#tohonor',
		url: '_www/html/personalCenter/raking.html',
		data: {}
	});
	/*去个人中心*/
	openNewPage({
		btn: '#toPersonalCenter',
		url: '_www/html/personalCenter/personalCenter.html',
		data: {}
	});
	/*去消息提醒*/
	openNewPage({
		btn: '#toMessage',
		url: '_www/html/index/message.html',
		data: {}
	});

	/*去业绩排名*/
	openNewPage({
		btn: '#toYeJi',
		url: '_www/html/personalCenter/raking.html',
		data: {}
	});
	/*总业绩圆圈调用*/
	function drawCircle(_options) {
		var options = _options || {}; //获取或定义options对象;
		options.angle = options.angle || 1; //定义默认角度1为360度(角度范围 0-1);
		options.color = options.color || '#fff'; //定义默认颜色（包括字体和边框颜色）;
		options.lineWidth = options.lineWidth || 10; //定义默认圆描边的宽度;
		options.lineCap = options.lineCap || 'square'; //定义描边的样式，默认为直角边，round 为圆角

		var oBoxOne = document.getElementById(options.id);
		var sCenter = oBoxOne.width / 2; //获取canvas元素的中心点;
		var ctx = oBoxOne.getContext('2d');
		var nBegin = Math.PI / 2; //定义起始角度;
		var nEnd = Math.PI * 2; //定义结束角度;
		var grd = ctx.createLinearGradient(0, 0, oBoxOne.width, 0); //grd定义为描边渐变样式;
		grd.addColorStop(0, 'red');
		grd.addColorStop(0.5, 'yellow');
		grd.addColorStop(1, 'green');

		ctx.textAlign = 'center'; //定义字体居中;
		ctx.font = 'normal normal  16px Arial'; //定义字体加粗大小字体样式;
		ctx.fillStyle = options.color == 'grd' ? grd : options.color; //判断文字填充样式为颜色，还是渐变色;
		ctx.fillText((options.angle * 100) + '%', sCenter, sCenter * 1.17); //设置填充文字;
		/*ctx.strokeStyle = grd;    //设置描边样式为渐变色;
		ctx.strokeText((options.angle * 100) + '%', sCenter, sCenter);    //设置描边文字(即镂空文字);*/
		ctx.lineCap = options.lineCap;
		ctx.strokeStyle = options.color == 'grd' ? grd : options.color;
		ctx.lineWidth = options.lineWidth;

		ctx.beginPath(); //设置起始路径，这段绘制360度背景;
		ctx.strokeStyle = '#D8D8D8';
		ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, nEnd, false);
		ctx.stroke();

		var imd = ctx.getImageData(0, 0, 240, 240);

		function draw(current) { //该函数实现角度绘制;
			ctx.putImageData(imd, 0, 0);
			ctx.beginPath();
			ctx.strokeStyle = options.color == 'grd' ? grd : options.color;
			ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, (nEnd * current) - nBegin, false);
			ctx.stroke();
		}
		var t = 0;
		var timer = null;

		function loadCanvas(angle) { //该函数循环绘制指定角度，实现加载动画;
			timer = setInterval(function() {
				if(t > angle) {
					draw(options.angle);
					clearInterval(timer);
				} else {
					draw(t);
					t += 0.02;
				}
			}, 20);
		}
		loadCanvas(options.angle); //载入百度比角度  0-1 范围;
		timer = null;

	};

	/*刷新页面*/
	window.addEventListener("shuaxin", function(e) {
		$('.notice .n_content').empty()
		loadIndexInfo();
		mui('#scrollTop').scroll().scrollTo(0, 0, 100);
		//plus.webview.currentWebview().reload(true) //刷新当前页面
	});
})

//$(function(){
//	//查询用户是否有新消息
//	mui.ajax(AjaxUrl+'/wrokDesk/getHasMessage?userId='+userId,{
//		dataType:'json',
//		type:'get',
//		timeout: 10000,
//		success:function(data){
//			if(data==true){
//				$(".news a").attr('class','icon-news-new');
//			}else{
//				$(".news a").attr('class','icon-news');
//			}
//		}
//	});
// 
//});