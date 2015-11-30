$(function(){
	$(".footerLink li").hover(function(){
		$(this).find("span.line").css("backgroundColor","#0d70bb");
	},function(){
		$(this).find("span.line").css("backgroundColor","#c0c0c0");
	});
	$("nav li").each(function(){
		var _thisTop = $(this).find("dl").outerHeight();
		$(this).find("dl").css("top",-_thisTop);
		$(this).hover(function(){
			$(this).find("dl").stop(true,false).animate({"top":"104px"},"1000");
		},function(){
			$(this).find("dl").stop(true,false).animate({"top":-_thisTop},"1000");
		});
	});
});
function _searchFocus(){
	$(".footerTxt .search input.text").css("border","1px solid #1765A0");
	$(".footerTxt .search input.submit").css("backgroundColor","#1765A0");
}
function _searchBlur(){
	$(".footerTxt .search input.text").css("border","1px solid #c0c0c0");
	$(".footerTxt .search input.submit").css("backgroundColor","#c0c0c0");
}
function _iframeLink(){
	$(this).click
}