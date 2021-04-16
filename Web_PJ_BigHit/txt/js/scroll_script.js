$(function() {
	if (check_allDevice() == "")
	{
		fn_scroll_plugin();
	}
});

function fn_scroll_plugin() {
	$(".scroll_wrap").mCustomScrollbar({
		theme : "dark-2",
		setLeft: "0px",
		mouseWheelPixels : 300, 
		scrollInertia : 200 
	});
}