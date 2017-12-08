/*个人住宅税费*/
$('#person-house').on('click', function() {

	var $taxPrice = $("input[name=taxPrice]"), //计税价(网签价/指导价)
		$originalValue = $("input[name=originalValue]"), //原值
		$originalTax = $("input[name=originalTax]"), //原契税
		$interest = $("input[name=interest]"), //利息
		$a = $("input[name=a]"), //增值税
		$b = $("input[name=b]"), //个税网签价
		$c = $("input[name=c]"), //个税指导价高
		$d = $("input[name=d]"), //契税网签价
		$e = $("input[name=e]"); //契税指导价高
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
	
	if($interest.val() == '') {
		tishi = '请填写利息';
	};
	if($originalTax.val() == '') {
		tishi = '请填写原契税';
	};
	if($originalValue.val() == '') {
		tishi = '请填写原值';
	};
	if($taxPrice.val() == '') {
		tishi = '请填写计税价';
	};
	if(tishi != '') {
		Layer.showMsg(tishi);
		return false
	};
	var Fiexd = function(num) {
		return num.toFixed(4);
	}
	/*住宅判断*/
	if($a.attr('data-type') == 1 || $a.attr('data-type') == 3) {
		/*增值税*/
		var zz = Fiexd((parseFloat($taxPrice.val()) / 1.05 * 0.05)) * 1;

		$('.tax1').text(zz);
		/*增值税附加税*/
		$('.tax2').text(Fiexd((zz * 0.12)));
		/*个税*/
		if($b.attr('data-type') == 1 || $b.attr('data-type') == 2) {
			$('.tax3').text(Fiexd(((parseFloat($taxPrice.val()) -
				parseFloat($originalValue.val()) -
				parseFloat($originalTax.val()) -
				zz - (zz * 0.12) - (parseFloat($taxPrice.val()) * .1) -
				parseFloat($interest.val())) * .2)));
		} else if($b.attr('data-type') == 3) {
			$('.tax3').text('0.0000');
		};
		/*契税*/
		if($d.attr('data-type') == 1) {
			$('.tax5').text(Fiexd(((parseFloat($taxPrice.val() - zz)) * .01)));
		} else if($d.attr('data-type') == 2) {
			$('.tax5').text(Fiexd(((parseFloat($taxPrice.val() - zz)) * .015)));
		} else if($d.attr('data-type') == 3) {
			$('.tax5').text(Fiexd(((parseFloat($taxPrice.val() - zz)) * .03)));
		};

	} else if($a.attr('data-type') == 2) {
		/*增值税*/
		var zz = 0;
		$('.tax1').text('0.0000');
		/*增值税附加税*/
		$('.tax2').text('0.0000');
		/*个税*/
		if($b.attr('data-type') == 1 || $b.attr('data-type') == 2) {
			$('.tax3').text(Fiexd(((parseFloat($taxPrice.val()) -
				parseFloat($originalValue.val()) -
				parseFloat($originalTax.val()) -
				zz - (zz * 0.12) - (parseFloat($taxPrice.val()) * .1) -
				parseFloat($interest.val())) * .2)));
		} else if($b.attr('data-type') == 3) {
			$('.tax3').text('0.0000');
		};
		/*契税*/
		if($d.attr('data-type') == 1) {
			$('.tax5').text(Fiexd(((parseFloat($taxPrice.val() - zz)) * .01)));
		} else if($d.attr('data-type') == 2) {
			$('.tax5').text(Fiexd(((parseFloat($taxPrice.val() - zz)) * .015)));
		} else if($d.attr('data-type') == 3) {
			$('.tax5').text(Fiexd(((parseFloat($taxPrice.val() - zz)) * .03)));
		};

	} else if($a.attr('data-type') == 4) {
		/*增值税*/
		var zz = Fiexd(((parseFloat($taxPrice.val()) - parseFloat($originalValue.val())) / 1.05 * 0.05)) * 1;
		$('.tax1').text(zz);
		/*增值税附加税*/
		$('.tax2').text(Fiexd((zz * 0.12)));
		/*个税*/
		if($b.attr('data-type') == 1 || $b.attr('data-type') == 2) {
			$('.tax3').text(Fiexd(((parseFloat($taxPrice.val()) -
				parseFloat($originalValue.val()) -
				parseFloat($originalTax.val()) -
				zz - (zz * 0.12) - (parseFloat($taxPrice.val()) * .1) -
				parseFloat($interest.val())) * .2)));
		} else if($b.attr('data-type') == 3) {
			$('.tax3').text('0.0000');
		};
		/*契税*/
		if($d.attr('data-type') == 1) {
			$('.tax5').text(Fiexd(((parseFloat($taxPrice.val() - zz)) * .01)));
		} else if($d.attr('data-type') == 2) {
			$('.tax5').text(Fiexd(((parseFloat($taxPrice.val() - zz)) * .015)));
		} else if($d.attr('data-type') == 3) {
			$('.tax5').text(Fiexd(((parseFloat($taxPrice.val() - zz)) * .03)));
		};
	};
	/*总价*/
	$('.taxAll').text(Fiexd((parseFloat($('.tax1').text()) +
		parseFloat($('.tax2').text()) +
		parseFloat($('.tax3').text()) +
		parseFloat($('.tax5').text()))));

});
/*个人商业税费*/
$("#personBusiness").on('click', function() {
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
		Layer.showMsg(tishi);
		return false
	};
	var Fiexd = function(num) {
		return num.toFixed(8);
	};
	/*增值税*/
	var zz = Fiexd(((parseFloat($businessPrice.val()) - parseFloat($businessOriginalValue.val())) / 1.05 * .05)) * 1;
	$('.busiss1').text(Fiexd(zz));
	/*增值税附加税*/
	$('.busiss2').text(Fiexd(zz * .12));
	/*契税*/
	$('.busiss3').text(Fiexd((parseFloat($businessPrice.val()) - zz) * .03));
	/*印花税*/
	$('.busiss4').text(Fiexd(parseFloat($businessPrice.val()) * 0.001));
	/*土地增值*/
	var kcl, sl; //扣除率和税率
	/*扣除项目金额*/
	var kMoney = (parseFloat($businessOriginalValue.val()) //原值
		+
		(parseFloat($businessOriginalValue.val()) * 0.03) //原契
		+
		(parseFloat($businessOriginalValue.val()) * 0.05 * parseFloat($businessYear.val())) //原值*5%*年数
		+
		(zz) //增值税
		+
		(0.12 * zz) //本次附加税
		+
		((parseFloat($businessPrice.val()) * 0.001) * 0.0005)
	);
	/*增值额*/
	console.log(zz)
	var zMoney = parseFloat($businessPrice.val()) - kMoney;
	var keneng = zMoney / kMoney;
	console.log(kMoney + '||' + zMoney)
	if(keneng <= 0.5) {
		sl = 0.3
		kcl = 0;
	} else if(keneng > 0.5 && keneng <= 1) {
		sl = 0.4
		kcl = 0.05;
	} else if(keneng > 1 && keneng <= 2) {
		sl = 0.5
		kcl = 0.15;
	} else if(zMoney / kMoney > .2) {
		sl = 0.6
		kcl = 0.35;
	}
	$('.busiss6').text(Fiexd((zMoney * sl) - (kMoney * kcl)));
	/*税率*/
	$('.busiss5').text(Fiexd(sl));
	/*个税*/
	$('.busiss7').text(Fiexd((parseFloat($businessPrice.val()) -
		(zz) - parseFloat($businessOriginalValue.val()) -
		(parseFloat($businessOriginalValue.val()) * 0.03) -
		(zz * 0.12) -
		((zMoney * sl) - kMoney * kcl) -
		((parseFloat($businessPrice.val()) * 0.001) * 0.0005) -
		(parseFloat($businessPrice.val()) * .1)) * .2)); //装修

	/*总价*/
	$('.busissAll').text(parseFloat($('.busiss1').text()) +
		parseFloat($('.busiss2').text()) +
		parseFloat($('.busiss3').text()) +
		parseFloat($('.busiss4').text()) +
		parseFloat($('.busiss5').text()) +
		parseFloat($('.busiss6').text()) +
		parseFloat($('.busiss7').text()));
	//$('input[name=busissAll]').val(1)

})
/*公司出售商业税费*/
$("#btncompany").on('click', function() {

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
		Layer.showMsg(tishi);
		return false
	};
	var Fiexd = function(num) {
		return num.toFixed(4);
	};
	/*增值税*/
	var zz = Fiexd(((parseFloat($companyPrice.val()) - parseFloat($companyOriginalValue.val())) / 1.05 * .05)) * 1;
	$('.company1').text(Fiexd(zz));
	/*增值税附加税*/
	$('.company2').text(Fiexd(zz * .12));
	/*契税*/
	$('.company3').text(Fiexd((parseFloat($companyPrice.val()) - zz) * .03));
	/*印花税*/
	$('.company4').text(Fiexd(parseFloat($companyPrice.val()) * 0.001));
	/*土地增值*/
	var kcl, sl; //扣除率和税率
	/*扣除项目金额*/
	var kMoney = (parseFloat($companyOriginalValue.val()) //原值
		+
		(parseFloat($companyOriginalValue.val()) * 0.03) //原契
		+
		(parseFloat($companyOriginalValue.val()) * 0.05 * parseFloat($companyYear.val())) //原值*5%*年数
		+
		(zz) //增值税
		+
		(0.12 * zz) //本次附加税
		+
		((parseFloat($companyPrice.val()) * 0.001) * 0.0005)
	);
	/*增值额*/
	console.log(zz)
	var zMoney = parseFloat($companyPrice.val()) - kMoney;
	var keneng = zMoney / kMoney;
	console.log(kMoney + '||' + zMoney)
	if(keneng <= 0.5) {
		sl = 0.3
		kcl = 0;
	} else if(keneng > 0.5 && keneng <= 1) {
		sl = 0.4
		kcl = 0.05;
	} else if(keneng > 1 && keneng <= 2) {
		sl = 0.5
		kcl = 0.15;
	} else if(zMoney / kMoney > .2) {
		sl = 0.6
		kcl = 0.35;
	}
	$('.company6').text(Fiexd((zMoney * sl) - (kMoney * kcl)));
	/*税率*/
	$('.company5').text(Fiexd(sl));

	/*总价*/
	$('.companyAll').text(Fiexd(parseFloat($('.company1').text()) +
		parseFloat($('.company2').text()) +
		parseFloat($('.company3').text()) +
		parseFloat($('.company4').text()) +
		parseFloat($('.company5').text()) +
		parseFloat($('.company6').text())));

})



/*切换选项*/
$('.m-tab-list li').click(function() {
	$(this).addClass('active').siblings().removeClass('active');
	$('.m-item').eq($(this).index()).show().siblings().hide()
});

$(".select-cont input").on('click', function() {
	$(".select-option").fadeOut();
	$(this).siblings('ol').stop().fadeToggle();
	return false;
});
$('.select-option li').on('click', function() {
	$(this).parents('ol').siblings('input').val($(this).text().trim());
	$(this).parents('ol').siblings('input').attr('data-type',$(this).attr('data-type'));
	$(this).parents('ol').fadeOut();
});
$(document).click(function(){
	$(".select-option").fadeOut();
})
