// check off 
$("ul").on("click", "li", function(){
	$(this).toggleClass("done");
})

// delete
$("ul").on("click", "span", function(){
	$(this).parent().fadeOut(400, function(){
		$(this).remove();
	});
})

// append
$("input[type='text']").keypress(function(e){
	if (e.which === 13){
		var todoText = $(this).val();
		$("ul").append("<li><span><i class='fa fa-minus-square'></i></span> " + todoText + "</li>");
		$(this).val("");
	}
})

$("#hide").click(function(){
	$("input[type='text']").fadeToggle();
	$(this).toggleClass("rotate");
})