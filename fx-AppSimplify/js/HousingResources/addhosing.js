var vm = new Vue({
	el: '#vue-app',
	data: {
		isSellOrRent: '',
		roomId: null,
		HouseID: null,
		AddHouseinfo: {
			IsRent: 0,
			IsSell: 0,
			Paymo:1,
			Paymo2:1,
			UseChannel:1,
		}, 
		linkMan: null,
	},
	methods: {
		AddHouseInfo() {
			console.log('增加修改将要提交的数据'+JSON.stringify(vm.$data.AddHouseinfo));
			var _this = this;
				mui.ajax(baseUrl + 'API_House/AddHouseInfo', {
					type: 'post',
					data: vm.$data.AddHouseinfo,
					success: function(data, type, status) {
						$("#subBtn").removeAttr("disabled");
						console.log(JSON.stringify(data));
						if(data.succ){
							mui.toast('添加成功');	
							/*返回列表页面*/
//							if (mui.os.ios || mui.os.ipad || mui.os.iphone) {
						        // 获取所有Webview窗口
						        var curr = plus.webview.currentWebview();
						        var wvs = plus.webview.all();
						        for (var i = 0, len = wvs.length; i < len; i++) {
						            //关闭除add页面外的其他页面
						            if (wvs[i].getURL() == curr.getURL())
						                continue;
						            plus.webview.close(wvs[i]);
						        };
						        //打开login页面后再关闭setting页面
						        plus.webview.create('_www/nav.html','_www/nav',{},{index:2}).show();
						        curr.close();
//							};
						}else{
							mui.toast(data.msg);	
							console.log(data.msg);
							console.log(JSON.stringify(status));
							if(data.msg ==''){
								
							}
						}
						
					},
					error: function(xht, type, cont) {
						mui.toast(console.log(type + '--' + cont))
					}
				})
		},
		getHouseInfo() {
			var _this = this;
			mui.ajax(baseUrl + 'API_House/HouseData?HouseID=' + vm.$data.HouseID, {
				type: 'post',
				success: function(data, type, status) {
					if(data.succ && data.results != null) {

						console.log('64行获取提交信息' + JSON.stringify(data))
						$("input[name=intention]").val(data.results.Housename + ' ' + data.results.Builder + '#' + data.results.fang);
						vm.$data.AddHouseinfo = data.results;
						/*得到修改的数据用于再次提交*/
						if(data.results.Sellattached != null) {
							$('#sellBtn').attr('disabled','disabled');
							var a = data.results.Sellattached;
							var arr = ['Sell_attachedId','QuotePrice','LowPrice','PaymentMethod','PayerType','BuyBright','IsOnly'];
							for(var i = 0;i<arr.length;i++){
								vm.$data.AddHouseinfo[arr[i]] = a[arr[i]];
							};
							//vm.$data.AddHouseinfo = $.extend({},data.results.Sellattached,vm.$data.AddHouseinfo);
						};
						if(data.results.Rentattached != null) {
							$('#IsRent').attr('disabled','disabled');
							var r = data.results.Rentattached;
							var rArr = ['Rent_attachedId','RentQuotePrice','RentLowPrice','RentPayType','RentBright'];
							var rArr2 = ['Rent_attachedId','QuotePrice','LowPrice','RentPayType','RentBright'];
							for(var i = 0;i<rArr.length;i++){
								vm.$data.AddHouseinfo[rArr[i]] = r[rArr2[i]];
							};
							vm.$data.AddHouseinfo.Depositmo =  parseInt(r.Depositmo);
							vm.$data.AddHouseinfo.Paymo = parseInt(r.Paymo);
							vm.$data.AddHouseinfo.Depositmo2 = parseInt(r.Depositmo2);
							vm.$data.AddHouseinfo.Paymo2 = parseInt(r.Paymo2);
							//							vm.$data.AddHouseinfo = $.extend({},data.results.Rentattached,vm.$data.AddHouseinfo);
						};
						/*回显居室信息*/
						if(vm.$data.AddHouseinfo.Shi != 0) {
							document.querySelector('#fangxing').value = vm.$data.AddHouseinfo.Shi + '室' + vm.$data.AddHouseinfo.Ting + '厅' + vm.$data.AddHouseinfo.Wei + '卫' + vm.$data.AddHouseinfo.Chu + '储';
						}
						
						
						vm.$data.AddHouseinfo.PerId = parseInt(localStorage.getItem('userId'));
						vm.$data.AddHouseinfo.PerName = localStorage.getItem('userName');
						vm.$data.linkMan = data.results.HouseOwner;
						/*回显出售房源状态*/
						theEcho('#SaleType', 'SellStatusType', vm.$data.AddHouseinfo.SaleType);
						/*回显出租房源状态*/
						theEcho('#RentType', 'SellType', vm.$data.AddHouseinfo.RentType);
						/*回显出租售源等级状态*/
						theEcho('#SaleLevel', 'HouseLevel', vm.$data.AddHouseinfo.SaleLevel);
						/*回显出租房源等级状态*/
						theEcho('#RentLevel', 'HouseLevel', vm.$data.AddHouseinfo.RentLevel);
						/*回显用途*/
						theEcho('#UseChannel', 'UseChannel', vm.$data.AddHouseinfo.UseChannel);
						/*回显朝向*/
						theEcho('#OrienTation', 'HouseForwardType', vm.$data.AddHouseinfo.OrienTation);
						/*回显买卖付款方式*/
						theEcho('#PaymentMethod', 'PayStatusType', vm.$data.AddHouseinfo.PaymentMethod);
						/*回显租赁付款方式*/
						theEcho('#RentPayType', 'RentPayType', vm.$data.AddHouseinfo.RentPayType);

						delete vm.$data.AddHouseinfo.Sellattached;
						delete vm.$data.AddHouseinfo.Rentattached;
						delete vm.$data.AddHouseinfo.HouseRolePer;
						delete vm.$data.AddHouseinfo.HouseOwner;
						delete vm.$data.AddHouseinfo.HousePicture;
						delete vm.$data.AddHouseinfo.ShowImg;
						delete vm.$data.AddHouseinfo.AreaName;
						delete vm.$data.AddHouseinfo.HousePark;
						console.log('114行获取到以往的房源录入数据' + JSON.stringify(vm.$data.AddHouseinfo))
						//						mui.toast(data.msg)

					} else {
						mui.toast(data.msg.replace(/[a-zA-Z\(\)]/g, ''))
						console.log(data.msg)
					}
				},
				error: function(xht, type, cont) {
					mui.toast(console.log('获取房间信息' + type + '--' + cont))
				}
			})
		},
		ifBuyOrRent(type, uid) {
			/*判断租售买卖*/
			Vue.set(this.AddHouseinfo, 'BuyOrRent', type)
			/*租售买卖跟单人ID*/
			if(type == 1) {
				Vue.set(this.AddHouseinfo, 'HouseUser', uid)
			} else {
				Vue.set(this.AddHouseinfo, 'RentUser', uid);
			}

			//					console.log('--------'+JSON.stringify(this.$data.AddCustomer))
		},

	},
	mounted: function() {}
});
/*选楼盘结束*/
mui.init({
	swipeBack: true
});
var self;

