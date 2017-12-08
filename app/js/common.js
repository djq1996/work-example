/*公用js*/
/*打开新页面*/
function OpenNewPage(id, pageurl) {
	mui('body').on('tap', id, function() {
		mui.openWindow({
			url: pageurl,
			id: id,
			styles: {
				popGesture:"close"
			},	
			show: {
				aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
				duration: '300', //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			},
			 waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		      title:'主银，表着急...',//等待对话框上显示的提示内容
		      options:{ 
//		        width:waiting-dialog-widht,//等待框背景区域宽度，默认根据内容自动计算合适宽度
//		        height:waiting-dialog-height,//等待框背景区域高度，默认根据内容自动计算合适高度
		      }
		    }
		})
	})
}
$(function() {
	var jumpUrl = {
		toMyContract: "_www/html/personalCenter/myContract.html",
		toMyContractDetail: "_www/html/personalCenter/myContractDetail.html",
		toHosingList: "_www/html/_blank.html",
		toHouseList: "_www/html/myHousingResources/My_HouseResourcesList.html",
		toCustomerList: "_www/html/myCustomers/customers-lists.html",
		toStatement: "_www/html/statement/statement.html",
		toHouseLouDong:'_www/html/houses/houses-lou.html',
		toRoomNum:'_www/html/houses/houses-room.html',
		toQuantization:'_www/html/personalCenter/dayQuantization.html',
		toAddressBook:'_www/html/personalCenter/addressBook.html',
		toPerformance:'_www/html/personalCenter/performance.html',
		toAccountSettings:'_www/html/personalCenter/accountSettings.html',
		toMessage:'_www/html/index/message.html',
		toPinglun:'_www/html/index/comment.html',
		toSearch:'_www/html/index/search.html',
		toHouseAddFollow:'_www/html/myHousingResources/writeFollow.html'
	};
	
	OpenNewPage('#toAddressBook', '_www/html/personalCenter/addressBook.html'); 
	OpenNewPage('#toFeedback', '_www/html/personalCenter/feedback.html'); 
	OpenNewPage('#toCounter', '_www/html/personalCenter/counter.html'); 
	OpenNewPage('#toAbout', '_www/html/personalCenter/about.html'); 
	OpenNewPage('#toRaking', '_www/html/personalCenter/raking.html'); 
	OpenNewPage('#toPerformance', jumpUrl.toPerformance); 
	OpenNewPage('#toAccountSettings', jumpUrl.toAccountSettings); 
	OpenNewPage('#toPersonalCenter', '_www/html/personalCenter/personalCenter.html'); 
	OpenNewPage('#toRent', '_www/html/houses/turnToRent.html');
	OpenNewPage('#toSell', '_www/html/houses/turnToSell.html');
	OpenNewPage('#toPullrefresh', '_www/html/myCustomers/pullrefresh.html');
	OpenNewPage('#toAddHosing', '_www/html/myHousingResources/addHosing.html');
	OpenNewPage('#toLogin', '_www/login_3.html');
	OpenNewPage('#toIndex', '_www/index.html');
	OpenNewPage('#toHouse', '_www/html/houses/houses.html');
	OpenNewPage('#toHouseList', jumpUrl.toHosingList);
	OpenNewPage('#toCustomerList', '_www/html/myCustomers/customers-lists.html');
	OpenNewPage('#toAddCustormer', '_www/html/myCustomers/luru.html');
	OpenNewPage('#toAddFollow', '_www/html/myCustomers/add-follow-up.html');
	OpenNewPage('#toLook', '_www/html/myCustomers/take-look-at.html');
	OpenNewPage('#toCustomersDetails', '_www/html/myCustomers/customers-details.html');
	OpenNewPage('#toAddPic', '_www/html/myHousingResources/addPic.html');
	OpenNewPage('#toApplyWri', '_www/html/myHousingResources/applyWrittenEntrust.html');
	OpenNewPage('#toStatement', '_www/html/statement/statement.html');
	OpenNewPage('#toMore', '_www/html/myCustomers/more.html');
	OpenNewPage('#tolou',jumpUrl.toHouseLouDong);
	OpenNewPage('#toRoom',jumpUrl.toRoomNum);
	OpenNewPage("#toQuantization",jumpUrl.toQuantization);
	OpenNewPage('#toAddressBook',jumpUrl.toAddressBook);
	OpenNewPage('#toMyContract',jumpUrl.toMyContract);
	OpenNewPage('#toMyContractDetail',jumpUrl.toMyContractDetail);
	OpenNewPage('#toMessage',jumpUrl.toMessage);
	OpenNewPage('.pinglun',jumpUrl.toPinglun);
	OpenNewPage('.toGJ',jumpUrl.toHouseAddFollow);
	OpenNewPage('#toSearch',jumpUrl.toSearch);
});

