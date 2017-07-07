$(function(){
	$('.seats dd').click(function(){
		var isActive = $(this).hasClass('active'),
			isChoosed = $(this).hasClass('choosed');
		$(".seats dd").removeClass('active');
		alert($(this).data('level-number'));
		$("#levelnumber").val($(this).data('level-number'));
		
		if(isChoosed) return;
		$(this).attr('class',isActive ? '' : 'active');
	})
});


