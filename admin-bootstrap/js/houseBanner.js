$(function() {
	//首页轮播
	var b_container = $('.si-banner-b ul'),
		b_lis = b_container.find('li'),
		s_container = $('.si-banner-slst ul'),
		s_lis = s_container.find('li');
	var len = b_lis.length || s_lis.length;
	var b_Width = b_lis.eq(0).width();
	var s_Width = s_lis.eq(0).width() + parseInt(s_lis.eq(0).css('marginLeft')) + parseInt(s_lis.eq(0).css('marginRight'));
	var index = 0;
	var picTimer;

	b_container.parent().css({
		position: 'relative'
	});
	b_container.css({
		width: b_Width * len,
		position: 'absolute'
	});
	s_container.parent().css({
		position: 'relative',
		overflow: 'hidden'
	});
	s_container.css({
		width: s_Width * len,
		position: 'absolute'
	});

	// showPics
	function showPics(index) {
		b_container.stop(true, false).animate({
			"left": -index * b_Width
		}, 300);
		s_container.stop(true, false).animate({
			"left": -3 * Math.floor(index / 3) * s_Width
		}, 300);
		s_lis.removeClass("current").eq(index).addClass("current");
		s_lis.stop(true, false).animate({
			"opacity": "0.5"
		}, 300, function() {
			$(this).find('.img').removeClass('img_on');
		}).eq(index).stop(true, false).animate({
			"opacity": "1"
		}, 300, function() {
			$(this).find('.img').addClass('img_on')
		});
	}

	function change() {
		clean();
		showPics(index);
		index++;
		if(index == len) {
			index = 0;
		}
		picTimer = setTimeout(change, 3000);
	}

	function clean() {
		if(picTimer) clearTimeout(picTimer);
	}

	s_lis.css({
		opacity: "0.8",
		filter: "alpha(opacity=80)"
	}).click(function() {
		index = s_lis.index(this);
		showPics(index);
		return false;
	});

	// Prev
	$(".si-banner-btn a.l").click(function() {
		index -= 1;
		if(index == -1) {
			index = len - 1;
		}
		showPics(index);
		return false;
	});

	// Next
	$(".si-banner-btn a.r").click(function() {
		index += 1;
		if(index == len) {
			index = 0;
		}
		showPics(index);
		return false;
	});
	//删除图片
	$(".del .delbg .remove").on("click",function(){
		$(this).parents("li").remove();
//		return false;
	})

});