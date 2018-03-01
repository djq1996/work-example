	var vm = new Vue({
		el: "#v-app",
		data: {
			messages:{},
		},
		methods:{ 
			getMessage() {
				var jumpUrl = '';
				if(count == 1){
					jumpUrl = 'API_Responsible/GetRoomDataNextRow?PageIndex='+page+'&PageSize='+size+'&RowNum='+rowNum+'&userid='+userId+'&dataType='+SeeLevel+'&gardenSID='+gardenSID+'&builderID='+builders+'&deptId='+depId+'&roomNum='+fang
				}else{
					jumpUrl = 'API_Responsible/GetRoomDataNextRow?PageIndex='+page+'&PageSize='+size+'&RowNum='+rowNum+'&userid='+userId+'&dataType='+SeeLevel+'&gardenSID='+gardenSID+'&builderID='+builders+'&deptId='+depId
				};
				
				mui.ajax(baseUrl + jumpUrl,{
					dataType: 'json',
					type: 'get',
					success:function(data){
//						console.log(JSON.stringify(data));
						if(data.succ && data.results != null){
							/*基本信息*/
							vm.$data.messages = data.results;
							/*设置 楼 单元 房间*/
							$('.title p').text(vm.$data.messages.Builder+'/'+vm.$data.messages.Unit+'单元/'+vm.$data.messages.fang);	
							/*电话信息*/
							telMessage = function(){
								console.log(baseUrl+'API_Responsible/GetFXM_House_OwnerInfo?roomId='+vm.$data.messages.RoomID+'&userid='+userId);
								mui.ajax(baseUrl+'API_Responsible/GetFXM_House_OwnerInfo?roomId='+vm.$data.messages.RoomID+'&userid='+userId,{
									dataType: 'json',
									type: 'get',
									success:function(data){
										
										if(data.succ && data.results != null && data.results.length !== 0 ){
											var _html = '';
											for(var i=0;i<data.results.length;i++){
												var dataSex = data.results[i].Sex;
												if(dataSex == '1'){
													dataSex = "男";
												}else if(dataSex == '2'){
													dataSex = "女";
												}else{
													dataSex = "无";
												}
												_html += '<li class="mui-table-view-cell useMsg">'+
																'<div class="mui-row">'+
																	'<div class="mui-col-xs-8">'+
																		'<span class="name">'+data.results[i].ContactUser+'</span>'+
																		'<span class="sex">'+dataSex+'</span>'+
																		'<span class="qx">'+data.results[i].IsLookUser+'</span>'+
																	'</div>'+
																	'<div class="mui-col-xs-4">'+
																		'<div class="useiconGroup">'+
																			'<a class="state mui-icon mui-icon-compose mui-badge-primary mui-badge-inverted" data-OperatorID="'+data.results[i].OperatorID+'" data-phoneNum="'+data.results[i].Phone+'" data-PhoneId="'+data.results[i].OwnerPId+'" data-OwnerId="'+data.results[i].OwnerId+'"></a>'+
																			'<a class="phone mui-icon mui-icon-phone mui-badge-primary mui-badge-inverted" href="tel:'+data.results[i].Phone+'"></a>'+
																		'</div>'+
																	'</div>'+
																'</div>'+
															'</li>'
											}
											$('#item3mobile .noinfoImg').hide();
											$('#item3mobile .mui-table-view').html(_html);
										}else{
											$('#item3mobile .noinfoImg').show();
										}
									}
								});
							}
							$('#item3mobile .mui-table-view').empty();
							telMessage()
							/*跟进信息*/ 
							flowUp = function(){
								mui.ajax(baseUrl+'API_Responsible/GetFXM_House_PhoneBisPro?roomId='+vm.$data.messages.RoomID,{
									dataType: 'json',
									type: 'get',
									success:function(data){
										if(data.succ && data.results != null && data.results.length !== 0 ){
											var _html = '';
											for(var i=0;i<data.results.length;i++){
												PhoneState = escape({
													type:'state',
													value: data.results[i].AnswerStatus
												});
												_html += '<li class="mui-table-view-cell">'+
																'<div class="mui-row">'+
																	'<div class="l_title  mui-clearfix">'+
																		'<div class="text mui-pull-left">'+
																			'<span class="name">'+data.results[i].UserName+'</span>'+
																			'<span class="store">'+data.results[i].DepShopName+'</span>'+
																		'</div> '+
																		'<p class="time mui-pull-right">'+data.results[i].AddTime+'</p>'+
																	'</div>'+
																	'<div class="l_content">'+
																		'<p class="content">'+PhoneState+'&nbsp;&nbsp;'+data.results[i].Remark+'</p>'+
																	'</div>'+
																'</div>'+
															'</li>'
											}
											$('#item4mobile .noinfoImg').hide();
											$('#item4mobile .mui-table-view').html(_html);
										}else{
											$('#item4mobile .noinfoImg').show();
										}
									}
								});
							}
							$('#item4mobile .mui-table-view').empty();
							flowUp();
						}else{
							var messages = {  
								UseChannel:'',
								ResidenceStatus: '',
								AreaName:'',
								Construction_Ratio:0,
								Area_of_Structure: 0,
								Indoor_Area:0,
								Given_Area:0,
							};
							vm.$data.messages = messages;
							$('.title p').text('-/-/-');
							$('#item3mobile .mui-table-view').empty();
							$('#item3mobile .noinfoImg').show();
							$('#item4mobile .mui-table-view').empty();
							$('#item4mobile .noinfoImg').show();
						}
					},error:function(type,b,enry){
						console.log('详情获取'+type+enry)
					}
				})
			},
			yongtu(value,type){
				return escape({
					type: type,
					value: value
				})
			}
		}
	});
	var self,
	userName = localStorage.getItem('userName'),
	shopName = localStorage.getItem('shopName'),
	userId = localStorage.getItem('userId'),
	SeeLevel = localStorage.getItem('SeeLevel'),
	roomId,
	rowNum,
	fang,
	gardenSID ,
	builders ,
	depId = localStorage.getItem('depId'),
	page=1,
	size=1,
	count;
	mui.plusReady(function(){
		self = plus.webview.currentWebview(),
		roomId = self.RoomId,
		rowNum = self.rowNum,
		fang = self.fang,
		gardenSID = self.gardenSID,
		builders = self.builders,
		count = self.counts;
		//设置标题  
		$('.mui-title').text(self.name);
		$('.title h2 .name').text(self.name);
		vm.getMessage();
		/*去转出*/
		mui('body').on('tap','#realEstate',function(){
			if(vm.$data.messages.IsRent == 1&&vm.$data.messages.IsSell == 1){
				mui.toast('该房源已录入');
				return false;
			};
			/*判断单元名称是否为空*/
			var UnitAsName;
				if(vm.$data.messages.Unit==''){
					UnitAsName ='/单元';
				}else{
					UnitAsName = vm.$data.messages.Unit;
				};
			
//			console.log(vm.$data.messages.Unit+vm.$data.messages.Unit.length)
			openNewPage({
				url: '_www/html/houses/addHouses.html',
				data:{
					RoomId: vm.$data.messages.RoomID, 
					HouseId: vm.$data.messages.HouseId,
					name: self.name,
					Builder: vm.$data.messages.Builder,
					UnitAsName: UnitAsName,
					Floor: vm.$data.messages.Floor,
					fang:vm.$data.messages.fang,
					gardenSID : self.gardenSID,
					builders : self.BuilderID,
					IsSell : vm.$data.messages.IsSell,
					IsRent : vm.$data.messages.IsRent,
				}
			});
			
		});
	}); 
	$('#nextPage').click(function(){
		if(rowNum >= count){
			rowNum = count;
			mui.toast('已经是最后一个了');
		}else{
			rowNum++;
		}
		vm.getMessage();
	});
	$('#upPage').click(function(){
		if(rowNum <= 1){
			rowNum = 1;
			mui.toast('已经是第一个了');
		}else{
			rowNum--;
		}
		vm.getMessage();
	});
