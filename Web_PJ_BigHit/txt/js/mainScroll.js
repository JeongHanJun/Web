$(function() {
	fn_scroll_plugin();

});

function fn_scroll_plugin() {
	$(".popup-scroll").mCustomScrollbar({
		theme : "dark-2",
		setLeft: "0px",
		mouseWheelPixels : 300, 
		scrollInertia : 200 
	});

}