		/*提交图片*/
		var myDate = new Date();
		var UploadHousePic = {
			operatorID: localStorage.getItem('userId'),
			operatorName: localStorage.getItem('userName'),
			firstType: 1,
			secondType: 1,
			startDeate: '2017-11-03',
			enddate: '2027-11-12',
		};

		$("#segmentedControls a").click(function() {
			var files = document.querySelector('#inputs').files.length;
			console.log('----' + files)
			if(files > 0) {
				$("#segmentedControls a").eq(UploadHousePic.secondType - 1).addClass('mui-active').siblings().removeClass('mui-active');
				mui.alert('请先提交当前选择图片吧');
				return false
			};
			UploadHousePic.secondType = $(this).index() + 1;
			obj.SecondType = $(this).index() + 1;
			uploadPic();
			console.log(JSON.stringify(UploadHousePic));
		});

		

		mui.init({
			swipeBack: true
		});
		var obj = {
			FirstType: 1,
			SecondType: 1,
		};
		/*wating等待*/
		var wating,
			openWating,
			closeWating;
		
		/*获取到页面之间的传值*/
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			UploadHousePic.roomId = self.roomId;
			UploadHousePic.HouseID = self.HouseID;
			obj.HouseId = self.HouseID;
			console.log(JSON.stringify(obj));
			/*把已经上传的图片显示*/
			uploadPic();
			/*检测数量限制  能否上传*/
//			UploadTopCheck();
			/*制作wating*/
			openWating = function(){
				console.log('执行了挖听')
				wating = plus.nativeUI.showWaiting( "等待中..." );
			};
			closeWating = function (){
				console.log('执行了挖听关闭')
				plus.nativeUI.closeWaiting(wating);
			};
			/*关闭wating*/
		});
		/*提交图片按钮*/
		var wating;
		var mask = mui.createMask();//callback为用户点击蒙版时自动执行的回调；
		$("#savePic").click(function() {
//			openWating();
			/*判断是否有图片*/
			var files = document.querySelector('#inputs').files.length
			if(files == 0) {
				mui.alert('选择几张图片吧');
				return false
			};
			/*获取提交时间*/
			UploadHousePic.startDeate = myDate.toLocaleString();
			console.log(JSON.stringify(UploadHousePic));
			/*限制重复点击*/
			$("#savePic").attr('disabled', 'disabled');
			//显示遮罩;
			mask.show();
			wating = plus.nativeUI.showWaiting( "上传中..." );
			var form = $("form[name=fileForm]");
			var options = {
				url: baseUrl + 'API_House/UploadHousePic', //上传文件的路径  
				type: 'post',
				data: UploadHousePic,
				success: function(data, status) {
					console.log(JSON.stringify(data));
					$("#savePic").removeAttr('disabled');
					if(data.succ) {
						mui.toast('上传成功');
						console.log(status);
						/*预览上传图片*/
						uploadPic();
						/*检测是否超出十张*/
//						UploadTopCheck();
						/*清空input*/
						(function() {
							var files = document.getElementById("inputs");
							$(".imgBox").empty();
							files.value = "";
						})();
									//....       //异步上传成功之后的操作
					}else{
						mui.toast(data.msg);
					};
					mask.close();//关闭遮罩
					plus.nativeUI.closeWaiting(wating);
				},
				error: function(a, b, c) {
					console.log('error' + a + c)
					mui.toast(a + c)
				}
			};
			form.ajaxSubmit(options);
			
		});
		/*拿到已经上传的图片*/
		function uploadPic() {
			mui.ajax(baseUrl + 'API_House/GetHousePic?HouseId='+obj.HouseId+'&FirstType='+obj.FirstType+'&SecondType='+obj.SecondType, {
				type: 'post',
				success: function(data, type, status) {
					var html='';
					if(data.succ && data.results.length != 0) {
						document.querySelector('.imgCount').style.display = 'block';
						for(var i=0;i<data.results.length;i++){
							html += '<div class="mui-pull-left"><img src="' + data.results[i].PicUrl + '" onerror="this.src=\'../../img/hosing/home.jpg\' "></div>';
						};
						document.querySelector('.uploadedBox').innerHTML = html;
						//<div><img src='" + reader.result + "'></div>
					} else {
					
						document.querySelector('.imgCount').style.display = 'none';
						console.log('没有已经上传的图片');
					}
				},
				error: function(xht, type, cont) {
					console.log('获取已经上传图片' + type + '--' + cont);
					mui.toast(type + '--' + cont);
				}
			})
		};
		/*检测文件变化预览图片*/
		$(document).ready(function() {
			$("#inputs").change(function() {
				console.log('检测到了变化');
				var fil = this.files;
				if(fil.length>5){
					/*清空input*/
					(function() {
						var files = document.getElementById("inputs");
						$(".imgBox").empty();
						files.value = "";
					})();
					mui.toast('每次最多十张图片哦亲');
				}else{
					for(var i = 0; i < fil.length; i++) {
						reads(fil[i]);
					};
				};
			});
		});

		function reads(fil) {
			var reader = new FileReader();
			reader.readAsDataURL(fil);
			reader.onload = function() {
				document.querySelector(".imgBox").innerHTML += "<div><img src='" + reader.result + "'></div>";
			};
		};
		/*暂时放弃*/
		/*检测是否超过十张*/
//		function UploadTopCheck(){
//			mui.ajax(baseUrl + 'API_House/UploadTopCheck?HouseId='+UploadHousePic.HouseID+'&ImgType=1&UserId='+parseInt(localStorage.getItem('userId')), {
//				type: 'post',
//				success: function(data) {
//					console.log(JSON.stringify(data));
//					if(data.succ&&data.results){
//						$("#inputs").show();
//						$("#savePic").removeAttr('disabled');
//					}else{
//						$("#savePic").attr('disabled', 'disabled');
//						$("#inputs").hide();
//						$('.add').click(function(){
//							mui.toast('只能上传十张')
//						});
//					}
//				},
//				error: function(xhr, type, errorThrown) {
//					mui.toast('检测是否有权限上传图片' + type + '-' + errorThrown)
//				}
//			});
//		};
		/*轮播初始*/
		mui.previewImage();
		mui(".upBtn").on('tap', ".add", function() {
			$('.imgBox').removeClass('isclick');
			$(this).parent().siblings('.imgBox').addClass('isclick');
			//			mui('#sheet1').popover('toggle');
		});
		mui('.imgBox').on('tap', 'img', function() {
			document.getElementById('header').style.zIndex = 21;
			document.getElementById('delete').style.display = 'block';
		});
		mui('body').on('tap', '#__MUI_PREVIEWIMAGE', function() {
			document.getElementById('header').style.zIndex = 10;
			document.getElementById('delete').style.display = 'none';
		});