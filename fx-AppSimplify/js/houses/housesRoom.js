var BuilderID = null,
	ids = localStorage.getItem('userId'),
	SeeLevel = localStorage.getItem('SeeLevel'),
	depId = localStorage.getItem('depId'),
	page = 1,
	size = 20,
	searchResult = null;
mui.plusReady(function(){ 
	var self = plus.webview.currentWebview();
	BuilderID = self.BuilderID;
//	console.log('id--'+ids+'--datatype--'+SeeLevel+'--gar--'+self.gardenSID+'--buil--'+BuilderID+'--dep--'+depId)
//设置标题
	$('#app .mui-title').text(self.name+"#"+self.houseNum);
//加载数据
	houseRoom(searchResult);
	function houseRoom(searchResult){
		mui.ajax(baseUrl+'API_Responsible/GetRoomData?userid='+ids+'&dataType='+SeeLevel+'&gardenSID='+self.gardenSID+'&builderID='+BuilderID+'&deptId='+depId+'&PageIndex='+page+'&PageSize='+size+'&roomNum='+searchResult,{
			"dataType": 'json',
			"type": 'get',
			success:function(data){
				console.log(JSON.stringify(data));
				var _html = '';
				if(data.succ && data.results != null){
					for(var i=0;i<data.results.length;i++){
						UnitAsName = data.results[i].UnitAsName;
						if(UnitAsName == ""){ 
							UnitAsName = "/"
						}
						var ResidenceStatus = escape({
							type:'liveStatusType',
							value: data.results[i].ResidenceStatus 
						})
						_html += '<li class="mui-table-view-cell" id="toHouseDetails"  data-count="'+data.count+'" data-houseid="'+data.results[i].HouseID+'" data-room ="'+data.results[i].RoomID+'"  data-floor="'+data.results[i].FloorNumber+'" data-rowNum="'+data.results[i].RowNum+'">'+
								 	'<p class="fjh">'+UnitAsName+'单元</p>'+ 
									'<p class="cz fang">'+data.results[i].RoomNum+'室</p> '+
									'<p class="cs" style="width:20%;">'+data.results[i].IsRent+'</p>'+
					                '<p class="cs">'+data.results[i].IsSell+'</p>'+
									'<p class="cs">'+ResidenceStatus+'</p>'+
								 '</li>'
					} 
					$('#default .mui-table-view').append(_html);
					/*搜索下拉*/
					var _str = '<li>'+UnitAsName+'单元</li>';
					mui('.select .s_secondul')[0].insertAdjacentHTML('beforeend',_str);
					$('.noinfo').hide();
					$('.noinfoImg').hide();
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
			error: function(xhr,error,b){
				console.log(error);
			}
		})
	}
//搜索页输入时
	$('#search input[type=search]').on('blur',function(){
		if($(this).val()==""){
			$('#search .historyBox').show();
			$('#search .resultBox').hide();
		}else{
			$('#search .historyBox').hide();
			$('#search .resultBox').show();
		} 
		$('.resultBox .mui-table-view').empty();
		var searchVal = $(this).val();
		mui.ajax(baseUrl+'API_Responsible/GetRoomData?userid='+ids+'&dataType='+SeeLevel+'&gardenSID='+self.gardenSID+'&builderID='+BuilderID+'&deptId='+depId+'&roomNum='+searchVal+'&PageIndex='+page+'&PageSize='+size,{
			dataType: 'json',
			type: 'get',
			//timeout: 10000,
			success:function(data){
				if(data.succ && data.results != null){
					for(var i=0;i<data.results.length;i++){
						var str='<li class="mui-table-view-cell">';
						str+='<a class="mui-navigate-right">'+data.results[i].RoomNum+'</a></li>';
						mui('.resultBox .mui-table-view')[0].insertAdjacentHTML('beforeend', str);
					}
				}else{
					mui.toast('没有此信息');				
				}
			}
		});
	});
//点击搜索结果清空列表数据
	$('.resultBox').on('tap','.mui-table-view-cell',function(){
		searchResult = $(this).text().trim();
		$('.contBox .mui-table-view').empty();
		houseRoom(searchResult);
	});
//点击跳转 传值   
	mui('body').on('tap','#toHouseDetails',function(){
		openNewPage({
			url: '_www/html/houses/houseDetial.html',
			data:{
				RoomId : parseInt($(this).attr('data-room')),		
				HouseId : parseInt($(this).attr('data-houseid')),	
				Floor : parseInt($(this).attr('data-floor')),		//楼层
				name : self.name,									//名称	
				Builder: self.houseNum,								//坐落
				fang : parseInt($(this).find('.fang').text()),		//房间
				UnitAsName : $(this).find('.fjh').text(),			//单元
				gardenSID : self.gardenSID,
				builders : self.BuilderID,
				rowNum : parseInt($(this).attr('data-rowNum')),
				counts: parseInt($(this).attr('data-count')),
			}
		});
	})	
//列表上拉加载，下拉刷新
	mui('.contBox .mui-scroll-wrapper').pullRefresh({
		down: {
			callback: function() {
				setTimeout(function() {
					mui('.contBox .mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
					$('.mui-table-view').empty();	
					page=1;
					size=20; 
					houseRoom();
					mui.toast('加载成功')
				}, 1500);
			}
		},
		up: {
			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉   加载控件上显示的标题内容
			contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: function() {
				setTimeout(function() {
					page++;
					houseRoom();
					mui('.contBox .mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
				}, 1500);
			}
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
			if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
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
//输入框下拉
	$('.search_middle').on('tap','.select',function(){
		if($(this).find('span').hasClass('active')){
			$(this).find('span').removeClass('active');
			$('.s_secondul').slideUp(200);
		}else{
			$(this).find('span').addClass('active');
			$('.s_secondul').slideDown(200);
		}
	});
//下拉选择
	$('.s_secondul').on('tap','li',function(){
		var _text=$(this).text();
		$('.select span').text(_text);
	});
//页面跳转时清空搜索条件
	$('.search_middle').on('tap','a[href="#search"]',function(){
		if($('#search input[type=search]').val()==""){
			$('#search .historyBox').show();
			$('#search .resultBox').hide();
		}else{
			$('#search .historyBox').hide();
			$('#search .resultBox').show();
		}
		$('.resultBox .mui-table-view .mui-table-view-cell').remove();
	});
//点击搜索 的结果
	$('.historyBox').on("tap",'.mui-table-view-cell a',function(){
		var _txt = $(this).text().trim();
		$('#search input[type=search]').val('');
		$(".searchI").text(_txt);
		setTimeout(function(){
			viewApi.back();
		},250)
	});
	var housesRoom_history=[];
	$('.resultBox').on("tap",'.mui-table-view-cell a',function(){
			var _txt = $(this).text().trim();
			$(".searchI").text(_txt);
			$('#search input[type=search]').val('');
			housesRoom_history.push({
				text:_txt
			});
			localStorage.setItem('housesRoom_history',JSON.stringify(housesRoom_history));
			//删除子节点
            $('.historyBox .mui-table-view .mui-table-view-cell').remove();
			for(var i=0;i<JSON.parse(localStorage.getItem('housesRoom_history')).length;i++){
				var historyStr='<li class="mui-table-view-cell">';
				historyStr+='<a class="mui-navigate-right">'+JSON.parse(localStorage.getItem('housesRoom_history'))[i].text+'</a></li>';
				mui('.historyBox .mui-table-view')[0].insertAdjacentHTML('beforeend', historyStr);
			}
			setTimeout(function(){
				viewApi.back();
			},250)
		});	
//mui('.mui-scroll-wrapper').scroll({
//	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
//});