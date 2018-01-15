
/*MUI  初始化*/
mui.init({
	swipeBack: true, //启用右滑关闭功能
	//statusBarBackground: '#f7f7f7'
});
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
/*点击回到顶部*/
$('#segmentedControl a').on('tap', function() {
	mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100); //100毫秒滚动到顶
});
/*个人税费select选择*/
(function($, doc) {
	$.init();
	$.ready(function() {
		/*增值税*/
		var arr1 = [{
			value: 1,
			text: '满五年'
		}, {
			value: 2,
			text: '满两年'
		}, {
			value: 3,
			text: '不满两年'
		}];
		/*个税*/
		var arr2 = [{
			value: 1,
			text: '家庭唯一'
		}, {
			value: 2,
			text: '家庭不唯一'
		}];
		/*契税*/
		var arr3 = [{
			value: 1,
			text: '朝阳区'
		}, {
			value: 2,
			text: '海淀区'
		}, {
			value: 3,
			text: '东城区'
		}, {
			value: 4,
			text: '西城区'
		}, {
			value: 5,
			text: '丰台区'
		}, {
			value: 6,
			text: '石景山区'
		}, {
			value: 7,
			text: '通州区'
		}, {
			value: 8,
			text: '昌平区'
		}, {
			value: 9,
			text: '大兴区'
		}, {
			value: 10,
			text: '顺义区'
		}, {
			value: 11,
			text: '房山区'
		}, {
			value: 12,
			text: '门头沟区'
		}, {
			value: 13,
			text: '亦庄开发区'
		}];
		var arr4 = [{
			value: 1,
			text: '5环内'
		}, {
			value: 2,
			text: '5环-6环'
		}, {
			value: 3,
			text: '6环外'
		}];
		var arr5 = [{
			value: 1,
			text: '全款'
		}, {
			value: 2,
			text: '贷款'
		}];
		var arr6 = [{
			value: 1,
			text: '首套'
		}, {
			value: 2,
			text: '二套'
		}];
		var arr7 = [{
			value: 1,
			text: '首套购买（无贷款记录）'
		}, {
			value: 2,
			text: '首套购买（有贷款记录）'
		}, {
			value: 3,
			text: '二套购买'
		}];
		var arr8 = [{
			value: 1,
			text: '80%'
		}, {
			value: 2,
			text: '81%'
		}, {
			value: 3,
			text: '82%'
		}, {
			value: 4,
			text: '83%'
		}, {
			value: 5,
			text: '84%'
		}, {
			value: 6,
			text: '85%'
		}, {
			value: 7,
			text: '86%'
		}, {
			value: 8,
			text: '87%'
		}, {
			value: 9,
			text: '88%'
		}, {
			value: 10,
			text: '89%'
		}, {
			value: 11,
			text: '90%'
		}, {
			value: 12,
			text: '91%'
		}, {
			value: 13,
			text: '92%'
		}, {
			value: 14,
			text: '93%'
		}, {
			value: 15,
			text: '94%'
		}, {
			value: 16,
			text: '95%'
		}, {
			value: 17,
			text: '96%'
		}, {
			value: 18,
			text: '97%'
		}, {
			value: 19,
			text: '98%'
		}, {
			value: 20,
			text: '99%'
		}, {
			value: 21,
			text: '100%'
		}];
		var arr9 = [{
			value: 1,
			text: '普通计算（按填写贷款额）'
		}, {
			value: 2,
			text: '税费最少（贷款额有限）'
		}, {
			value: 3,
			text: '不超非普通住宅（多贷且税少）'
		}];
		var selectOption = function(id, data) {
			var userPicker = new $.PopPicker();
			userPicker.setData(data);
			var showUserPickerButton = doc.getElementById(id);
			var djq = doc.getElementsByName(id)[0];
			showUserPickerButton.addEventListener('tap', function(event) {
				userPicker.show(function(items) {
					djq.value = items[0].text;
					djq.setAttribute("data-type", items[0].value);
				});
			}, false);
		}
		/*计算方式*/
		selectOption('a', arr1)
		selectOption('b', arr2)
		selectOption('c', arr3)
		selectOption('d', arr4)
		selectOption('e', arr5)
		selectOption('f', arr6)
		selectOption('g', arr7)
		selectOption('h', arr8)
		selectOption('I', arr9)
	})
})(mui, document);

