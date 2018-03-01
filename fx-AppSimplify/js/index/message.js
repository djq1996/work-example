var ids = localStorage.getItem('userId');
var page = 1;
var size = 10; 
var count;
daishenpi();
//点击切换 并判断执行ajax
$('.tabHead li').on('tap',function(){
	$(this).addClass('tabHead-active').siblings().removeClass('tabHead-active');
	if($('#dsp').hasClass('tabHead-active')){
		$('.tabContent .mui-table-view').empty();
		page = 1;
		size = 10; 
		daishenpi();
	}else if($('#ysp').hasClass('tabHead-active')){
		$('.tabContent .mui-table-view').empty();
		page = 1;
		size = 10; 
		yishenpi();
	}else if($('#gj').hasClass('tabHead-active')){
		$('.tabContent .mui-table-view').empty();
		page = 1;
		size = 10; 
		genjin();
	}else if($('#jdzy').hasClass('tabHead-active')){
		$('.tabContent .mui-table-view').empty();
		page = 1;
		size = 10; 
		jiangdiao();
	}
})
//消息提醒待审批数据
	function daishenpi(){
		mui.ajax(baseUrl+'API_Home/WiatCheckList?UserId='+ids+'&Page='+page+'&Size='+size,{
			"dataType": "json",
			"type": "post", 
			success: function(data){
				if(data.succ && data.results != null){
					var _str = '';
					for(var i=0; i<data.results.length; i++){
						var optionTimes = data.results[i].optiontime.substr(0,10);
						_str += '<li class="mui-table-view-cell">'+
									'<a href="javascript:;">'+
							            '<img class="mui-media-object mui-pull-left" src="../../img/index/daishenpi.png">'+
							            '<div class="mui-media-body">'+
							            	'<div class="mui-row">'+
							            		'<div class="mui-col-xs-9">'+
							            			'<h3 class="mui-ellipsis">'+data.results[i].Explain+'</h3>'+
							                		'<p class="mui-ellipsis">'+data.results[i].Housename+'-'+data.results[i].Builder+'-'+data.results[i].Unit+'-'+data.results[i].fang+'</p>'+
							            		'</div>'+
							            		'<div class="mui-col-xs-3 time">'+
							            			'<span>'+optionTimes+'</span>'+
							            		'</div>'+
							            	'</div>'+
							            '</div>'+
							       '</a>'+ 
								'</li>'
					}
					$('.noinfo').hide();
					$('.noinfoImg').hide();
					$('.tabContent ul').append(_str);
				}else{
					if(data.count === 0){
						$('.noinfo').hide();
						$('.noinfoImg').show();
					}else if(data.count != 0){
						$('.noinfoImg').hide();
						$('.noinfo').show();
						setTimeout(function(){ $('.noinfo').fadeOut(); },1500);
					}
				}
			},
			error: function(xhr,type,error){
				console.log(error);
			}
		})
	}
//消息提醒已审批数据
	function yishenpi(){
		mui.ajax(baseUrl+'API_Home/MyChecksList?UserId='+ids+'&Page='+page+'&Size='+size,{
			"dataType": "json",
			"type": "post",
			success: function(data){
				if(data.succ && data.results != null){
					var _strs = '',
						imgUrl = '';
					for(var i=0; i<data.results.length; i++){
						var status = data.results[i].Status;
						if(data.results[i].Status == 2){
							imgUrl = '../../img/index/yishenpi.png';
						}else if(data.results[i].Status == 3){
							imgUrl = '../../img/index/false.png';
						};
						var optionTimes = data.results[i].optiontime.substr(0,10);
						_strs += '<li class="mui-table-view-cell">'+
									'<a href="javascript:;">'+
							            '<img class="mui-media-object  mui-pull-left" src="'+imgUrl+'">'+
							            '<div class="mui-media-body">'+
							            	'<div class="mui-row">'+
							            		'<div class="mui-col-xs-9">'+
							            			'<h3 class="mui-ellipsis">'+data.results[i].Explain+'</h3>'+
							                		'<p class="mui-ellipsis">'+data.results[i].Housename+'-'+data.results[i].Builder+'-'+data.results[i].Unit+'-'+data.results[i].fang+'</p>'+
							            		'</div>'+
							            		'<div class="mui-col-xs-3 time">'+
							            			'<span>'+optionTimes+'</span>'+
							            		'</div>'+
							            	'</div>'+
							            '</div>'+
							        '</a>'+
								'</li>'
					}
					$('.noinfo').hide();
					$('.noinfoImg').hide();
					$('.tabContent ul').append(_strs);
				}else{
					if(data.count === 0){
						$('.noinfo').hide();
						$('.noinfoImg').show();
					}else if(data.count != 0){
						$('.noinfoImg').hide();
						$('.noinfo').show();
						setTimeout(function(){ $('.noinfo').fadeOut(); },1500);
					}
					
				}
			},error: function(xhr,type,error){
				console.log(error);
			}
		})
	}