mui.plusReady(function() {
	//获取传值
	self = plus.webview.currentWebview();
	/*判断是传值还是复制*/
	if(self.RoomId != undefined) {
		vm.$data.roomId = self.RoomId;
		//		console.log(self.HouseId)
		$("input[name=intention]").val(self.name + ' ' + self.Builder + '#' + self.UnitAsName + '#' + self.fang);
		if(self.HouseId != 0) {
			vm.$data.HouseID = self.HouseId;
			vm.getHouseInfo();

		} else {
			vm.$data.AddHouseinfo.PerId = parseInt(localStorage.getItem('userId'));
			vm.$data.AddHouseinfo.PerName = localStorage.getItem('userName');
			vm.$data.AddHouseinfo.AddPer = parseInt(localStorage.getItem('userId'));
			vm.$data.AddHouseinfo.roomId = self.RoomId;
			vm.$data.AddHouseinfo.HouseId = self.HouseId;
			vm.$data.AddHouseinfo.Housename = self.name;
			vm.$data.AddHouseinfo.Builder = self.Builder;
			vm.$data.AddHouseinfo.Unit = self.UnitAsName;
			vm.$data.AddHouseinfo.Floor = self.Floor;
			vm.$data.AddHouseinfo.fang = self.fang;
		};
	};
	/*进入楼盘房源选择*/
	$('body').on('tap', '#selectHouse', function(e) {
		openNewPage({
			url: '_www/html/Housing/houses.html',
			data: {}
		});
		/*重复选择前先关闭已经打开页面*/
		var arr = ['_www/html/Housing/houses', '_www/html/Housing/housesLou', '_www/html/Housing/housesRoom', '_www/html/Housing/addHosing'];
		for(var i = 0; i < arr.length; i++) {
			plus.webview.close(arr[i]);
		};

		return false;
	});
});





