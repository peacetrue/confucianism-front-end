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
	//commonJS.tabSwich('.c-section-1');
	//commonJS.tabSwich('.c-section-2');
	//commonJS.tabSwich('.c-section-3');
	//$('.school-box').html('');
	
	
	
	$(".sy_type a").click(function(){
		$(".sy_type a").removeClass("active");
		$(this).addClass("active");
		var i=$(".sy_type a").index(this);
		$(".sy_two").hide();
		$(".sy_two").eq(i).show();
		return false;
	})
	
	$(".qie_name").each(function(a){
		$(".qie_name:eq("+a+") .tab-title-item").click(function(){
			var i=$(".qie_name:eq("+a+") .tab-title-item").index(this);
			$(".qie_name:eq("+a+") .tab-title-item").removeClass("active");
			$(this).addClass("active");
			$(".qie_name:eq("+a+") .more").hide();
			$(".qie_name:eq("+a+") .more").eq(i).show();
			alert(a);
			$(".tab-content:eq("+a+") .tab-content-item").hide();
			$(".tab-content:eq("+a+") .tab-content-item").eq(i).show();
		})
	})
})