//消息提醒跟进数据
	function genjin(){
		mui.ajax(baseUrl+'API_Home/MyRemindList?UserId='+ids+'&Page='+page+'&Size='+size,{
			"dataType": "json",
			"type": "post",
			success: function(data){
				console.log(baseUrl+'API_Home/MyRemindList?UserId='+ids+'&Page='+page+'&Size='+size)
				console.log(JSON.stringify(data))
				if(data.succ && data.results != null){
					var _strs = '';
					for(var i=0; i<data.results.length; i++){
						var remindtime = data.results[i]._remindtime.substr(0,10);
						if(data.results[i]._houseorcust==1){
							_strs +='<li class="mui-table-view-cell">'+ 
										'<a href="javascript:;">'+
								            '<img class="mui-media-object mui-pull-left" src="../../img/index/genjin.png">'+
								            '<div class="mui-media-body">'+
						            			'<h3 class="mui-ellipsis"><span>房源跟进提醒：</span> <span>发起时间：'+remindtime+'</span></h3>'+
						                		'<p class="mui-ellipsis"> 房源名称：<span>'+data.results[i]._sourceinfo+'</span></p>'+
						                		'<p id="remind_content">提醒内容：'+data.results[i]._remindcontext+'</p>'+
								            '</div>'+ 
								       '</a>'+
									'</li>'
						}else{
							_strs +='<li class="mui-table-view-cell">'+ 
										'<a href="javascript:;">'+
								            '<img class="mui-media-object mui-pull-left" src="../../img/index/genjin.png">'+
								            '<div class="mui-media-body">'+
						            			'<h3 class="mui-ellipsis"><span>客源跟进提醒：</span> <span>发起时间：'+remindtime+'</span></h3>'+
						                		'<p class="mui-ellipsis"> 客户姓名：<span>'+data.results[i]._sourceinfo+'</span></p>'+
						                		'<p id="remind_content">提醒内容：'+data.results[i]._remindcontext+'</p>'+
								            '</div>'+ 
								       '</a>'+
									'</li>'
						}
					}
					$('.noinfo').hide();
					$('.noinfoImg').hide();
					$('.tabContent ul').append(_strs);
				}else{
					if(data.count === 0){
						$('.noinfo').hide();
						$('.noinfoImg').show();
					}else if(data.count != 0){
						$('.noinfoImg').hide();
						$('.noinfo').show();
						setTimeout(function(){ $('.noinfo').fadeOut(); },1500);
					}
				}
			},
			error: function(xhr,type,error){
				console.log(error);
			}
		})
	}
//消息提醒将掉资源
	function jiangdiao(){
		mui.ajax(baseUrl+'API_Home/DangerHouseOrCustList?UserId='+ids+'&Page='+page+'&Size='+size,{
			"dataType": "json",
			"type": "post",
			success: function(data){
				var _strs = '';
				if(data.succ && data.results != null){
					for(var i=0; i<data.results.length; i++){
						var jgtime = data.results[i].jgtime.substr(0,10);
						var HouseOrCust = data.results[i].HouseOrCust;
							if(HouseOrCust === 1){
								HouseOrCust = "房源";
							}else{
								HouseOrCust = "客源";       
							}
						_strs += '<li class="mui-table-view-cell" data-roomId="'+data.results[i].ID+'" data-PID="'+data.results[i].PId+'" data-type="'+data.results[i].BuyOrRent+'">'+
										'<a href="javascript:;">'+
								            '<img class="mui-media-object mui-pull-left" src="../../img/index/u65.png">'+
								            '<div class="mui-media-body">'+
								            	'<div class="mui-row">'+
								            		'<div class="mui-col-xs-9">'+
								            			'<h3 class="mui-ellipsis toType">'+HouseOrCust+'</h3>'+
								                		'<p class="mui-ellipsis housesName">'+data.results[i].SouseInfo+'</p>'+
								            		'</div>'+
								            		'<div class="mui-col-xs-3 time">'+
								            			'<span>'+jgtime+'</span>'+
								            		'</div>'+
								            	'</div>'+
								            '</div>'+
								        '</a>'+
									'</li>'
					}
					$('.noinfo').hide();
					$('.noinfoImg').hide();
					$('.tabContent ul').append(_strs);
				}else{
					if(data.count === 0){
						$('.noinfo').hide();
						$('.noinfoImg').show();
					}else if(data.count != 0){
						$('.noinfoImg').hide();
						$('.noinfo').show();
						setTimeout(function(){ $('.noinfo').fadeOut(); },1500);
					}
				}
			},
			error: function(xhr,type,error){
				console.log(error);
			}
		})
	}
/*将掉资源跳转*/
	$('.tabContent').on('tap','.mui-table-view-cell',function(){
		if($(this).find('.toType').text() == '房源'){
			openNewPage({
				url: '_www/html/Housing/FollowUp.html',
				data: {
					HouseID: $(this).attr('data-PID'),
					RoomID: $(this).attr('data-roomId'),
					BuyOrRent: $(this).attr('data-type'),
					_housename:$(this).find('.housesName').text()
				}
			});
		}else if($(this).find('.toType').text() == '客源'){
			openNewPage({
				url: '_www/html/myCustomers/addFollowUp.html',
				data: {
					CustomerName:$(this).find('.housesName').text(),
					CustomerId: $(this).attr('data-PID'),
					BuyOrRent: $(this).attr('data-type'),
				}
			});
		}
	})
/*上拉加载  下拉刷新*/
	mui('.mui-scroll-wrapper').pullRefresh({
		down: {
			callback: function() {
				mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
			}
		},
		up: {
			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: function() {
				page++;
				setTimeout(function() {
					if($('#dsp').hasClass('tabHead-active')){
						
						daishenpi();
					}else if($('#ysp').hasClass('tabHead-active')){
						
						yishenpi();
					}else if($('#gj').hasClass('tabHead-active')){
						
						genjin();
					}else if($('#jdzy').hasClass('tabHead-active')){
						
						jiangdiao();
					}
					mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
				}, 1500);
			}
		}
	});




	