/*提交保存房源信息*/
$('#subBtn').on('tap', function() {
	
//		console.log(JSON.stringify(vm.$data.AddHouseinfo));
		/*获取手机产权人信息*/
		var PhoneList = [],
			carList = [];
		
		$("input[name=phoneListName]").each(function(index, dom) {
			
			var obj = {};
			obj.ContactUser = dom.value;
			obj.IsLookUser = $("input[name=IsLookUser]").eq(index).val();
			obj.RoomID = vm.$data.roomId;
			/*更改或是新增数据*/
			if($(this).attr('dataId')){
				obj.OwnerId = parseInt($(this).attr('dataId'));
			};
			if(vm.$data.HouseID != 0 && vm.$data.HouseID != null) {
				obj.HouseID = vm.$data.HouseID;
			};
			/*获取联系人信息*/
			obj.listPhones = [];
			$(this).parents('li').find('input[name=phoneListTel]').each(function(index, dom) {
				
				var arr = {};
				if(vm.$data.HouseID != 0 && vm.$data.HouseID != null) {
					arr.HouseID = vm.$data.HouseID;
				};
				if($(this).attr('dataId')){
					arr.OwnerId = parseInt($(this).attr('dataId'));
				};
				if($(this).attr('dataPId')){
					arr.OwnerPId = parseInt($(this).attr('dataPId'));
				};
				
				arr.RoomID = vm.$data.roomId;
				arr.Phone = dom.value;
				obj.listPhones.push(arr)
			});
			PhoneList.push(obj);
			
		});
		
		/*验证朝向是否为空*/
		if(vm.$data.AddHouseinfo.OrienTation == undefined){
			mui.toast('请选择朝向');
			return false;
		};
		var myreg = /^1[3|4|5|7|8][0-9]{9}$/;
		for(var i=0;i<PhoneList.length;i++){
			/*验证联系人信息为空*/
			if(PhoneList[i].ContactUser ==''){
				mui.toast('请输入正确联系人姓名')
				return false;
			};
			for(var j= 0;j<PhoneList[i].listPhones.length;j++){
				if(!myreg.test(PhoneList[i].listPhones[j].Phone)){
					mui.toast('输入正确的手机号码');
					return false;
				};
			}
	//		
		};
		vm.$data.AddHouseinfo.LisOwnerInfo = PhoneList;
//		console.log('增加修改数据'+JSON.stringify(vm.$data.AddHouseinfo));
		$(this).attr({"disabled":"disabled"});
		vm.AddHouseInfo();
		
});
//初始化单页的区域滚动
//mui('.mui-scroll-wrapper').scroll();

