		var vm = new Vue({
			el: '#vue-app',
			data: {
				isSellOrRent: '',
				AddCustomer: {
					Sex: '男',
				},
			},
			methods: {
				upCustomerInfo() {
					var _this = this;
					mui.ajax(baseUrl + 'API_Customer/AddCustomer', {
						type: 'post',
						data: _this.$data.AddCustomer,
						success: function(data, type, status) {
							console.log(JSON.stringify(data))
							$("#save").removeAttr("disabled");
							if(data.succ) {
								mui.toast(data.msg)
								/*返回客源列表页面*/
								var parentId = plus.webview.getWebviewById('./html/myCustomers/customersLists.html')
								mui.fire(parentId,'shuaxin',{
									index:3
								});
								mui.back();
							} else {
								mui.toast(data.msg.replace(/[a-zA-Z\(\)]/g, ''))
							}
						},
						error: function(xht, type, cont) {
							mui.toast(console.log(type + '--' + cont))
						}
					})
				},
				selectOption(sex) {
					/*性别*/
					this.$data.AddCustomer.Sex = sex;
					//					console.log(JSON.stringify(this.$data.AddCustomer))
				},
				ifBuyOrRent(type, uid) {
					/*判断租售买卖*/
					Vue.set(this.AddCustomer, 'BuyOrRent', type)
					/*租售买卖跟单人ID*/
					if(type == 1) {
						Vue.set(this.AddCustomer, 'HouseUser', uid)
					} else {
						Vue.set(this.AddCustomer, 'RentUser', uid);
					}

					//					console.log('--------'+JSON.stringify(this.$data.AddCustomer))
				}

			},
			mounted: function() {}
		});
		//添加联系人
		$('.mui-input-row').on('tap', '.add-linkman', function() {
			$('.linkmanBox').show()
			var str = '<div class="linkmanList">' +
				'<a class="mui-icon mui-icon-closeempty"></a>' +
				'<div class="mui-input-row">' +
				'<label>联系人：</label>' +
				'<input type="text" name="phoneListName" placeholder="请输入">' +
				'</div>' +
				'<div class="mui-input-row">' +
				'<label>电话：</label>' +
				'<input type="tel" name="phoneListTel" placeholder="请输入">' +
				'</div>' +
				'</div>';
			$('.linkmanBox').append(str);
		});
		//删除添加的联系人
		$('.linkmanBox').on('tap', '.linkmanList .mui-icon', function() {
			$(this).parents('.linkmanList').remove();
			if($('.linkmanBox .mui-icon').length == 0) {
				$('.linkmanBox').hide()
			}
		});
		/*限制input输入*/
		restrict('.customers-message','input[name="phoneListName"]');
		restrict('.customers-message','input[name="custName"]');
		/*mui init*/
		mui.init({
			swipeBack: true
		});
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
		mui.plusReady(function() { 
			var self = plus.webview.currentWebview();
			vm.ifBuyOrRent(self.BuyOrRent, self.uid);
			//			console.log(self.uid)
			if(self.BuyOrRent == 1) {
				$('.mui-title').text('新增客源(买客)')
				$('.sellorrentInfo').text('求购信息')
			} else {
				$('.mui-title').text('新增客源(租客)')
				$('.sellorrentInfo').text('求租信息')
			};
			
		});
		$('#save').on('tap', function() {
				$(this).attr({
					"disabled": "disabled"
				});
				//			console.log(JSON.stringify(vm.$data.AddCustomer));
				var PhoneList = [];
				if($("input[name=phoneListName]").length >= 1) {
					$("input[name=phoneListName]").each(function(index, dom) {

						var obj = {};
						obj.Name = dom.value;
						obj.Phone = $("input[name=phoneListTel]").eq(index).val().toString();
						PhoneList.push(obj)
					});
				};
				vm.$data.AddCustomer.PhoneList = JSON.stringify(PhoneList);
				console.log(JSON.stringify(vm.$data.AddCustomer));
				/*执行添加ajax*/
				vm.upCustomerInfo();
		});
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
						}
						/*设置picker选择列表*/
						function selectOpiton(a, data) {
							var taxationJson = new $.PopPicker();
							taxationJson.setData(data);
							var taxationBtn = doc.getElementById(a);
							taxationBtn.addEventListener('tap', function(event) {
								var _this = this;
								taxationJson.show(function(items) {
									_this.children[1].value = items[0].text;
									vm.$data.AddCustomer[a] = parseInt(items[0].value)
									//console.log(JSON.stringify(vm.$data.AddCustomer))
									//返回 false 可以阻止选择框的关闭
									//return false;
								});
							}, false);
						}
						var RentLevelArray = [{
							"DisplayName": "A",
							"DisplayValue": "1",
							"Or": 2
						}, {
							"DisplayName": "B",
							"DisplayValue": "2",
							"Or": 2
						}, {
							"DisplayName": "C",
							"DisplayValue": "3",
							"Or": 2
						}, {
							"DisplayName": "私客",
							"DisplayValue": "4",
							"Or": 2
						}]
						$.ready(function() {
							//客户来源
							selectOpiton('FromSource', tranfer(data.results.FromSourceType));
							//租客户等级
							selectOpiton('RentLevel', tranfer(RentLevelArray));
							//买客户等级
							selectOpiton('BuyLevel', tranfer(RentLevelArray));
							/*居住现状*/
							//selectOpiton('c', tranfer(data.results.liveStatusType));
							/*用途*/
							selectOpiton('UseChannel', tranfer(data.results.UseChannel));
							/*购买目的*/
							//selectOpiton('RentPayType', tranfer(data.results.RentPayType));
							/*朝向*/
							selectOpiton('HouseForward', tranfer(data.results.HouseForwardType));
							/*购付款*/
							//selectOpiton('RentPayType',tranfer(data.results.RentPayType));
							/*装修*/
							selectOpiton('DegreeLevel', tranfer(data.results.DegreeLevelType));

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
			wheels: [{
					data: [{
						"value": "1室",
						"text": 1
					}, {
						"value": "2室",
						"text": 2
					}, {
						"value": "3室",
						"text": 3
					}, {
						"value": "4室",
						"text": 4
					}, {
						"value": "5室",
						"text": 5
					}, {
						"value": "6室",
						"text": 6
					}]
				},
				{
					data: [{
						"value": "1厅",
						"text": 1
					}, {
						"value": "2厅",
						"text": 2
					}, {
						"value": "3厅",
						"text": 3
					}, {
						"value": "4厅",
						"text": 4
					}, {
						"value": "5厅",
						"text": 5
					}]
				},
				{
					data: [{
						"value": "1卫",
						"text": 1
					}, {
						"value": "2卫",
						"text": 2
					}, {
						"value": "3卫",
						"text": 3
					}, {
						"value": "4卫",
						"text": 4
					}, {
						"value": "5卫",
						"text": 5
					}]
				},
				{
					data: [{
						"value": "1厨",
						"text": 1
					}, {
						"value": "2厨",
						"text": 2
					}, {
						"value": "3厨",
						"text": 3
					}, {
						"value": "4厨",
						"text": 4
					}, {
						"value": "5厨",
						"text": 5
					}]
				},
			],
			position: [0, 0, 0, 0, 0],
			callback: function(indexArr, data) {
				/*data是选中的数组信息*/
				$("#fangxing").val(data[0].value + '/' + data[1].value + '/' + data[2].value + '/' + data[3].value);
				vm.$data.AddCustomer.SleepRoom = parseInt(data[0].text);
				vm.$data.AddCustomer.Parlour = parseInt(data[1].text);
				vm.$data.AddCustomer.Toilet = parseInt(data[2].text);
				vm.$data.AddCustomer.Balcony = parseInt(data[3].text);
			}
		});