var wating;
mui.plusReady(function(){
	wating = plus.nativeUI.showWaiting( "加载中..." );
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	var ids = localStorage.getItem('userId'),
	 	SeeLevel = localStorage.getItem('SeeLevel'),
	 	depId = localStorage.getItem('depId'),
	 	self = plus.webview.currentWebview(),
	 	page = 1,
	 	size = 20,
	 	louId = null;
	louId = self.gardenSID;
	$('.mui-title').text(self.name);
//点击跳转传值
	mui('body').on('tap', '#toRoom', function() {
		openNewPage({
			url: '_www/html/houses/housesRoom.html',
			data:{
				name:self.name,
				BuilderID : $(this).find('.name').attr('data-id'),
				gardenSID: self.gardenSID,
				houseNum:$(this).find('.name').text()
			}
		});
	});
	houseLou();
//楼盘楼数据接口
	function houseLou(){
		mui.ajax(baseUrl+'/API_Responsible/GetUnitData?userid='+ids+'&dataType='+SeeLevel+'&gardenSID='+louId+'&deptId='+depId+'&PageIndex='+page+'&PageSize='+size, {
			dataType: 'json',
			type: 'get',
			//timeout: 10000,
			success: function(data) {
				var _html = '';
				if(data.succ && data.results != null){
					for(var i=0; i<data.results.length; i++) {
						_html +='<li class="mui-table-view-cell" id="toRoom">'+
			                		'<a class="mui-navigate-right">'+
			                			'<span class="name" data-id="'+data.results[i].BuilderID+'">'+data.results[i].BuilderName+'</span>'+
			                			'<span class="mui-badge mui-badge-inverted num">总共<i>'+data.results[i].con+'</i>户</span>'+
									'</a>'+
			                	'</li>'
					};
					$('.noinfo').hide();
					$('.noinfoImg').hide();
					$('.mui-table-view').append(_html);
					
				}else{
					if(data.count === 0){
						$('.noinfo').hide();
						$('.noinfoImg').show();
					}else if(data.count != 0){
						$('.noinfoImg').hide();
						$('.noinfo').show();
						setTimeout(function(){ $('.noinfo').fadeOut(); },1500);
					};
				};
				/*关闭等待框*/
				plus.nativeUI.closeWaiting(wating);
			},
			error:function(xhr,error,b){
				console.log(error)
			}
		})
	}
	
//列表上拉加载，下拉刷新
	mui('.mui-scroll-wrapper').pullRefresh({
		down: {
			callback: function() {
				setTimeout(function() {
					mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
					$('.mui-table-view').empty();	
					page=1;
					size=10;
					houseLou();
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
					houseLou();
					mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
				}, 1500);
			}
		}
	});
})