var swiper = new Swiper('.swiper-container', {
		direction: 'vertical', //竖向切换
		slidesPerView: 1, //容器里面的slide 数量
		spaceBetween: 30, //间距
		mousewheel: true, //是否用鼠标滑动
		//					effect : 'cube',
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		on: {
			init: function() {
				swiperAnimateCache(this); //隐藏动画元素 
				swiperAnimate(this); //初始化完成开始动画
			},
			slideChangeTransitionEnd: function() {
				$('.m-menu li').eq(this.activeIndex).addClass('active').siblings().removeClass('active')
				console.log(this.activeIndex)
				swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
			}
		}
	}

);
$('.m-menu').on('click', 'li', function() {
	swiper.slideTo($(this).index(), 500, true); //切换到第一个slide，速度为1秒
});
/*承诺*/
$('.m-info-left li').hover(function() {
	$(this).addClass('animated tada');
}, function() {
	$(this).removeClass('animated tada');
});
/*银行动画*/
$('.m-info-right li').hover(function() {
	$(this).addClass('animated pulse');
}, function() {
	$(this).removeClass('animated pulse');
});
/*index big 字儿*/
$('.m-banner-text .big').hover(function() {
	$(this).addClass('animated swing');
}, function() {
	$(this).removeClass('animated swing');
});
/*公司介绍*/
$('.label-img').hover(function() {
	$(this).addClass('animated rubberBand');
}, function() {
	$(this).removeClass('animated rubberBand');
});