//添加联系人 
$('.add-linkman .add').on('tap', function() {
	$('.importLink').append('<li class="mui-table-view-cell box"><a class="mui-navigate-right mui-input-row area" href="javascript:;">' +
		'<label>联系人：</label>' +
		'<input type="text" name="phoneListName" placeholder="请输入" name=""  value="" />' +
		'</a>' +
		'<a  class="mui-navigate-right mui-input-row IsLookUser" href="javascript:;" id="relation">' +
		'<label>产权人关系：</label>' +
		'<input type="text" placeholder="请选择"  name="IsLookUser" readonly="readonly" value="" />' +
		'</a>' +
		'<a class="mui-navigate-right mui-input-row area" href="javascript:;">' +
		'<label>联系人电话：</label>' +
		'<input type="tel" placeholder="请选择" name="phoneListTel" value="" />' +
		//									'<span class="mui-icon mui-icon-plusempty jia" id="addContactsTel"></span>'+
		'</a></li>');
});
$('.add-linkman .remove').on('tap', function() {
	var i = $(".box").length - 1;
	$(".box").eq(i).remove();
});
/*限制input输入*/
restrict('.importLink','input[name="phoneListName"]');
/*获取字典信息*/
mui.ajax(baseUrl + 'API_Dictionary/AllDic', {
	type: 'post',
	async: false,
	success: function(data, type, status) {
		if(data.succ) {
			(function($, doc) {
				$.init();
				/*设置json 字段名*/
				function tranfer(data) {
					var obj = data;
					var str = JSON.stringify(obj).replace(/\bDisplayValue\b/g, 'value').replace(/\bDisplayName\b/g, 'text');
					return JSON.parse(str)
				};
				/*产权人选择*/
				(function() {
					var taxationJson = new $.PopPicker();
					taxationJson.setData(tranfer(data.results.OwnerUserType));
					$(".importLink").on('tap', '.IsLookUser', function() {
						var _this = this;
						taxationJson.show(function(items) {
							_this.children[1].value = items[0].text;
							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					});
				})();
				/*设置picker选择列表*/
				function selectOpiton(a, data) {
					var taxationJson = new $.PopPicker();
					taxationJson.setData(data);
					var taxationBtn = doc.getElementById(a);
					taxationBtn.addEventListener('tap', function(event) {
						var _this = this;
						taxationJson.show(function(items) {
							_this.children[0].children[1].value = items[0].text;
							vm.$data.AddHouseinfo[a] = parseInt(items[0].value);
							
							/*判断租赁付款方式条件*/
							if(a == 'RentPayType'){
//								console.log(parseInt(items[0].value));
								if(parseInt(items[0].value)==1){
									vm.$set(vm.AddHouseinfo, 'Paymo', 1);
									vm.$set(vm.AddHouseinfo, 'Paymo2', 1);
								}
								if(parseInt(items[0].value)==2){
									vm.$set(vm.AddHouseinfo, 'Paymo', 3);
									vm.$set(vm.AddHouseinfo, 'Paymo2', 3);
								}
								if(parseInt(items[0].value)==3){
									vm.$set(vm.AddHouseinfo, 'Paymo', 6);
									vm.$set(vm.AddHouseinfo, 'Paymo2', 6);
								}
								if(parseInt(items[0].value)==4){
									vm.$set(vm.AddHouseinfo, 'Paymo', 12);
									vm.$set(vm.AddHouseinfo, 'Paymo2', 12);
//									$("#Paymo").val(12);
//									$("#Paymo2").val(12);
								}
							}
							console.log(JSON.stringify(vm.$data.AddHouseinfo));
							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					}, false);
				}

				$.ready(function() {
					/*客户来源*/
					//selectOpiton('FromSource', tranfer(data.results.FromSourceType));
					/*售*/
					selectOpiton('SaleType', tranfer(data.results.SellStatusType));
					/*租*/
					selectOpiton('RentType', tranfer(data.results.SellType));
					/*售等级*/
					selectOpiton('SaleLevel', tranfer(data.results.HouseLevel));
					/*租等级*/
					selectOpiton('RentLevel', tranfer(data.results.HouseLevel));
					/*居住现状*/
//					selectOpiton('ResidenceStatus', tranfer(data.results.liveStatusType));
					/*用途*/
					selectOpiton('UseChannel', tranfer(data.results.UseChannel));
					/*购买目的*/
					//selectOpiton('RentPayType', tranfer(data.results.RentPayType));
					/*朝向*/
					selectOpiton('OrienTation', tranfer(data.results.HouseForwardType));
					/*购付款*/
					//selectOpiton('RentPayType',tranfer(data.results.RentPayType));
					/*装修*/
//					selectOpiton('DecorateType', tranfer(data.results.DegreeLevelType));
					/*看房方式*/
//					selectOpiton('ShowingsWay', tranfer(data.results.ShowingsType));
					/*租赁支付方式*/
					selectOpiton('RentPayType', tranfer(data.results.RentPayType));
					/*买卖支付方式*/
					selectOpiton('PaymentMethod', tranfer(data.results.PayStatusType));
					/*税费承担*/
//					selectOpiton('PayerType', tranfer(data.results.HouseTaxType));
					/*是否唯一*/
//					selectOpiton('IsOnly', tranfer(data.results.HouseIsOnlyType));

				})
			})(mui, document)
		}
		//_this.$data.AllDicData = data.results;
		//console.log(JSON.stringify(vm.$data.AllDicData))
	},
	error: function(xht, type, cont) {
		mui.toast(console.log(type + '--' + cont))
	}
});
/*居室*/
var mobileSelect3 = new MobileSelect({
    trigger: '#fangxing',
    title: '居室选择',
    wheels: [
                {data: [{"value":"1室","text":1},{"value":"2室","text":2},{"value":"3室","text":3},{"value":"4室","text":4},{"value":"5室","text":5},{"value":"6室","text":6}]},
                {data: [{"value":"1厅","text":1},{"value":"2厅","text":2},{"value":"3厅","text":3},{"value":"4厅","text":4},{"value":"5厅","text":5}]},
                {data: [{"value":"1卫","text":1},{"value":"2卫","text":2},{"value":"3卫","text":3},{"value":"4卫","text":4},{"value":"5卫","text":5}]},
                {data: [{"value":"1厨","text":1},{"value":"2厨","text":2},{"value":"3厨","text":3},{"value":"4厨","text":4},{"value":"5厨","text":5}]},
                {data: [{"value":"0储","text":0},{"value":"1储","text":1},{"value":"2储","text":2},{"value":"3储","text":3}]}
            ],
    position:[0, 0, 0, 0, 0], 
    callback:function(indexArr, data){
    	/*data是选中的数组信息*/
    	$("#fangxing").val(data[0].value + '/' + data[1].value + '/' + data[2].value + '/' + data[3].value + '/' + data[4].value);
		vm.$data.AddHouseinfo.Shi = parseInt(data[0].text);
		vm.$data.AddHouseinfo.Ting = parseInt(data[1].text);
		vm.$data.AddHouseinfo.Wei = parseInt(data[2].text);
		vm.$data.AddHouseinfo.Chu = parseInt(data[3].text);
		vm.$data.AddHouseinfo.Savings = parseInt(data[4].text);
    }
});