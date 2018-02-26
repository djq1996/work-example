
/*ztree*/
var setting = {
	view: {
		addDiyDom: addDiyDom,
		//					removeHoverDom: removeHoverDom,
		//					selectedMulti: false,
		showLine: true //是否显示线
	},
	edit: {
		//					enable: true, //是否可以编辑
		//					editNameSelectAll: true,
		//					showRemoveBtn: showRemoveBtn,
		//					removeTitle :'删除',
		//					showRenameBtn: showRenameBtn,
		//					renameTitle : '修改'
	},
	data: {
		simpleData: {
			enable: true //是否采用简单数据模式 (Array)
			//不需要用户再把数据库中取出的 List 强行转换为复杂的 JSON 嵌套格式
		}
	},
	callback: {
		//					beforeDrag: beforeDrag, //是否允许拖拽
		//					beforeEditName: beforeEditName, //是否可以编辑名称
		//					beforeRemove: beforeRemove, //是否删除
		//					beforeRename: beforeRename, //结束编辑后根据返回值决定是否可以编辑
		//					onRemove: onRemove, //删除之后的回调
		//					onRename: onRename //编辑名称之后的回调
	}
};

var arr = [{
	name: "扑满山",
	open: true,
	type: 'fq',
	children: [{
			name: "扑满山一期",
			open: true,
			type: 'zl',
			children: [{
					name: "扑满山1号楼",
					type: 'dy',
					open: true,
					children: [{
							name: "1单元",
							open: true,
							type: 'fj'
						},
						{
							name: "2单元",
							open: true,
							type: 'fj'
						}
					]
				},
				{
					name: "扑满山2号楼",
					open: true,
					type: 'dy',
					children: [{
						name: "1单元",
						type: 'fj',
						open: true
					}]
				},
				{
					name: "扑满山一期车库",
					open: true,
					type: 'fqu',
					children: [{
							name: "A区",
							type: 'cw',
							open: true
						},
						{
							name: "B区",
							type: 'cw',
							open: true
						}
					]
				},
				{
					name: "扑满山一期仓储",
					open: true,
					type: 'cc',
					children: [{
							name: "1单元",
							type: 'cch',
							open: true
						},
						{
							name: "2单元",
							type: 'cch',
							open: true
						}
					]
				}
			]
		},
		{
			name: "扑满山二期",
			type: 'zl',
			children: []
		}
	]
}];
var log, className = "dark";
//添加修改删除按钮
function addDiyDom(treeId, treeNode) {
	var sObj = $("#" + treeNode.tId + "_span");
	if(treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
	var addfq = "<div class='detail'>2个分期（区）、2栋楼、3600户，包含住宅3500户、商铺100户、仓储100户、车库100个</div>" +
		"<div class='editor'>" +
		"<span class='button add' id='fqAddBtn_" + treeNode.tId +
		"' title='添加分期' onfocus='this.blur();'>添加分期</span>" +
		"<span class='button edit' id='fqEditBtn_" + treeNode.tId +
		"' title='修改' onfocus='this.blur();'>修改</span>" +
		"<span class='button remove' id='fqRemoveBtn_" + treeNode.tId +
		"' title='删除' onfocus='this.blur();'>删除</span>" +
		"</div>";

	var addzl = "<div class='detail'>2栋楼、3600户，包含住宅2500户、商铺60户、仓储100户、车库100个</div>" +
		"<div class='editor'>" +
		"<span class='button add' id='zlAddBtn_" + treeNode.tId +
		"' title='添加坐落' onfocus='this.blur();'>添加坐落</span>" +
		"<span class='button add' id='zlckAddBtn_" + treeNode.tId +
		"' title='添加坐落' onfocus='this.blur();'>添加车库</span>" +
		"<span class='button add' id='zlccAddBtn_" + treeNode.tId +
		"' title='添加坐落' onfocus='this.blur();'>添加仓储</span>" +
		"<span class='button edit' id='zlEditBtn_" + treeNode.tId +
		"' title='修改' onfocus='this.blur();'>修改</span>" +
		"<span class='button remove' id='zlRemoveBtn_" + treeNode.tId +
		"' title='删除' onfocus='this.blur();'>删除</span>" +
		"</div>";
	var adddy = "<div class='detail'>2个单元、2400户，包含住宅2300户、商铺100户</div><div class='editor'>" +
		"<span class='button add' id='dyAddBtn_" + treeNode.tId +
		"' title='添加单元' onfocus='this.blur();'>添加单元</span>" +
		"<span class='button edit' id='dyEditBtn_" + treeNode.tId +
		"' title='修改' onfocus='this.blur();'>修改</span>" +
		"<span class='button remove' id='dyRemoveBtn_" + treeNode.tId +
		"' title='删除' onfocus='this.blur();'>删除</span>" +
		"</div>";
		/*仓储号*/
	var addcch = "<div class='detail'>仓储数量500</div><div class='editor'>" +
		"<span class='button add' id='cchAddBtn_" + treeNode.tId +
		"' title='添加仓储号' onfocus='this.blur();'>添加仓储号</span>" +
		"<span class='button edit' id='cchEditBtn_" + treeNode.tId +
		"' title='修改' onfocus='this.blur();'>修改</span>" +
		"<span class='button remove' id='cchRemoveBtn_" + treeNode.tId +
		"' title='删除' onfocus='this.blur();'>删除</span>" +
		"</div>";
	/*车位*/		
	var addcw = "<div class='detail'>车库数量2000</div><div class='editor'>" +
		"<span class='button add' id='cwAddBtn_" + treeNode.tId +
		"' title='添加车位' onfocus='this.blur();'>添加车位</span>" +
		"<span class='button edit' id='cwEditBtn_" + treeNode.tId +
		"' title='修改' onfocus='this.blur();'>修改</span>" +
		"<span class='button remove' id='cwRemoveBtn_" + treeNode.tId +
		"' title='删除' onfocus='this.blur();'>删除</span>" +
		"</div>";
	/*房间*/
	var addfj = "<div class='detail'>1200户，包含住宅1150户、商铺50户、仓储100户</div><div class='editor'>" +
		"<span class='button add fjAddBtn' id='fjAddBtn_" + treeNode.tId +
		"' title='添加房间' onfocus='this.blur();'>编辑房间</span>" +
		"<span class='button edit fjEditBtn' id='fjEditBtn_" + treeNode.tId +
		"' title='修改' onfocus='this.blur();'>修改</span>" +
		"<span class='button remove' id='fjRemoveBtn_" + treeNode.tId +
		"' title='删除' onfocus='this.blur();'>删除</span>" +
		"</div>";
	/*分区*/
	var addfqu = "<div class='detail'>车库数量2000</div><div class='editor'>" +
		"<span class='button add fjAddBtn' id='fquAddBtn_" + treeNode.tId +
		"' title='添加房间' onfocus='this.blur();'>添加分区</span>" +
		"<span class='button edit fjEditBtn' id='fquEditBtn_" + treeNode.tId +
		"' title='修改' onfocus='this.blur();'>修改</span>" +
		"<span class='button remove' id='fquRemoveBtn_" + treeNode.tId +
		"' title='删除' onfocus='this.blur();'>删除</span>" +
		"</div>";
	var addcc = "<div class='detail'>车库数量2000</div><div class='editor'>" +
	"<span class='button add fjAddBtn' id='ccAddBtn_" + treeNode.tId +
	"' title='添加房间' onfocus='this.blur();'>添加单元</span>" +
	"<span class='button edit fjEditBtn' id='ccEditBtn_" + treeNode.tId +
	"' title='修改' onfocus='this.blur();'>修改</span>" +
	"<span class='button remove' id='ccRemoveBtn_" + treeNode.tId +
	"' title='删除' onfocus='this.blur();'>删除</span>" +
	"</div>";
	switch(treeNode.type) {
		case 'fq':
			sObj.append(addfq);
			break;
		case 'zl':
			sObj.append(addzl);
			break;
		case 'dy':
			sObj.append(adddy);
			break;
		case 'cch':
			sObj.append(addcch);
			break;
		case 'cw':
			sObj.append(addcw);
			break;
		case 'fj':
			sObj.append(addfj);
			break;
		case 'fqu':
		sObj.append(addfqu);
		break;
		case 'cc':
		sObj.append(addcc);
		break;

	}
	//分期弹框
	var fqAddBtn = $("#fqAddBtn_" + treeNode.tId);
	var fqEditBtn = $("#fqEditBtn_" + treeNode.tId);
	var fqRemoveBtn = $("#fqRemoveBtn_" + treeNode.tId);
	fqAddBtn.on("click", function() {
		layerContent('添加分期', $(".addFqBox"), 600, 400)
		return false;
	});
	fqEditBtn.on("click", function() {
		layerContent('修改楼盘', $(".edit_lp"), 600, 400)
		return false;
	});
	fqRemoveBtn.on("click", function() {
		layAlert("切，你点了也没用，我也删不了")
		return false;
	});
	//坐落弹框
	var zlAddBtn = $("#zlAddBtn_" + treeNode.tId);
	var zlckAddBtn = $("#zlckAddBtn_" + treeNode.tId);
	var zlccAddBtn = $("#zlccAddBtn_" + treeNode.tId);
	var zlEditBtn = $("#zlEditBtn_" + treeNode.tId);
	var zlRemoveBtn = $("#zlRemoveBtn_" + treeNode.tId);
	zlAddBtn.on("click", function() {
		layerContent('添加坐落', $(".addZlBox"), 700, 400)
		return false;
	});
	zlckAddBtn.on("click", function() {
		layerContent('添加车库', $(".addCkBox"), 700, 400)
		return false;
	});
	zlccAddBtn.on("click", function() {
		layerContent('添加仓储', $(".addCcBox"), 700, 400)
		return false;
	});
	zlEditBtn.on("click", function() {
		
		layerContent('修改分期', $(".addFqBox"), 700, 450)
		return false;
	});
	zlRemoveBtn.on("click", function() {
		layAlert("切，你点了也没用，我也删不了")
		return false;
	});

	//单元弹框
	var dyAddBtn = $("#dyAddBtn_" + treeNode.tId);
	var dyEditBtn = $("#dyEditBtn_" + treeNode.tId);
	var dyRemoveBtn = $("#dyRemoveBtn_" + treeNode.tId);
	dyAddBtn.on("click", function() {
		layerContent('添加单元', $(".addDyBox"), 700, 450)
		return false;
	});
	dyEditBtn.on("click", function() {
		layerContent('修改坐落', $(".editZlBox"), 700, 450)
		return false;
	});
	dyRemoveBtn.on("click", function() {
		layAlert("切，你点了也没用，我也删不了")
		return false;
	});

	//房间弹框
	var fjAddBtn = $("#fjAddBtn_" + treeNode.tId);
	var fjEditBtn = $("#fjEditBtn_" + treeNode.tId);
	var fjRemoveBtn = $("#fjRemoveBtn_" + treeNode.tId);
	fjAddBtn.on("click", function() {
		addTab('html/楼盘字典/添加房间号.html','','添加房间')
		
		return false;
	});
	fjEditBtn.on("click", function() {
		layerContent('修改单元', $(".editDyBox"), 700, 400)
		return false;
	});
	fjRemoveBtn.on("click", function() {
		layAlert("切，你点了也没用，我也删不了")
		return false;
	});
	//仓储号弹框
	var cchAddBtn = $("#cchAddBtn_" + treeNode.tId);
	var cchEditBtn = $("#cchEditBtn_" + treeNode.tId);
	var cchRemoveBtn = $("#cchRemoveBtn_" + treeNode.tId);
	cchAddBtn.on("click", function() {
		addTab('html/楼盘字典/添加仓储.html','','添加仓储')
		return false;
	});
	cchEditBtn.on("click", function() {
		layerContent('修改单元', $(".editCchBox"), 700, 400)
		return false;
	});
	cchRemoveBtn.on("click", function() {
		layAlert("切，你点了也没用，我也删不了")
		return false;
	});
	//车位弹框
	var cwAddBtn = $("#cwAddBtn_" + treeNode.tId);
	var cwEditBtn = $("#cwEditBtn_" + treeNode.tId);
	var cwRemoveBtn = $("#cwRemoveBtn_" + treeNode.tId);
	cwAddBtn.on("click", function() {
		addTab('html/楼盘字典/添加车位.html','','添加车位')
		return false;
	});
	cwEditBtn.on("click", function() {
		layerContent('修改分区', $(".editFquBox"), 700, 450)
		return false;
	});
	cwRemoveBtn.on("click", function() {
		layAlert("切，你点了也没用，我也删不了")
		return false;
	});
	//车库分区
	var fquAddBtn = $("#fquAddBtn_" + treeNode.tId);
	var fquEditBtn = $("#fquEditBtn_" + treeNode.tId);
	var fquRemoveBtn = $("#fquRemoveBtn_" + treeNode.tId);
	fquAddBtn.on("click", function() {
		layerContent('添加分区', $(".addFquBox"), 700, 450)
//		addTab('html/楼盘字典/添加车位.html','','添加车位')
		return false;
	});
	fquEditBtn.on("click", function() {
		layerContent('修改车库', $(".editCkBox"), 700, 450)
//		addTab('html/楼盘字典/添加车位.html','','修改车位')
		return false;
	});
	fquRemoveBtn.on("click", function() {
		layAlert("切，你点了也没用，我也删不了")
		return false;
	});
	//添加仓储弹框
	var ccAddBtn = $("#ccAddBtn_" + treeNode.tId);
	var ccEditBtn = $("#ccEditBtn_" + treeNode.tId);
	var ccRemoveBtn = $("#ccRemoveBtn_" + treeNode.tId);
	ccAddBtn.on("click", function() {
		layerContent('添加单元', $(".addCcdyBox"), 700, 450)
		return false;
	});
	ccEditBtn.on("click", function() {
		layerContent('修改仓储', $(".editCcZlBox"), 700, 450)
		return false;
	});
	ccRemoveBtn.on("click", function() {
		layAlert("切，你点了也没用，我也删不了")
		return false;
	});

};
//编辑状态
$('.bianji').click(function() {
	if($(".detail").css('display') == 'inline-block') {
		$(this).text('详情')
		$(".detail").css("display", 'none');
		$(".editor").css("display", 'inline-block');
	} else {
		$(this).text('编辑')
		$(".detail").css("display", 'inline-block');
		$(".editor").css("display", 'none');
	}

})

$(document).ready(function() {
	$.fn.zTree.init($("#tree"), setting, arr);
});