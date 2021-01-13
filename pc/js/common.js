/**
 * 公共插件库
 */
var commonJS = {
	/**
	 * tab切换
	 */
	tabSwich:function(tabBox){
		$(tabBox).find('.tab-title').find('.tab-title-item').off('click').on('click',function(){
			$(this).siblings('.tab-title-item').removeClass('active');
			$(this).addClass('active');
			var index = $(tabBox+" .tab-title-item").index($(this));
			$(tabBox).find('.tab-content').find('.tab-content-item').hide();
			$(tabBox).find('.tab-content').find('.tab-content-item').eq(index).show();
		});
	},
	
	/**
	 * 显示影藏
	 * @param {Object} bnt 触发按钮
	 * @param {Object} content 显示内容
	 */
	showHide:function(bnt,content){
		$(bnt).off('click').on('click',function(){
			if(content.css('display') == 'none'){
				$(content).show();
			}else{
				$(content).hide();
			}
		})
	}
	
}

$(function(){
	commonJS.tabSwich('.c-section-1');
	commonJS.tabSwich('.c-section-2');
	commonJS.tabSwich('.c-section-3');
	//$('.school-box').html('');
	
	
	
	$(".sy_type a").click(function(){
		$(".sy_type a").removeClass("active");
		$(this).addClass("active");
		var i=$(".sy_type a").index(this);
		$(".sy_two").hide();
		$(".sy_two").eq(i).show();
		return false;
	})
	
	$(".title-box").each(function(a){
		$(".title-box:eq("+a+") .tab-title-item").click(function(){
			var i=$(".title-box:eq("+a+") .tab-title-item").index(this);
			$(".tab-title:eq("+a+") .tab-title-item").removeClass("active");
			$(this).addClass("active");
			$(".title-box:eq("+a+") .more").hide();
			$(".title-box:eq("+a+") .more").eq(i).show();
		})
	})
})