/*个人住宅税费*/
$('#person-house').on('tap',function() {
	
	var $taxPrice = $("input[name=taxPrice]"), //计税价(网签价/指导价)
		$originalValue = $("input[name=originalValue]"), //原值
		$originalTax = $("input[name=originalTax]"), //原契税
		$interest = $("input[name=interest]"), //利息
		$a = $("input[name=a]"), //增值税
		$b = $("input[name=b]"), //个税网签价
		$d = $("input[name=d]"); //契税网签价
	var tishi = '';
//	if($e.attr('data-type') == undefined) {
//		tishi = '请选择契税指导价';
//	};
	if($d.attr('data-type') == undefined) {
		tishi = '请选择契税网签价';
	};
//	if($c.attr('data-type') == undefined) {
//		tishi = '请选择个税指导价';
//	};
	if($b.attr('data-type') == undefined) {
		tishi = '请选择个税网签价';
	};
	if($a.attr('data-type') == undefined) {
		tishi = '请选择增值税';
	};
	if($originalTax.val() == '') {
		tishi = '请填写原契税';
	};
	if($originalValue.val() == '') {
		tishi = '请填写原值';
	};
	if($interest.val() == '') {
		tishi = '请填写利息';
	};
	if($taxPrice.val() == '') {
		tishi = '请填写计税价';
	};
	if(tishi != '') {
		mui.toast(tishi);
		return false
	};
	var Fiexd = function(num){
		return num.toFixed(4);
	}
	/*住宅判断*/
	if($a.attr('data-type') == 1||$a.attr('data-type') == 3) {
		/*增值税*/
		var zz = Fiexd((parseFloat($taxPrice.val()) / 1.05 * 0.05))*1;
		
		$('input[name=tax1]').val(zz);
		/*增值税附加税*/
		$('input[name=tax2]').val(Fiexd((zz * 0.12)));
		/*个税*/
		if($b.attr('data-type') == 1||$b.attr('data-type') == 2) {
			$('input[name=tax3]').val(Fiexd(((parseFloat($taxPrice.val()) 
												- parseFloat($originalValue.val()) 
												- parseFloat($originalTax.val())
												- zz-(zz * 0.12)-(parseFloat($taxPrice.val())*.1)
												-parseFloat($interest.val()))*.2)));
		}else if($b.attr('data-type') == 3){
			$('input[name=tax3]').val('0.0000');
		};
		/*契税*/
		if($d.attr('data-type') == 1) {
			$('input[name=tax5]').val(Fiexd(((parseFloat($taxPrice.val()-zz))*.01)));
		}else if($d.attr('data-type') == 2){
			$('input[name=tax5]').val(Fiexd(((parseFloat($taxPrice.val()-zz))*.015)));
		}else if($d.attr('data-type') == 3){
			$('input[name=tax5]').val(Fiexd(((parseFloat($taxPrice.val()-zz))*.03)));
		};

	} else if($a.attr('data-type') == 2) {
		/*增值税*/
		var zz = 0;
		$('input[name=tax1]').val('0.0000');
		/*增值税附加税*/
		$('input[name=tax2]').val('0.0000');
		/*个税*/
		if($b.attr('data-type') == 1||$b.attr('data-type') == 2) {
			$('input[name=tax3]').val(Fiexd(((parseFloat($taxPrice.val()) 
											- parseFloat($originalValue.val()) 
											- parseFloat($originalTax.val()) 
											- zz-(zz * 0.12)-(parseFloat($taxPrice.val())*.1)
											- parseFloat($interest.val()))*.2)));
		}else if($b.attr('data-type') == 3){
			$('input[name=tax3]').val('0.0000');
		};
		/*契税*/
		if($d.attr('data-type') == 1) {
			$('input[name=tax5]').val(Fiexd(((parseFloat($taxPrice.val()-zz))*.01)));
		}else if($d.attr('data-type') == 2){
			$('input[name=tax5]').val(Fiexd(((parseFloat($taxPrice.val()-zz))*.015)));
		}else if($d.attr('data-type') == 3){
			$('input[name=tax5]').val(Fiexd(((parseFloat($taxPrice.val()-zz))*.03)));
		};

	} else if($a.attr('data-type') == 4) {
		/*增值税*/
		var zz = Fiexd(((parseFloat($taxPrice.val())-parseFloat($originalValue.val())) / 1.05 * 0.05))*1;
		$('input[name=tax1]').val(zz);
		/*增值税附加税*/
		$('input[name=tax2]').val(Fiexd((zz * 0.12)));
		/*个税*/
		if($b.attr('data-type') == 1||$b.attr('data-type') == 2) {
			$('input[name=tax3]').val(Fiexd(((parseFloat($taxPrice.val()) 
											- parseFloat($originalValue.val()) 
											- parseFloat($originalTax.val()) 
											- zz-(zz * 0.12)-(parseFloat($taxPrice.val())*.1)
											-parseFloat($interest.val()))*.2)));
		}else if($b.attr('data-type') == 3){
			$('input[name=tax3]').val('0.0000');
		};
		/*契税*/
		if($d.attr('data-type') == 1) {
			$('input[name=tax5]').val(Fiexd(((parseFloat($taxPrice.val()-zz))*.01)));
		}else if($d.attr('data-type') == 2){
			$('input[name=tax5]').val(Fiexd(((parseFloat($taxPrice.val()-zz))*.015)));
		}else if($d.attr('data-type') == 3){
			$('input[name=tax5]').val(Fiexd(((parseFloat($taxPrice.val()-zz))*.03)));
		};
	};
	/*总价*/
	$('input[name=taxAll]').val(Fiexd((parseFloat($('input[name=tax1]').val())
										+parseFloat($('input[name=tax2]').val())
										+parseFloat($('input[name=tax3]').val())
										+parseFloat($('input[name=tax5]').val())))
	);

});
/*个人商业税费*/
$("#personBusiness").on('tap',function(){
	
	var $businessPrice = $("input[name=businessPrice]"), //申报价
		$businessOriginalValue = $("input[name=businessOriginalValue]"), //原值
		$businessYear = $("input[name=businessYear]"); //年数
	var tishi = '';
	if($businessYear.val() == '') {
		tishi = '增值年数';
	};
	if($businessOriginalValue.val() == '') {
		tishi = '请填写原值';
	};
	if($businessPrice.val() == '') {
		tishi = '请填写申报价';
	};
	if(tishi != '') {
		mui.toast(tishi);
		return false
	};
	var Fiexd = function(num){
		return num.toFixed(8);
	};
	/*增值税*/
	var zz = Fiexd(((parseFloat($businessPrice.val())-parseFloat($businessOriginalValue.val()))/1.05*.05))*1;
	$('input[name=busiss1]').val(Fiexd(zz));
	/*增值税附加税*/
	$('input[name=busiss2]').val(Fiexd(zz*.12));
	/*契税*/
	$('input[name=busiss3]').val(Fiexd((parseFloat($businessPrice.val())-zz)*.03));
	/*印花税*/
	$('input[name=busiss4]').val(Fiexd(parseFloat($businessPrice.val())*0.001));
	/*土地增值*/
	var kcl,sl;//扣除率和税率
	/*扣除项目金额*/
	var kMoney = (parseFloat($businessOriginalValue.val())//原值
									+(parseFloat($businessOriginalValue.val())*0.03)//原契
									+(parseFloat($businessOriginalValue.val())*0.05*parseFloat($businessYear.val()))//原值*5%*年数
									+(zz)//增值税
									+(0.12*zz)//本次附加税
									+((parseFloat($businessPrice.val())*0.001)*0.0005)
							);
	/*增值额*/
	console.log(zz)
	var zMoney = parseFloat($businessPrice.val())-kMoney;
	var keneng = zMoney/kMoney;
	console.log(kMoney+'||'+zMoney)
	if(keneng<=0.5){
		sl = 0.3
		kcl=0;
	}else if(keneng>0.5&&keneng<=1){
		sl = 0.4
		kcl=0.05;
	}else if(keneng>1&&keneng<=2){
		sl = 0.5
		kcl=0.15;
	}else if(zMoney/kMoney>.2){
		sl = 0.6
		kcl=0.35;
	}
	$('input[name=busiss6]').val(Fiexd((zMoney*sl)-(kMoney*kcl)));
	/*税率*/
	$('input[name=busiss5]').val(Fiexd(sl));
	/*个税*/
	$('input[name=busiss7]').val(Fiexd((parseFloat($businessPrice.val())
								-(zz)-parseFloat($businessOriginalValue.val())
								-(parseFloat($businessOriginalValue.val())*0.03)
								-(zz*0.12)
								-((zMoney*sl)-kMoney*kcl)
								-((parseFloat($businessPrice.val())*0.001)*0.0005)
								-(parseFloat($businessPrice.val())*.1))*.2));//装修
	
	/*总价*/
	$('input[name=busissAll]').val(parseFloat($('input[name=busiss1]').val())
									+parseFloat($('input[name=busiss2]').val())
									+parseFloat($('input[name=busiss3]').val())
									+parseFloat($('input[name=busiss4]').val())
									+parseFloat($('input[name=busiss5]').val())
									+parseFloat($('input[name=busiss6]').val())
									+parseFloat($('input[name=busiss7]').val()));
//$('input[name=busissAll]').val(1)
	
})
/*公司出售商业税费*/
$("#btncompany").on('tap',function(){
	
	var $companyPrice = $("input[name=companyPrice]"), //申报价
		$companyOriginalValue = $("input[name=companyOriginalValue]"), //原值
		$companyYear = $("input[name=companyYear]"); //年数
	var tishi = '';
	if($companyYear.val() == '') {
		tishi = '增值年数';
	};
	if($companyOriginalValue.val() == '') {
		tishi = '请填写原值';
	}; 
	if($companyPrice.val() == '') {
		tishi = '请填写申报价';
	};
	if(tishi != '') {
		mui.toast(tishi);
		return false
	};
	var Fiexd = function(num){
		return num.toFixed(4);
	};
	/*增值税*/
	var zz = Fiexd(((parseFloat($companyPrice.val())-parseFloat($companyOriginalValue.val()))/1.05*.05))*1;
	$('input[name=company1]').val(Fiexd(zz));
	/*增值税附加税*/
	$('input[name=company2]').val(Fiexd(zz*.12));
	/*契税*/
	$('input[name=company3]').val(Fiexd((parseFloat($companyPrice.val())-zz)*.03));
	/*印花税*/
	$('input[name=company4]').val(Fiexd(parseFloat($companyPrice.val())*0.001));
	/*土地增值*/
	var kcl,sl;//扣除率和税率
	/*扣除项目金额*/
	var kMoney = (parseFloat($companyOriginalValue.val())//原值
									+(parseFloat($companyOriginalValue.val())*0.03)//原契
									+(parseFloat($companyOriginalValue.val())*0.05*parseFloat($companyYear.val()))//原值*5%*年数
									+(zz)//增值税
									+(0.12*zz)//本次附加税
									+((parseFloat($companyPrice.val())*0.001)*0.0005)
							);
	/*增值额*/
	console.log(zz)
	var zMoney = parseFloat($companyPrice.val())-kMoney;
	var keneng = zMoney/kMoney;
	console.log(kMoney+'||'+zMoney)
	if(keneng<=0.5){
		sl = 0.3
		kcl=0;
	}else if(keneng>0.5&&keneng<=1){
		sl = 0.4
		kcl=0.05;
	}else if(keneng>1&&keneng<=2){
		sl = 0.5
		kcl=0.15;
	}else if(zMoney/kMoney>.2){
		sl = 0.6
		kcl=0.35;
	}
	$('input[name=company6]').val(Fiexd((zMoney*sl)-(kMoney*kcl)));
	/*税率*/
	$('input[name=company5]').val(Fiexd(sl));
	/*个税*/
	$('input[name=company7]').val(Fiexd((parseFloat($companyPrice.val())
								-(zz)-parseFloat($companyOriginalValue.val())
								-(parseFloat($companyOriginalValue.val())*0.03)
								-(zz*0.12)
								-((zMoney*sl)-kMoney*kcl)
								-((parseFloat($companyPrice.val())*0.001)*0.0005)
								-(parseFloat($companyPrice.val())*.1))*.2));//装修
	
	/*总价*/
	$('input[name=companyAll]').val(Fiexd(parseFloat($('input[name=company1]').val())
									+parseFloat($('input[name=company2]').val())
									+parseFloat($('input[name=company3]').val())
									+parseFloat($('input[name=company4]').val())
									+parseFloat($('input[name=company5]').val())
									+parseFloat($('input[name=company6]').val())));
	
})
