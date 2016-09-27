$(document).ready(function() {


	// 关闭顶部广告
	$("#close").bind('click', function(event) {
		$("this").css('display', 'none');
		$("#act").stop().animate({
			height: "0px"},
			350, function() {
			$("#act").css('display', 'none');
		});
	});
	// main hover样式
	$(".main_nav>a").hover(function() {
		$(this).children('div').css({
			backgroundPositionY: '-24px'
			// transition: '1s'
		});
		$(this).children('span').css({
			color: 'rgb(255,70,78)'
			// transition: '1s'
		});
	}, function() {
		$(this).children('div').css('backgroundPositionY', '0px');
		$(this).children('span').css('color', '#5e5e5e');
	});
	// 轮播效果
	var imgs=$(".imgs_wrap").children('a').length;
	var timer;
	var speed=3000;//切换的速度
	var i=-1;
	var btn="<span></span>";
	for (var num = 0; num < imgs-1; num++) {
		btn+="<span></span>";
	}
	console.log("btn="+btn);
	console.log("imgs="+imgs);
	console.log($(".imgs_wrap").width());
	$(".btns").html(btn);
	$(".btns").css({
		position: "absolute",
		left: ($(".imgs_wrap").width()-(18*(imgs-1)+24))/2+"px",
		bottom: "6px",
		width: (18*(imgs-1)+24)+"px",
		height: "19px",
		zIndex: "10"
	});
	$(".btns>span").css({
		display: "inline-block",
		width: "10px",
		height: "10px",
		borderRadius: "50%",
		backgroundColor: "#fff",
		verticalAlign: "middle",
		cursor: "pointer",
		margin: "auto 4px"
	});
	timer = setInterval( move, speed);
	move();
	function move(){
		i++;
		if(i>(imgs-1)){
			i=0;
		}
		$(".imgs_wrap").children('a').eq(i).css({'opacity':'1','z-index':'9'}).siblings('a').css({'opacity':'0','z-index':'0'});

		$(".btns").children().eq(i).css({
			backgroundColor: 'rgba(0,0,0,0)',
			border: '3px solid #fff'
		}).siblings('span').css({
			backgroundColor: '#fff',
			border: '0'
		});

		$(".imgs_wrap").hover(function() {
			$(".left_right").css('display', 'block');
		}, function() {
			$(".left_right").css('display', 'none');
		});
	}
	// 轮播图片居中
	var img_tab=$(".imgs_wrap>a>img")[0];
	img_tab.onload=function(){
		var imgWidth=$(".imgs_wrap>a>img").width();
		var img_left=($(".imgs_wrap").width()-imgWidth)/2;
		console.log("img_left="+img_left);
		$(".imgs_wrap>a>img").css('left', img_left);
	}

	// 前进与后退
	$(".left_right").children().eq(0).bind('click', function(event) {
		if(timer){
			clearInterval(timer);
		}
		i-=2;
		if(i<=-2){
			i=imgs-2;
		}
		console.log("i="+i);
		move();
		timer = setInterval( move, speed);
	});
	$(".left_right").children().eq(1).bind('click', function(event) {
		if(timer){
			clearInterval(timer);
		}
		move();
		timer = setInterval( move, speed);
	});
	// 按钮
	$(".btns").children().bind('click', function(event) {
		if(timer){
			clearInterval(timer);
		}
		i=$(this).index()-1;
		if(i<0){
			i=imgs-1;
		}
		console.log("i="+i);
		move();
		timer = setInterval( move, speed);
	});

	// 今日品牌
	$(".brand_top>a").hover(function() {
		$(this).children().children('.brand_now').css({
			color: '#fff',
			backgroundColor: '#ff464e'
		});
	}, function() {
		$(this).children().children('.brand_now').css({
			color: '#ff464e',
			backgroundColor: '#f6f6f6'
		});
	});

	// 每日新品
	$(".icon_child").hover(function() {
		$(this).children('div').children('span').eq(5).css({
			color: '#fff',
			backgroundColor: '#ff464e'
		});
	}, function() {
		$(this).children('div').children('span').eq(5).css({
			color: '#ff464e',
			backgroundColor: '#fff'
		});
	});


	for (var z = 0; z < 1000; z++) {
		var a=$(".icon_child").eq(z).children('div').children('span').eq(1).text();
		var b=$(".icon_child").eq(z).children('div').children('span').eq(3).text();
		var c=Math.round(a/b*100)/10;
		$(".icon_child").eq(z).children('div').children('span').eq(4).text("("+c.toFixed(1)+"折)");
	};


	function checkLogin(){
		$.ajax({
			url : "main!login.action",
			dataType : "json",
			cache : false,
			success : function(json) {
				if (json.status == "0") {
				//0表示已登录
			    //这里你可以插入登陆后的业务逻辑代码
				}else{
			         alert("请登陆");
				//这里你可以插入跳转至登陆页面的代码
				}
			}
		});
	}

	$("#goods").bind('click', function(event) {
		$.ajax({
			url : "#",
			dataType : "json",
			cache : false,
			success : function(json) {
				if (json.status == "0") {
				//0表示已登录
			    //这里你可以插入登陆后的业务逻辑代码
				}else{
			         alert("请登陆");
				//这里你可以插入跳转至登陆页面的代码
				}
			}
		});
	});

	// 网页右边按钮
	window.onload=function(){
		fnBack();
	}
	document.body.onmousemove=function(){
		fnBack();
	}
	function fnBack(){
		if(document.body.scrollTop>=300){
			$("#backTop").css('display', 'block');
			$("#backTop").hover(function() {
				$(this).css('backgroundColor', '#ff464e');
				$(this).children().css('backgroundPositionX', '-26px');
			}, function() {
				$(this).css('backgroundColor', '#444');
				$(this).children().css('backgroundPositionX', '0px');
			});
			$("#backTop").bind('click',function(event) {
				document.body.scrollTop=0;
				$("#backTop").css('display', 'none');
			});
		}
		else{
			$("#backTop").css('display', 'none');
		}
	}
	
});