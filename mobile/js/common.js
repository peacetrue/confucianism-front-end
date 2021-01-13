$(function(){
	
	//点击显示菜单 
	$(".btn_nav").click(function(){
		if($(this).attr("class")=="btn_nav"){
			$(this).addClass("ck");
		}
		else{
			$(this).removeClass("ck");
		}
		$(".nav").slideToggle();
	})
	
	//报名成功 弹框
	$(".btn_tj,.baoming_btn").click(function(){
		layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			area: ['85%', 'auto'],
			shade : [0.7 , '#000' , false],
			skin: 'layui-layer-nobg', //没有背景色
			shadeClose: false,
			closeBtn:0,
			content: $(".tan_bm")
		});
		return false;
	})
	$(".quxiao,.btn_qd").click(function(){
		layer.closeAll(); 
	})
	
})