/*跳转传值*/
	
	(function($, doc,jq) {
	$.init();
	$.ready(function() {	
		//接通状态
		var statePicker = new $.PopPicker();
		statePicker.setData([{
			value: '1',
			text: '正常'
		},{
			value: '2',
			text: '未接'
		},{
			value: '3',
			text: '未接+国际长途'
		},{
			value: '4',
			text: '拒接'
		},{
			value: '5',
			text: '关机'
		},{
			value: '6',
			text: '停机'
		},{
			value: '7',
			text: '空号'
		},{
			value: '8',
			text: '无法接通'
		},{
			value: '9',
			text: '已换机主'
		},{
			value: '10',
			text: '态度恶劣'
		},{
			value: '11',
			text: '多次确认无效'
		}]);
		$('body').on('tap','.useiconGroup .state',function(){
			var _this=this;
			var _$ = jq;
			var PhoneId = _$(this).attr('data-PhoneId');
			var ownerId = _$(this).attr('data-OwnerId');
			var phoneNumber = _$(this).attr('data-phoneNum');
			var addPerId = _$(this).attr('data-OperatorID');
			statePicker.show(function(items) {
				_this.setAttribute('data-state',items[0].text);
				var dates = new Date();
				if(items[0].value == '1'){
					_$('.bg').show();
					_$('.popup').show();
					_$('#save').on('tap',function(){
						if(_$('.popup textarea').val() == ''){
							mui.toast('请填写跟进信息');
						}else{
							mui.ajax(baseUrl+'API_Responsible/OwnerPhoneFollowInfo',{
								data:{
									"UserName":userName,
									"DepShopName": shopName,
									"AddTime": dates.toLocaleString(),
									"AnswerStatus": items[0].value,
									"Remark": _$('.popup textarea').val(),
									"PhoneId":PhoneId,
									"Operator":userName,
									"OwnerPhonePId": 0,
								    "OwnerId": ownerId,
								    "PhoneNumber": phoneNumber,
								    "AddPerID": addPerId, 
							        "RoomId": roomId,	
								},
								dataType: 'json',
								type: 'post',
								success: function(data){
									console.log(JSON.stringify(data));
								},error:function(error){
									console.log(error);
								}
							});
							flowUp();
							_$('.bg').hide();
							_$('.popup').hide();
						}
					});
				}else{
					mui.ajax(baseUrl+'API_Responsible/OwnerPhoneFollowInfo',{
						data:{
							"UserName":userName, 
							"DepShopName": shopName,
							"AddTime": dates.toLocaleString(),
							"AnswerStatus": items[0].value,
							"Remark": _$('.popup textarea').val(),
							"PhoneId":PhoneId,
							"Operator":userName,
							"OwnerPhonePId": 0,
						    "OwnerId": ownerId,
						    "PhoneNumber": phoneNumber,
						    "AddPerID": addPerId, 
					        "RoomId": roomId,	 
						},
						dataType: 'json',
						type: 'post',
						success: function(data){
							console.log(JSON.stringify(data));
						},error:function(error){
							console.log(error);
						}
					});
					flowUp();
				}
				_$('#cancel').on('tap',function(){
					_$('.bg').hide();
					_$('.popup').hide();
				})
			});
		});
	});
})(mui, document,jQuery)

mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});