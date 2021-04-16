function pageMotion()
{
	if (!$(".kv").hasClass("show"))
	{
		$(".kv").addClass("show");
	}
	
	if ($(".intro").offset().top < windowHeight && !$(".intro").hasClass("show"))
	{
		$(".intro").addClass("show");
	}

	$(".profile-img li").each(function(){
		if ($(this).offset().top - windowHeight < scrollTop && !$(this).hasClass("show"))
		{
			$(".members .title").addClass("show");
			$(this).addClass("show");
		}
	});

	if ($(".awards").offset().top - windowHeight < windowHeight && !$(".awards").hasClass("show"))
	{
		$(".awards").addClass("show");
	}
}
