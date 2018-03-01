/*common js*/
var baseUrl = 'http://120.27.11.53:8090/api/',
	imgUrl = null;

//var baseUrl = 'http://192.168.1.127:8090/api/';

/*点击打开新页面*/
/*
 * option.btn[string]	点击跳转的按钮   (可以为空)
 * option.url[string]   跳转的url  (不可为空,id 如果需要的话,跳转的页面id 为 url路径去除文件.html)
 * option.data[obj]     传给下个页面的数据    (可以为空)
 * demo openNewPage({url:'index.html'})
 * */
/*获取图片接口*/
mui.ajax(baseUrl+'API_Dictionary/SysConfig',{
	"dataType": "json",
	"type": "post",
	"async":false,
	success: function(data){
		imgUrl = data.results.ImageServer;
	}
});
/*input输入限制*/
function restrict(parents,id){
	$(parents).on('keyup',id,function(){
		$(this).val($(this).val().replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,''));
	});
/*	$(parents).on('paste',id,function(){
		$(this).val($(this).val().replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,''));
	});
	$(parents).on('input',id,function(){
		$(this).val($(this).val().replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,''));
	},false);
	$(parents).on('propertychange',id,function(){ 
		$(this).val($(this).val().replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,''));
	});*/
	$(parents).on('change',id,function(){
		$(this).val($(this).val().replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,''));
	});
	$(parents).on('blur',id,function(){
		$(this).val($(this).val().replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,''));
	});
}
function openNewPage(option) {
	var setting = {
		btn: false,
		data: {},
	};
	var pageOption = {
		url: option.url,
		id: option.url.slice(1, option.url.length - 5),
		show: {
			aniShow: 'pop-in',
			duration: '300',
		},
		styles: {
			popGesture: "close"
		},
		extras: option.data,
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
			title: '飞速加载...', //等待对话框上显示的提示内容
		}
	};
	if(option.btn || setting.btn) {
		mui('body').on('tap', option.btn, function() {
			mui.openWindow(pageOption);
			return false;
		});
	} else {
		mui.openWindow(pageOption);
	};
	
};
/*格式时间*/
function fmtDate(obj){
	if(obj == '0001-01-01T00:00:00') {
		return '暂无信息'
	}
	return obj.slice(0,10);
};
/*修改房源信息回显*/
function theEcho(id,type,data) {
	if(data){
		document.querySelector(id).children[0].children[1].value = escape({
			type:type,
			value:data
		});
	}
		
};
/*用途，等级，等级样式，方向，付款方式等数字转意*/
function escape(setting){
	var str = ''; 
	//回显产权人转义
	if(setting.type == 'state'){
		switch(setting.value){
			case 1:
				str = '已接';
			break;
			case 2: 
				str = '未接';
			break;
			case 3:
				str = '未接+国际长途';
			break;
			case 4: 
				str = '拒接';
			break;
			case 5:
				str = '关机';
			break;
			case 6: 
				str = '停机';
			break;
			case 7:
				str = '空号';
			break;
			case 8: 
				str = '无法接通';
			break;
			case 9:
				str = '已换机主';
			break;
			case 10: 
				str = '态度恶劣';
			break;
			case 11:
				str = '多次确认无效';
			break;
			default:
				str = '';
		}
		return str
	};
	if(setting.type == 'IsOnly'){
		switch(setting.value){
			case 1:
				str = '是';
			break;
			case 2: 
				str = '否';
			break;
			default:
				str = '';
		}
		return str
	};
	//回显税费方式转义
	if(setting.type == 'PayerType'){
		switch(setting.value){
			case 1:
				str = '买家承担';
			break;
			case 2: 
				str = '卖家承担';
			break;
			case 3:
				str = '各付';
			break;
			default:
				str = '';
		}
		return str
	};
	//租赁付款方式转义
	if(setting.type == 'RentPayType'){
		switch(setting.value){
			case 1:
				str = '月付';
			break;
			case 2: 
				str = '季付';
			break;
			case 3:
				str = '半年付';
			break;
			case 4:
				str = '年付';
			break;
			default:
				str = '';
		}
		return str
	};
	//居住状态转义
	if(setting.type == 'ShowingsType'){
		switch(setting.value){
			case 1:
				str = '我司钥匙';
			break;
			case 2: 
				str = '他司钥匙';
			break;
			case 3:
				str = '业主自住';
			break;
			case 4:
				str = '租客开门';
			break;
			case 5: 
				str = '预约代理人';
			break;
			case 6:
				str = '预约业主开门';
			break;
			case 7:
				str = '预约亲友';
			break;
			case 8: 
				str = '预约员工';
			break;
			case 9:
				str = '暂不可看';
			break;
			case 10:
				str = '其它';
			break;
			default:
				str = '';
		}
		return str
	};
	//出售等级状态转义
	if(setting.type == 'HouseLevel'){
		switch(setting.value){
			case 1:
				str = 'A';
			break;
			case 2: 
				str = 'B';
			break;
			case 3:
				str = 'C';
			break;
			default:
				str = '';
		}
		return str
	};
	//出租状态转义
	if(setting.type == 'SellType'){
		switch(setting.value){
			case 1:
				str = '求租';
			break;
			case 2: 
				str = '已租';
			break;
			case 3:
				str = '暂不租';
			break;
			default:
				str = '';
		}
		return str
	};
	//出售等级转义
	if(setting.type == 'SellStatusType'){
		switch(setting.value){
			case 1:
				str = '出售';
			break;
			case 2: 
				str = '已售';
			break;
			case 3:
				str = '暂不售';
			break;
			default:
				str = '';
		}
		return str
	};
	//付款方式等数字转意
	if(setting.type == 'PayStatusType'){
		switch(parseInt(setting.value)){
			case 1:
				str = '一次付清';
			break;
			case 2: 
				str = '按揭';
			break;
			case 3:
				str = '垫资解按';
			break;
			default:
				str = '';
		}
		return str
	};
	//用途
	if(setting.type == 'UseChannel'){
		switch(setting.value){
			case 1:
				str = '住宅';
			break;
			case 2: 
				str = '商住';
			break;
			case 3:
				str = '商铺';
			break;
			case 4:
				str = '厂房';
			break;
			case 5:
				str = '投资';
			break;
			case 6:
				str = '写字楼';
			break;
			case 7:
				str = '其他';
			break;
			default:
				str = '';
		}
		return str
	};
	//等级样式
	if(setting.type == 'LevelClass'){
		switch(setting.value){
			case 1:
				str = 'levA';
			break;
			case 2: 
				str = 'levB';
			break;
			case 3:
				str = 'levD';
			break;
			case 4:
				str = 'levC';
			break;
			default:
				str = '';
		}
		return str
	};
	//等级
	if(setting.type == 'LevelText'){
		switch(setting.value){
			case 1:
				str = 'A级';
			break;
			case 2: 
				str = 'B级';
			break;
			case 3:
				str = 'C级';
			break;
			case 4:
				str = '私客';
			break;
			default:
				str = '';
		}
		return str
	};
	//方向
	if(setting.type == 'HouseForwardType'){
		switch(setting.value){
			case 0:
				str = ' ';
			break;
			case 1:
				str = '东';
			break;
			case 2: 
				str = '西';
			break;
			case 3:
				str = '南';
			break;
			case 4:
				str = '北';
			break;
			case 5:
				str = '东西';
			break;
			case 6:
				str = '南北';
			break;
			case 7:
				str = '西南';
			break;
			case 8:
				str = '西北';
			break;
			case 9:
				str = '东南';
			break;
			case 10:
				str = '东北';
			break;
			default:
				str = '';
		}
		return str
	}
	//装修
	if(setting.type == 'DegreeLevelType'){
		switch(setting.value){
			case 0:
				str = ' ';
			break;
			case 1:
				str = '豪装';
			break;
			case 2: 
				str = '精装';
			break;
			case 3:
				str = '简装';
			break;
			case 4:
				str = '毛坯';
			break;
			default:
				str = '';
		}
		return str
	};
	//跟进方式
	if(setting.type == 'JGType'){
		switch(setting.value){
			case 1:
				str = '去电';
			break;
			case 2: 
				str = '来电';
			break;
			case 3:
				str = '来访';
			break;
			case 8:
				str = '短信';
			break;
			case 9:
				str = '微信';
			break;
			case 10:
				str = '其他';
			break;
			default:
				str = '';
		}
		return str
	};
	//居住状态
	if(setting.type == 'liveStatusType'){
		switch(setting.value){
			case 0:
				str = '未知';
			break;
			case 1:
				str = '自住';
			break;
			case 2: 
				str = '闲置';
			break;
			case 3:
				str = '有租客';
			break;
			case 4:
				str = '其他';
			break;
		}
		return str
	}
};
function spliceArry(_arr,_obj) {
    var length = _arr.length;
    for(var i = 0; i < length; i++)
    {
        if(_arr[i] == _obj)
        {
            if(i == 0)
            {
                _arr.shift(); //删除并返回数组的第一个元素
                return;
            }
            else if(i == length-1)
            {
                _arr.pop();  //删除并返回数组的最后一个元素
                return;
            }
            else
            {
                _arr.splice(i,1); //删除下标为i的元素
                return;
            }
        }
    }
};
