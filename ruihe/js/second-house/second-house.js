mui.init();
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
var serach = document.querySelector('#js-serach');
var serachTop = serach.offsetTop;
window.onscroll = function(e ) {
	var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
     if(scrollTop >serachTop){
     	serach.className = 'search-top fixd-select';
     }else if(scrollTop <=serachTop){
     	serach.className = 'search-top';
     }
};
//筛选
var $nav_child = $(".nav_child");
var $arrow = $(".nav_ul .mui-icon");
var $bg = $(".bg");
$(".nav_ul_li").on('tap',function(){
	$("body").css("overflow","hidden");
	var index = $(this).index()
	
	if($nav_child.eq(index).is(':hidden')){
		serach.className = 'search-top fixd-select';
		$bg.show();
		$arrow.removeClass('active');
		$nav_child.hide();
		$nav_child.eq(index).show();
		$arrow.eq(index).addClass('active')
	}else{
		$("body").css("overflow","initial");
		serach.className = 'search-top';
		$nav_child.hide();
		$bg.hide()
		$arrow.removeClass('active')
	}
	
});
$bg.on('tap',function(){
	
	$("body").css("overflow","initial");
	$nav_child.hide();
	$arrow.removeClass('active')
	serach.className = 'search-top';
	setTimeout(function(){
		$bg.hide()
	},30)

});
$bg.on('touchmove',function(){
	e.preventDefault()
})
//$('.mask').on('touchmove',function(e){})
$nav_child.on('tap',function(){
	console.log('12345554332')
	return false
})






;(function($, doc) {
	//普通示例
	var userPicker = new $.PopPicker();
	userPicker.setData([{
		value: '1',
		text: '默认排序'
	}, {
		value: '2',
		text: '面积从高到低'
	}, {
		value: '3',
		text: '面积从低到高'
	}, {
		value: '4',
		text: '单价从高到低'
	}, {
		value: '5',
		text: '单价从低到高'
	}, {
		value: '6',
		text: '总价从高到低'
	}, {
		value: '7',
		text: '总价从低到高'
	}, {
		value: '8',
		text: '看房客户多'
	}]);
	var showUserPickerButton = doc.getElementById('sortBtn');
	//var userResult = doc.getElementById('userResult');
	showUserPickerButton.addEventListener('tap', function(event) {
		userPicker.show(function(items) {
			//userResult.innerText = JSON.stringify(items[0]);
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	}, false);
})(mui, document);