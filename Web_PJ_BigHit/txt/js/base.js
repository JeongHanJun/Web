$(window).load(onLoad)
		.resize(onResize)
		.scroll(onScroll);
var pageURL = document.URL.split("/");
var pageType = pageURL[pageURL.length - 3].toLowerCase();
var windowWidth;
var windowHeight;
var documentHeight;
var motionDelay = 500;
var motionIng = false;
var loadHeight = $(window).outerHeight();
var txtHeight;
var fixedTop = 0;
var pageLanguage;
var pageLoad = false;
function onLoad()
{
	$("body").addClass(checkBrowser());

	if (check_allDevice() != "")
	{
		$("body").addClass("device");
	}

	if (checkMac() != "")
	{
		$("body").addClass("mac-os");
	}

	windowWidth = $(window).outerWidth();
	windowHeight = $(window).outerHeight();
	documentHeight = $(document).outerHeight();

	pageURL = document.URL.split("/");
	pageType = pageURL[pageURL.length - 3].toLowerCase();
	
	onResize();
	setTimeout(function(){
		onResize();
	},500);
	
	if (pageType == "txt" || pageType == "bts" || pageType == "leehyun" || pageURL.length <= 5)
	{
		if (check_allDevice() != "")
		{
			$("footer").css({"position":"relative"});
			

			if (viewportWidth() > 768)
			{
				$(".device .kv .kv-inner li").each(function(){
					$(this).find(".popup-scroll").css({"height":""});
				});
				
			}else{
				$(".device .kv .kv-inner li").each(function(){
					var reHeight = 0;
					if ($("footer").css("position") == "fixed")
					{
						reHeight = $("main").outerHeight() - $("header").outerHeight()-$(this).find(".kv-popup h2").outerHeight(true) - $("footer").outerHeight();
					}else{
						reHeight = $("main").outerHeight() - $("header").outerHeight()-$(this).find(".kv-popup h2").outerHeight(true);
					}
					$(this).find(".popup-scroll").css({"height":(reHeight+1) + "px"});
					setTimeout(function(){
						popupClose_position();
					},500);
				});
				
			}
		}

		mainKV_Swipe();
	}

	if (check_allDevice() != "")
	{
		if (windowWidth > windowHeight)
		{
			viewMode = "W";
		}else{
			viewMode = "H";
		}
	}else{
		if (windowWidth > 768)
		{
			viewMode = "pc";
		}else {
			viewMode = "mo";
		}
	}

	var mainHeight = $("main").outerHeight() + $("footer").outerHeight();
	if (mainHeight < windowHeight)
	{
		var reHeight = windowHeight - $("footer").outerHeight();
		$("main").css({"height":reHeight + "px"});
	}
	if ($(".wrapper").hasClass("the_dream_chapter-magic"))
	{
		if (viewportWidth() < 768)
		{
			var reWidth = parseInt(viewportWidth() / 2);
			$(".the_dream_chapter-magic .slide_video .contents-obj video").css({"width":reWidth + "px"});
			$(".the_dream_chapter-magic .slide_video .contents-obj video").parent().find("button").css({"width":reWidth + "px"});
		}else{
			$(".the_dream_chapter-magic .slide_video .contents-obj video").css({"width":""});
			$(".the_dream_chapter-magic .slide_video .contents-obj video").parent().find("button").css({"width":""});
		}
		magicReset();
	}

	pageLoad = true;
	
	
	var pageDomain = document.domain.split("/");
	if (check_ios() != "" && checkBrowser() == "safari")
	{
		if (document.domain == "ibighit.com" || document.domain == "www.ibighit.com" || document.domain == "qa.ibighit.com")
		{
			if (pageURL.length - pageDomain.length <= 5)
			{
				iphoneSafari();
			}
		}else{
			if (pageURL.length - pageDomain.length <= 6)
			{
				iphoneSafari();
			}
		}
	}
	
}

function iphoneSafari()
{
	console.log("iphoneSafari");
	$("html, body").css({"position":"fixed", "height":"100%", "overflow":"hidden", "-webkit-overflow-scrolling":"touch"});
}

var resizeTimeout01;
var resizeTimeout02;
var resizeTimeout03;
var deviceRotate = false;
var viewMode = "R";
var modeChange = false;
function onResize()
{
	modeChange = false;
	windowWidth = $(window).outerWidth();
	windowHeight = $(window).outerHeight();
	documentHeight = $(document).outerHeight();
	console.log(windowWidth);

	if (check_allDevice() != "")
	{
		deviceRotate = false;
		if (windowWidth > windowHeight && viewMode == "H")
		{
			viewMode = "W";
			deviceRotate = true;
		}
		
		if (windowWidth < windowHeight && viewMode == "W")
		{
			viewMode = "H";
			deviceRotate = true;
		}
	}else{
		if (windowWidth > 768 && viewMode == "mo")
		{
			viewMode = "pc";
			modeChange = true; 
		}else if (windowWidth < 769 && viewMode == "pc"){
			viewMode = "mo";
			modeChange = true;
		}
	}


	if (pageURL.indexOf("profile") != -1)
	{
		var titleWidth = $(".members .title").outerWidth();
		$(".members .title").css({"height":(titleWidth - 1) + "px"});
		if ($(".members .popup").css("display") == "block")
		{
			//var imgHeight = $(".members .profile-img li button .contents-obj img").outerHeight() * 2;
			var imgHeight = windowWidth/2 > 720 ? 720 : windowWidth/2;		
			var thumbHeight = $(".members .profile-img button .contents-obj img").outerHeight();	

			if (viewportWidth() < 769)
			{
				imgHeight = windowWidth;
			}

			if (Math.ceil(imgHeight) > imgHeight)
			{
				imgHeight = Math.floor(imgHeight);
				if (checkBrowser() != "safari" || imgHeight % 2 == 1)
				{
					++imgHeight;
				}
			}else{
				imgHeight = Math.ceil(imgHeight);
				++imgHeight;
			}
						

			$(".popup ul li .contents-obj img").css({"height":imgHeight + "px"});
			

			if (viewportWidth() < 769)
			{
				$("main").css({"padding-bottom":thumbHeight + "px"});
				$(".members .popup-inner > ul > li .contents").css({"height":thumbHeight + "px"});
			}else{
				$(".members .popup-inner > ul > li .contents").css({"height":""});
				$("main").css({"padding-bottom":""});
			}

			var activeIdx = $(".members .popup-inner > ul > li.active").index();
			if (viewportWidth() < 769)
			{
				var reTop = 0;
				if (pageURL.indexOf("TXT") != -1 || pageURL.indexOf("txt") != -1 || pageURL.indexOf("txt.ibighit.com") != -1 || pageURL.indexOf("qa_txt.ibighit.com") != -1)
				{
					switch (profilePopup)
					{
						case 0:
						{
							reTop = 0;
							break;
						}case 1:
						{
							reTop = windowWidth / 2;
							break;
						}default:
						{
							reTop = windowWidth;
						}			
					}
				}else if (pageURL.indexOf("BTS") != -1 || pageURL.indexOf("bts") != -1 || pageURL.indexOf("bts.ibighit.com") != -1 || pageURL.indexOf("qa_bts.ibighit.com") != -1){
					if (pageURL[pageURL.length-1].split(".")[0] == "awards")
					{
						switch (profilePopup)
						{
							case 0:
							{
								reTop = 0;
								break;
							}default:
							{
								reTop = windowWidth / 2;
							}			
						}
					}else{
						switch (profilePopup)
						{
							case 0:
							{
								reTop = 0;
								break;
							}case 1:
							{
								reTop = windowWidth / 2;
								break;
							}case 4:
							{
								reTop = windowWidth + windowWidth / 2;
								break;
							}case 5:
							{
								reTop = windowWidth + windowWidth / 2;
								break;
							}case 6:
							{
								reTop = windowWidth + windowWidth / 2;
								break;
							}default:
							{
								reTop = windowWidth;
							}			
						}
					}				
				}
				if (windowWidth % 2 == 1 && profilePopup != 0)
				{
					if($("body").hasClass("safari")){
						$(".members .popup-inner > ul > li.active").css({"top": (Math.floor(reTop) + 1) + "px"});
					}else{
						$(".members .popup-inner > ul > li.active").css({"top": (Math.floor(reTop) - 1) + "px"});
					}
				}else{
					$(".members .popup-inner > ul > li.active").css({"top": reTop + "px"});
				}
			}else{
				$(".members .popup-inner > ul > li.active").css({"top":""});
			}
		}

		if (pageURL.indexOf("BTS") != -1){
			if (pageURL[pageURL.length-1].split(".")[0] == "awards")
			{
				var reHeight = Math.floor(viewportWidth()*0.0486) * 20 * Awards_moreIdx;
				$(".awards .scroll_wrap .scroll_inner").css({"height":reHeight + "px"});
			}
		}

		if ($(".members .popup").css("display") == "block" && check_allDevice() != "" && deviceRotate)
		{
			setTimeout(function(){
				var goTop = $(".members .popup ul li.active").offset().top - $("header").outerHeight();
				$("html, body").stop().animate({"scrollTop":goTop + "px"}, 100, 'swing');
			},300);
		}
		
	}else if (pageType == "txt" || pageType == "bts" || pageType == "leehyun" || pageURL.length <= 5 || document.URL.replace("http://","").replace("https://","").replace("/index.php","") == "www.ibighit.com" || document.URL.replace("http://","").replace("https://","").replace("/index.php","") == "ibighit.com")
	{
		$(".kv .kv-inner li").each(function(){
			if ($(this).find(".kv-popup").css("opacity") == 1)
			{
				if (viewportWidth() > 768)
				{
					if ($(this).find(".kv-popup").css("display") == "block")
					{
						$(this).find(".kv-popup").css({"display":"table"});
					}
					$(this).find(".kv-popup .btn-close").css({"top":"0px"});
				}else{
					if ($(this).find(".kv-popup").css("display") == "table")
					{
						$(this).find(".kv-popup").css({"display":"block"});
					}
				}

				popupClose_position();
				if (deviceRotate)
				{
					$(this).find(".kv-popup .popup-inner").css({"display":""});
					setTimeout(function()
					{
									
						if (viewportWidth() < 769)
						{
							$(this).find(".kv-popup .popup-inner").css({"display":"table"});
						}
						popupClose_position();
					},100);
				}				
			}
		});

		
		
		if (windowWidth < 769)
		{
			var kvHeight = $(".wrapper-top").outerHeight();
			var footerHeight = $("footer").outerHeight();
			var reHeight = (windowHeight - footerHeight);
			if (!$("body").hasClass("device"))
			{
				if (windowHeight >= viewportWidth() * 2)
				{
					$(".contents-obj img").css({"height":(windowHeight - footerHeight+1) + "px", "width":"auto"});
					$("footer").css({"position":"fixed"});
				}else if ((reHeight / 1218 * 720) > viewportWidth())
				{
					$(".contents-obj img").css({"height":(windowHeight - footerHeight+1) + "px", "width":"auto"});
					$("footer").css({"position":"fixed"});
				}else{
					$(".contents-obj img").css({"height":"auto", "width":"100%"});
					$("footer").css({"position":"relative"});
					
				}
			}
		}

		if (check_allDevice() != "")
		{
			if (viewportWidth() > 768)
			{
				$(".device .kv .kv-inner li").each(function(){
					$(this).find(".popup-scroll").css({"height":""});
				});				
			}else{
				$(".device .kv .kv-inner li").each(function(){
					var reHeight = 0;
					if ($("footer").css("position") == "fixed")
					{
						reHeight = $("main").outerHeight() - $("header").outerHeight()-$(this).find(".kv-popup h2").outerHeight(true) - $("footer").outerHeight();
					}else{
						reHeight = $("main").outerHeight() - $("header").outerHeight()-$(this).find(".kv-popup h2").outerHeight(true);
					}
					$(this).find(".kv-popup h2").css({"display":"none"});
					$(this).find(".popup-scroll").css({"height":reHeight + "px"});
					
					setTimeout(function(){
						popupClose_position();
						$(".device .kv .kv-inner .kv-popup h2").css({"display":"block"});
					},100);
				});
				
			}

			
			if (windowWidth < windowHeight && (windowWidth < 769))
			{
				clearTimeout(resizeTimeout01);
				clearTimeout(resizeTimeout02);
				clearTimeout(resizeTimeout03);
				$(".device footer").css({"opacity":0});
				resizeTimeout01 = setTimeout(function(){
					$(".device footer").css({"transition":"none", "transform":"translateY(0%)"});
				},100);
				resizeTimeout02 = setTimeout(function(){
					$(".device footer").css({"transition":"none", "transform":"translateY(100%)", "opacity":1});
				},200);
				resizeTimeout03 = setTimeout(function(){
					$(".device footer").css({"transition":"", "transform":"translateY(100%)"});
				},250);
			}else{
				clearTimeout(resizeTimeout01);
				clearTimeout(resizeTimeout02);
				clearTimeout(resizeTimeout03);
				$(".device footer").css({"position":"","transition":"","transform":"", "opacity":1});
			}	
		}
	}else if (pageURL.indexOf("schedule") != -1)
	{
		var reWidth = windowWidth > 1440 ? 1440 : windowWidth;
		$(".calendar table tbody tr").css({"width":reWidth + "px"});

		if (viewportWidth() > 768)
		{
			if (parseInt($(".calendar .active .popup").css("bottom")) != 0)
			{
				$(".calendar .active .popup").css({"bottom":"0%"});
			}

			if ($(".calendar .popup-dimmed").css("display") == "block")
			{
				$(".calendar .popup-dimmed").css({"display":"none"});
			}
		}else{
			if (parseInt($(".calendar .active .popup").css("bottom")) == 0)
			{
				$(".calendar .active .popup").css({"display":"block", "bottom":"-100%"});
			}

			$(".calendar table tbody tr").each(function(){
				if ($(this).hasClass("active"))
				{
					if ($(".calendar .popup-dimmed").css("display") == "none")
					{
						$(".calendar .popup-dimmed").css({"display":"block", "opacity":1});
					}
				}
			});
			
		}
	}else if (pageURL.indexOf("discography") != -1 && pageURL.indexOf("detail") != -1 )
	{
		if (modeChange)
		{
			changeMusicVideo(100);
			if (!$(".wrapper").hasClass("the_dream_chapter-magic"))
			{
				videoReset();
			}else{
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap video").each(function(){
					if (!this.paused)
					{
						$(this).parent().find("button").removeClass("btn-pause");
						this.pause();
						this.currentTime = 0;
					}			
				});

				magicReset();
			}
		}
		if ($(".wrapper").hasClass("dynamite") && viewportWidth() < 769)
		{
			$(".album-detail .album-photo .slide-wrap > ul > li .slide-obj").css({"display":""});
		}
	}
	
	if ($(".gnb").hasClass("active"))
	{
		if (viewportWidth() < 769)
		{
			$("header").css({"position":"fixed"});
			var dHeight = $("body").outerHeight();
			$("nav").css({"height":dHeight+"px"});
		}else{
			$("header").css({"position":""});
			$("nav").css({"height":""});
		}
	}


	if ($(".wrapper").hasClass("the_dream_chapter-magic"))
	{
		if (viewportWidth() < 768)
		{
			var reWidth = parseInt(viewportWidth() / 2);
			$(".the_dream_chapter-magic .slide_video .contents-obj video").css({"width":reWidth + "px"});
			$(".the_dream_chapter-magic .slide_video .contents-obj video").parent().find("button").css({"width":reWidth + "px"});
		}else{
			$(".the_dream_chapter-magic .slide_video .contents-obj video").css({"width":""});
			$(".the_dream_chapter-magic .slide_video .contents-obj video").parent().find("button").css({"width":""});
		}
	}
	
	mainMinimum();
	setTimeout(function(){
		mainMinimum();
	},100);
	setTimeout(function(){
		mainMinimum();
	},300);
}

function videoReset()
{
	if (viewMode == "pc")
	{
		var defaultAble = false;
		$(".album-detail .album-video .slide-wrap > ul > li").each(function(){
			if ($(this).hasClass("default"))
			{
				defaultAble = true;
			}
		});

		if (defaultAble)
		{
			$(".album-detail .album-video .slide-wrap > ul > li").removeClass("active").css({"display":"none", "opacity":0});
			$(".album-detail .album-video .slide-wrap > ul > li.default").addClass("active").css({"display":"block", "opacity":1});

			$(".album-detail .album-video .bottom ul li").removeClass("active");
			$(".album-detail .album-video .bottom ul li.default").addClass("active");
		}else{
			var videoLength = $(".album-detail .album-video .slide-wrap > ul > li").length;
			$(".album-detail .album-video .slide-wrap > ul > li").removeClass("active").css({"display":"none", "opacity":0});
			$(".album-detail .album-video .slide-wrap > ul > li").eq(videoLength-1).addClass("active").css({"display":"block", "opacity":1});

			$(".album-detail .album-video .bottom ul li").removeClass("active");
			$(".album-detail .album-video .bottom ul li").eq(videoLength-1).addClass("active");
		}
		videoIndex = videoLength - 1;
	}
}

function magicReset()
{
	if (viewMode == "pc")
	{
		$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video > ul li").css({"margin-left":"0%"});

		$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li").removeClass("active").css({"display":"none", "opacity":0});
		$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.default").addClass("active").css({"display":"block", "opacity":1});

		$(".the_dream_chapter-magic .album-detail .bottom.rows ul li.narrow").removeClass("active");
		$(".the_dream_chapter-magic .album-detail .bottom.rows ul li.narrow.default").addClass("active");
		$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video > ul li").removeClass("active");
		$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video > ul li.default").addClass("active");
		
		if ($(".album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil").hasClass("default"))
		{
			$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island").removeClass("active").css({"display":"none", "opacity":0});
		}
	}else{
		magicVideo = [5,5];
		$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video > ul li").css({"margin-left":"100%"});
		$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video > ul.slide-obj li").css({"margin-left":""});
		$(".the_dream_chapter-magic .album-detail .album-video.slide .slide_video .contents-sub-slide li").css({"margin-left":"", "opacity":0});		

		if ($(".album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island").hasClass("default"))
		{
			magicVideo[0] = $(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island > ul li.default").index();
			$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island > ul li.default").css({"margin-left":"0%"});
			$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide li.default").css({"margin-left":"0%"});		
			$(".the_dream_chapter-magic .album-detail .album-video.slide .slide_video.magic_island .contents-sub-slide li.default").css({"opacity":1});
		}else{
			$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island > ul li").eq(0).css({"margin-left":"0%"});
			$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide li").eq(0).css({"margin-left":"0%"});			
			
			$(".the_dream_chapter-magic .album-detail .album-video.slide .slide_video.magic_island .contents-sub-slide li").eq(0).css({"opacity":1});
		}

		if ($(".album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil").hasClass("default"))
		{
			magicVideo[1] = $(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil > ul li.default").index();
			$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil > ul li.default").css({"margin-left":"0%"});
			$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul.contents-sub-slide li.default").css({"margin-left":"0%"});
			$(".the_dream_chapter-magic .album-detail .album-video.slide .slide_video.angel_or_devil .contents-sub-slide li.default").css({"opacity":1});
		}else{
			$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island > ul li").eq(0).css({"margin-left":"0%"});
			$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide li").eq(0).css({"margin-left":"0%"});			
			
			$(".the_dream_chapter-magic .album-detail .album-video.slide .slide_video.angel_or_devil .contents-sub-slide li").eq(0).css({"opacity":1});
		}
	}
}


function mainMinimum(){
	$("main").css({"height":""});
	var mainHeight = $("main").outerHeight() + $("footer").outerHeight();
	if (mainHeight < windowHeight)
	{
		var reHeight = windowHeight - $("footer").outerHeight();
		$("main").css({"height":reHeight + "px"});
	}
}


var scrollTop = 0;
function onScroll()
{
	scrollTop = $(window).scrollTop();
	if (pageURL.indexOf("tour") != -1)
	{
		var fixedTop = $(".tour-list").eq(0).offset().top;
		var footerTop = $("footer").offset().top - windowHeight;
		if (scrollTop >= fixedTop && scrollTop < footerTop)
		{
			if (!$(".has_tab .tab_menu").hasClass("fixed"))
			{
				$(".has_tab .tab_menu").addClass("fixed");
			}
		}else{
			if ($(".has_tab .tab_menu").hasClass("fixed"))
			{
				$(".has_tab .tab_menu").removeClass("fixed");
			}
		}

	}
	
}

var Awards_moreIdx = 1;
var profilePopup = 0;
var scrollAble = false;
var linkReturn = false;

var oldPhoto = 0;
var albumPhoto = 0;
var albumPhoto_idx = [0,0,0,0,0,0,0,0];

var magicVideo = [5,5];
$(function(){
	$("body").click(function(){
		if (!scrollAble)
		{
			allClear();
		}
		
		scrollAble = false;
		if (!linkReturn)
		{
			return false;
		}		
	});
	$(document).on("mouseover",".main-popup .popup-inner a.p_link",function(){
		linkReturn = true;
	});
	$(document).on("mouseout",".main-popup .popup-inner a.p_link",function(){
		linkReturn = false;
	});
	
	$(".kv .kv-inner .popup-inner").click(function(){
		return false; 
	});

	$("nav .nav-inner ul").click(function(){
		return false;
	});

	$(".btn-gnb").click(function(){
		if (!motionIng)
		{
			motionIng = true;
			if (pageURL.length <= 5)
			{
				$(".device footer").css({"transition":"transform 0.5s","transform":"translateY(100%)"});
			}
			
			if ($(".gnb").hasClass("active"))
			{
				if ($(".lang_opt").hasClass("active"))
				{
					$(".lang_opt ul").animate({"opacity":"0"},motionDelay,function(){
						$(".lang_opt").removeClass("active");
					});
				}

				$("body").css({"position":"","margin-top":"0px"});

				$("html, body").animate({"scrollTop":fixedTop + "px"},0);

				
				$("header").css({"position":""});

				$(".gnb").removeClass("active");
				$("nav").animate({"opacity":"0"},300,function()
				{					
					$(this).css({"display":"none"});				
				});
			}else{
				allClear();
				fixedTop =  $(window).scrollTop();
				$("body").css({"position":"fixed", "margin-top":-fixedTop + "px"});
				if (viewportWidth() < 769)
				{
					$("header").css({"position":"fixed"});

					var dHeight = $("body").outerHeight();
					$("nav").css({"height":dHeight+"px"});
				}
				
				$(".gnb").addClass("active");
				$("nav").css({"display":"table","opacity":0}).stop().animate({"opacity":"1"},300);
				
				$("nav").removeClass("active");
				$("nav .nav-inner > ul > li").removeClass("active");				
				$("nav .nav-inner > ul > li .sub_nav").css({"display":"none","opacity":0});
				if (pageURL.indexOf("txt") > -1 || pageURL.indexOf("TXT") > -1)
				{
					$("nav").addClass("active");
					$("nav .nav-inner > ul > li").eq(2).addClass("active");
					$("nav .nav-inner > ul > li").eq(2).find(".sub_nav").css({"display":"block","opacity":1});
				}else if (pageURL.indexOf("bts") > -1 || pageURL.indexOf("BTS") > -1)
				{
					$("nav").addClass("active");
					$("nav .nav-inner > ul > li").eq(1).addClass("active");
					$("nav .nav-inner > ul > li").eq(1).find(".sub_nav").css({"display":"block","opacity":1});
				}else if (pageURL.indexOf("leehyun") > -1)
				{
					$("nav").addClass("active");
					$("nav .nav-inner > ul > li").eq(3).addClass("active");
					$("nav .nav-inner > ul > li").eq(3).find(".sub_nav").css({"display":"block","opacity":1});
				}
			}
			onResize();

			languageAlt();


			setTimeout(function(){
				motionIng = false;
			},300);
		}		
		return false;
	});
	$("nav .nav-inner li a").click(function(e){
		//gtag('event','Button Click', {'event_category' : 'Menu Click', 'event_label' : "Go to " + $(this).text()});
		if ($(this).attr("target") != "_blank")
		{
			document.location.href=$(this).attr("href");
		}else{
			/*e.preventDefault();
			$("nav").addClass("active");			
			window.open($(this).attr("href"),"outlink");*/
		}

		return false;
	});
	
	$(".lang_opt li button").click(function(){
		//gtag('event','Button Click', {'event_category' : 'Language Change', 'event_label' : $(this).attr("title")});

		var reLang = $(this).text();
		pageLanguage = reLang;
		var fullURL= document.URL;
		var oldLng = "";
		for (var i = 0;i < pageURL.length ; i++)
		{
			if (pageURL[i] == "eng")
			{
				oldLng = "eng";
			}else if (pageURL[i] == "kor")
			{
				oldLng = "kor";
			}else if (pageURL[i] == "jpn")
			{
				oldLng = "jpn";
			}else if (pageURL[i] == "chn")
			{
				oldLng = "chn";
			}
		}
		if (oldLng != "")
		{
			document.location.href=fullURL.replace(oldLng,pageLanguage.toLowerCase());
		}

		var oldT = $(this).text();
		var topT = $(".lang_opt li").eq(0).find("button").text();
		$(this).text(topT);
		$(".lang_opt li").eq(0).find("button").text(oldT);

		$(".lang_opt .btn-lang p").text(pageLanguage);

		altTextChange();
		$(".device footer").css({"transition":"transform 0.5s","transform":"translateY(100%)"});
	});
	
	/*$(".btn-gnb").click(function(){
		if ($(".gnb").hasClass("active") && menuOpen_able)
		{
			$("nav").removeClass("active");
			$("nav .nav-inner > ul > li").css({"transition":"none","opacity":1, "height":""});
			$("nav .nav-inner > ul > li").find("button").css({"transition":"none","height":"", "min-height":"", "border-bottom":"", "font-size":"", "display":"block"});
			$("nav .nav-inner > ul > li").find(".button_wrap").css({"transition":"none","height":"", "min-height":""});
			$("nav .nav-inner > ul > li").removeClass("active");
			$("nav .nav-inner .sub_nav").css({"opacity":"0","display":"none"});
		}
		return false;
	});*/

	var clickIdx;
	var menuOpen_able = false;
	var ableTime;
	$("nav .nav-inner .button_wrap button").click(function(){
		if (!motionIng)
		{
			motionIng = true;

			if ($(this).parent().parent().index() == 0)
			{
				document.location.href=$(this).parent().find("a").attr("href");
			}else{
				if ($(this).parent().parent().hasClass("active"))
				{
					menuOpen_able = false;

					$(this).parent().parent().removeClass("active");
					$(this).parent().parent().find(".sub_nav").animate({"opacity":"0"},300,function(){
						$(this).css({"display":"none"});
						if ($("nav").hasClass("active"))
						{
							$("nav").removeClass("active");			
						}	
					});
				}else{
					menuOpen_able = true;
					if (!$("nav").hasClass("active"))
					{
						$("nav").addClass("active");			
					}	

					$("nav .nav-inner > ul > li").each(function(){
						if ($(this).hasClass("active"))
						{
							$(this).removeClass("active");
							$(this).find(".sub_nav").stop().animate({"opacity":"0"},300,function(){
								$(this).css({"display":"none"});
							});
						}
					});
					$(this).parent().parent().addClass("active");
					$(this).parent().parent().find(".sub_nav").css({"display":"block", "opacity":0}).stop().delay(200).animate({"opacity":"1"},300);
				}
			}
			setTimeout(function(){
				motionIng = false;
			},300);
		}
		return false;
	});
	
	/*$("nav .nav-inner .sub_nav ul li a").click(function(){
		$("nav").removeClass("active");
		$("nav .nav-inner > ul > li").removeClass("active");
	});
	$(".btn-gnb").click(function(){
		if ($(".gnb").hasClass("active"))
		{
			$("nav").removeClass("active");
			$("nav .nav-inner > ul > li").css({"transition":"none","opacity":1, "height":""});
			$("nav .nav-inner > ul > li").find("button").css({"transition":"none","height":"", "min-height":"", "border-bottom":"", "font-size":"", "display":"block"});
			$("nav .nav-inner > ul > li").find(".button_wrap").css({"transition":"none","height":"", "min-height":""});
			$("nav .nav-inner > ul > li").removeClass("active");

			$("nav .nav-inner li").each(function(){
				$(this).removeClass("active");
				$(this).css({"opacity":1});
				var h  = $(this).find(".sub_nav ul").outerHeight();
				$(this).find(".sub_nav ul").css({"margin-top":-h + "px", "display":"none"});
			});

			if (pageURL.indexOf("bts") != -1 || pageURL.indexOf("BTS") != -1){
				$("nav").addClass("active");
				$("nav .nav-inner > ul > li").eq(0).css({"opacity":"0"});
				$("nav .nav-inner > ul > li").eq(0).find(".button_wrap").css({"height":"0px", "min-height":"0px"});
				
				$("nav .nav-inner > ul > li").eq(2).css({"opacity":"0"});
				$("nav .nav-inner > ul > li").eq(2).find(".button_wrap").css({"height":"0px", "min-height":"0px"});
				
				$("nav .nav-inner > ul > li").eq(1).addClass("active");
				$("nav .nav-inner > ul > li").eq(1).find(".sub_nav > ul").css({"margin-top":"0px", "display":"block", "opacity":1});

				$("nav .nav-inner > ul > li").eq(3).css({"opacity":"0"});
				$("nav .nav-inner > ul > li").eq(3).find(".button_wrap").css({"height":"0px", "min-height":"0px"});
				$("nav .nav-inner > ul").css({"border-bottom":"none"});
				$("nav .nav-inner ul").css({"border-top":"none"});
			}else if (pageURL.indexOf("txt") != -1 || pageURL.indexOf("TXT") != -1)
			{
				$("nav").addClass("active");
				$("nav .nav-inner > ul > li").eq(0).css({"opacity":"0"});
				$("nav .nav-inner > ul > li").eq(0).find(".button_wrap").css({"height":"0px", "min-height":"0px"});
				
				$("nav .nav-inner > ul > li").eq(1).css({"opacity":"0"});
				$("nav .nav-inner > ul > li").eq(1).find(".button_wrap").css({"height":"0px", "min-height":"0px"});
				
				$("nav .nav-inner > ul > li").eq(2).addClass("active");
				$("nav .nav-inner > ul > li").eq(2).find(".sub_nav > ul").css({"margin-top":"0px", "display":"block", "opacity":1});

				$("nav .nav-inner > ul > li").eq(3).css({"opacity":"0"});
				$("nav .nav-inner > ul > li").eq(3).find(".button_wrap").css({"height":"0px", "min-height":"0px"});
				$("nav .nav-inner > ul").css({"border-bottom":"none"});
				$("nav .nav-inner ul").css({"border-top":"none"});
			}
		}
	});
	var clickIdx;
	var menuOpen_able = false;
	var ableTime;
	$("nav .nav-inner .button_wrap button").click(function(){
		if (!menuOpen_able)
		{
			clearTimeout(ableTime);
			menuOpen_able = true;
			if (!$(this).parent().parent().hasClass("disabled"))
			{
				clickIdx = $(this).parent().parent().index();
				if (clickIdx > 0 && $(this).parent().parent().css("opacity") == 1)
				{
					if ($(this).parent().parent().hasClass("active"))
					{
						$("nav").removeClass("active");
						// Close
						$(this).parent().parent().removeClass("active");

						var ulHeight = $(this).parent().parent().find(".sub_nav ul").outerHeight();
						var moveTop = $(this).parent().parent().find(".sub_nav ul").outerHeight();
						if (clickIdx == 2)
						{
							moveTop = moveTop + 250;
							ulHeight = ulHeight + 20;
						}
						setTimeout(function(){
							for (var i = 0; i < $("nav .nav-inner > ul > li").length ; i++)
							{
								if (clickIdx != i)
								{
									$("nav .nav-inner > ul > li").eq(i).css({"transition":"all " + (ulHeight/2) + "ms linear 0.1s","opacity":1, "height":""});
									if (viewportWidth() > 769 && $(window).outerHeight() < 869)
									{
										$("nav .nav-inner > ul > li").eq(i).find(".button_wrap").stop().animate({"height":"11.75vh"},(ulHeight-50));
									}else{
										if ($("body").hasClass("device"))
										{
											if (viewportWidth() < 768 && $(window).outerHeight() < 700)
											{
												$("nav .nav-inner > ul > li").eq(i).find(".button_wrap").stop().animate({"height":"11.75vh"},(ulHeight-50));
											}else if (viewportWidth() < 768)
											{
												$("nav .nav-inner > ul > li").eq(i).find(".button_wrap").stop().animate({"height":"20.83vw"},(ulHeight-50));
											}else{
												$("nav .nav-inner > ul > li").eq(i).find(".button_wrap").stop().animate({"height":"102px"},(ulHeight-50));
											}
										}else{
											$("nav .nav-inner > ul > li").eq(i).find(".button_wrap").stop().animate({"height":"102px"},(ulHeight-50));
										}
									}
								}
								
							}
							setTimeout(function(){
								for (var i = 0; i < $("nav .nav-inner > ul > li").length ; i++)
								{
									if (clickIdx != i)
									{
										$("nav .nav-inner > ul > li").eq(i).find("button").stop().animate({"opacity":1},200);
									}
								}								
							},(ulHeight - 50));
						}, (ulHeight - 50));


						$("nav .nav-inner ul").css({"border-top":""});
						$("nav .nav-inner > ul").css({"border-bottom":""});

						$(this).parent().parent().animate({"margin-top":"0px"},motionDelay);
						
						$(this).parent().parent().find(".sub_nav ul").animate({"opacity":"0"},200);
						
						$(this).parent().parent().find(".sub_nav ul").animate({"margin-top":-ulHeight + "px"},moveTop,function(){
							$(this).css({"display":"none"});
						});
						setTimeout(function(){
							$("nav .nav-inner li").each(function(){
								$(this).find(".button_wrap").removeAttr("style");
							});
							menuOpen_able = false;
						},(ulHeight * 3));
					}else{
						$("nav").addClass("active");
						// Open
						$(this).parent().parent().addClass("active");
						$(this).parent().parent().find(".sub_nav ul").css({"display":"block", "opacity":"0"});
						var ulHeight = $(this).parent().parent().find(".sub_nav ul").outerHeight();
						if (clickIdx == 2)
						{
							ulHeight = $(this).parent().parent().find(".sub_nav ul").eq(0).outerHeight() + $(this).parent().parent().find(".sub_nav ul").eq(1).outerHeight() + 250;
						}
						
						for (var i = 0; i < $("nav .nav-inner > ul > li").length ; i++)
						{
							if (clickIdx != i)
							{
								$("nav .nav-inner > ul > li").eq(i).css({"transition":"all 0.2s linear","opacity":0});
								//$("nav .nav-inner > ul > li").eq(i).find(".button_wrap").css({"transition":"all 0.3s 0.1s linear","height":"0px", "min-height":"0px"});
								$("nav .nav-inner > ul > li").eq(i).find(".button_wrap").stop().animate({"height":"0px", "min-height":"0px"},ulHeight);
							}
						}
						
						
						$(this).parent().parent().find(".sub_nav ul").stop().animate({"margin-top":"0px"},ulHeight);
						setTimeout(function(){							
							$("nav .nav-inner > ul > li").eq(clickIdx).find(".sub_nav ul").stop().animate({"opacity":"1"},300,function(){
								menuOpen_able = false;
							});
						},ulHeight);
						$("nav .nav-inner > ul").css({"border-bottom":"none"});
						$("nav .nav-inner ul").css({"border-top":"none"});
					}
				}else{
					if (clickIdx == 0)
					{
						if ($(".lang_opt").hasClass("active"))
						{
							$(".lang_opt ul").stop().animate({"opacity":"0"},400,function(){
								$(".lang_opt").removeClass("active");
							});
						}

						$("body").css({"position":"","margin-top":"0px"});

						$("html, body").animate({"scrollTop":fixedTop + "px"},0);

						
						$("header").css({"position":""});

						$(".gnb").removeClass("active");
						$("nav").animate({"opacity":"0"},300,function(){					
							$(this).css({"display":"none"});
							menuOpen_able = false;
						});
					}
				}
			}
			ableTime = setTimeout(function(){
				menuOpen_able = false;
			},1000)
		}
		
		
		return false;
	});*/
	// 통합 GNB End
	
	
	if (check_allDevice() ==  '')
	{
		$(".footer_wrap .family_inner").hover(function(){
			$(".footer_wrap .family_inner button").addClass("active");
			$(".footer_wrap .family_inner ul").css({"display":"block","opacity":"0"}).stop().animate({"opacity":"1"},100);
		},function(){
			$(".footer_wrap .family_inner ul").stop().animate({"opacity":"0"},100,function()
			{
				$(this).css({"display":"none"});
				$(".footer_wrap .family_inner button").removeClass("active");
			});
		});
		
		$(".footer_wrap .family_inner button").click(function(){
			return false;
		});

		$(".lang_opt").hover(function(){
			$(".lang_opt").addClass("active");
			$(".lang_opt ul").css({"opacity":"0"}).animate({"opacity":"1"},100);
		},function(){
			$(".lang_opt ul").animate({"opacity":"0"},100,function(){
				$(".lang_opt").removeClass("active");
			});
		});
		$(".lang_opt .btn-lang").click(function(){
			
			return false;
		});
	}else{
		$(".footer_wrap .family_inner button").click(function(){
			if (!motionIng)
			{
				motionIng = true;
				allClear();

				if ($(this).hasClass("active"))
				{
					
					$(".footer_wrap .family_inner ul").animate({"opacity":"0"},300,function()
					{
						$(this).css({"display":"none"});
						$(".footer_wrap .family_inner button").removeClass("active");
					});
				}else{
					$(this).addClass("active");
					$(".footer_wrap .family_inner ul").css({"display":"block","opacity":"0"}).animate({"opacity":"1"},300);
				}

				setTimeout(function(){
					motionIng = false;
				},motionDelay);
			}		
			return false;
		});

		$(".lang_opt .btn-lang").click(function(){
			if (!motionIng)
			{
				motionIng = true;
				allClear();
				if ($(this).parent().hasClass("active"))
				{
					$(".lang_opt ul").animate({"opacity":"0"},motionDelay,function(){
						$(".lang_opt").removeClass("active");
					});
				}else{
					$(".lang_opt").addClass("active");
					$(".lang_opt ul").css({"opacity":"0"}).animate({"opacity":"1"},motionDelay);
				}

				setTimeout(function(){
					motionIng = false;
				},motionDelay);
			}
			return false;
		});

		if (pageType == "txt" || pageType == "bts" || pageType == "leehyun" || pageURL.length <= 5 || document.URL.replace("http://","").replace("https://","").replace("/index.php","").replace("/","") == "www.ibighit.com" || document.URL.replace("http://","").replace("https://","").replace("/index.php","").replace("/","") == "ibighit.com")
		{
			var touchY = 0;
			var moveY = 0;
			$("body").bind("touchstart",function(e){
				var event = e.originalEvent;
				touchY = event.touches[0].screenY;
				//e.preventDefault();
			});

			$("body").bind("touchmove",function(e){
				var event = e.originalEvent;
				var moveY = touchY - event.touches[0].screenY;
				
				var kvPopup = false;
				$(".device .kv .kv-inner li").each(function(){
					if ($(this).find(".kv-popup").css("display") == "block")
					{
						kvPopup = true;
					}
				});

				if ($(".popUp").css("display") == "block")
				{
					kvPopup = true;
				}

				if (!kvPopup && $(".device nav").css("display") != "table" && windowWidth < windowHeight)
				{
					if (moveY > 80)
					{
						$(".device footer").css({"transition":"transform 0.5s","transform":"translateY(0%)"});
					}else{
						$(".device footer").css({"transition":"transform 0.5s","transform":"translateY(100%)"});
						$(".footer_wrap .family_inner ul").css({"display":"none","opacity":0});
						$(".footer_wrap .family_inner button").removeClass("active");
					}
				}else{
					return false;
				}
				
				//e.preventDefault();
			});
		}
	}

	$(".footer_wrap .family_inner ul li a").click(function(){
		//window.open($(this).attr("href"));
		//return false;
	});

	$("a").click(function(){
		if ($(this).attr("href") != "#")
		{
			if ($(this).parent().parent().parent().hasClass("social"))
			{
				gtag('event','Button Click', {'event_category' : 'Footer Social', 'event_label' : $(this).attr("title")});
			}else if ($(this).parent().parent().parent().hasClass("family_inner"))
			{
				gtag('event','Button Click', {'event_category' : 'Family Sites', 'event_label' : $(this).attr("title")});
			}
			if ($(this).attr("target") == "_blank")
			{
				window.open($(this).attr("href"));
			}else{
				document.location.href=$(this).attr("href");
			}
			
		}
		
		return false;
	});

	/* Main Start */
	$(".kv .kv-inner .kv-popup .btn-close").click(function(){
		if (!motionIng)
		{
			motionIng = true;

			$(".kv .kv-inner .kv-popup").animate({"opacity":"0"},motionDelay,function()
			{
				$(this).css({"display":"none"});
				popupShow = false;
			});

			setTimeout(function(){
				motionIng = false;
			},motionDelay);
		}
		return false;
	});

	$(".kv .kv-inner > li button").click(function(){
		if (!$(this).parent().hasClass("no-popup"))
		{
			if (!motionIng && !swipeAble)
			{
				if ($("body").hasClass("device"))
				{
					 if (windowWidth < windowHeight)
					 {
						 $(".device footer").css({"transition":"transform 0.5s","transform":"translateY(100%)"});
					 }
				}			
				
				motionIng = true;
				allClear();
				popupShow = true;

				if (viewportWidth() > 768)
				{
					$(this).parent().find(".kv-popup").css({"display":"table","opacity":0}).animate({"opacity":1},motionDelay,function(){
						popupClose_position();
					});
				}else{				
					$(this).parent().find(".kv-popup").css({"display":"block","opacity":0}).animate({"opacity":1},motionDelay,function(){
						popupClose_position();
					});
					
				}
				
				if (check_allDevice() != "")
				{
					if (viewportWidth() > 768)
					{
						$(".device .kv .kv-inner li").each(function(){
							$(this).find(".popup-scroll").css({"height":""});
						});
						
					}else{
						
						$(".device .kv .kv-inner li").each(function(){
							var reHeight = 0;
							if ($("footer").css("position") == "fixed")
							{
								reHeight = $("main").outerHeight() - $("header").outerHeight()-$(this).find(".kv-popup h2").outerHeight(true) - $("footer").outerHeight();
							}else{
								reHeight = $("main").outerHeight() - $("header").outerHeight()-$(this).find(".kv-popup h2").outerHeight(true);
							}
							$(this).find(".popup-scroll").css({"height":reHeight + "px"});
						});
					}
				}
				popupClose_position();

				setTimeout(function(){
					motionIng = false;
				},motionDelay);
			}	
		}else{
			if (!$(this).parent().hasClass("link_disabled"))
			{
				if (!motionIng && !swipeAble)
				{
					var artist = $(this).attr("data-artist");
					var link = $(this).attr("data-url");
					if (pageURL.indexOf("bts") > -1 || pageURL.indexOf("txt") > -1 || pageURL.indexOf("BTS") > -1 || pageURL.indexOf("TXT") > -1 ||pageURL.indexOf("leehyun") > -1)
					{
						if (link !== false)
						{
							document.location.href="./discography/detail/" + link;
						}
					}else{
						if (link !== false)
						{
							switch ($(".lang_opt .btn-lang p").text())
							{
								case "KOR":
								{
									document.location.href="/"+artist+"/kor/discography/detail/" + link;
									break;
								}
								case "ENG":
								{
									document.location.href="/"+artist+"/eng/discography/detail/" + link;
									break;
								}
								case "JPN":
								{
									document.location.href="/"+artist+"/jpn/discography/detail/" + link;
									break;
								}
								case "CHN":
								{
									document.location.href="/"+artist+"/chn/discography/detail/" + link;
									break;
								}				
							}
						}
					}
				}
			}
			
		}			
		return false;
	});
	

	$(".kv .btn-prev").click(function(){
		if (!motionIng && kvIdx > 0 && !$(this).hasClass("disabled"))
		{
			if (check_allDevice() != "" && $("footer").css("position") == "absolute")
			{
				if (windowWidth < windowHeight)
				{
					$(".device footer").css({"transform":"translateY(100%)", "opacity":1});
				}				
			}
			motionIng = true;
			kvMax = $(".kv .kv-inner > li").length - 1;
			$(".kv .kv-inner > li").eq(kvIdx).stop().animate({"margin-left":"100%"},motionDelay);
			kvIdx--;
			/*if (kvIdx < 0)
			{
				kvIdx = kvMax;
			}*/

			$(".kv .btn-next").removeClass("disabled");
			if (kvIdx == 0)
			{
				$(this).addClass("disabled");
				
			}

			$(".kv .kv-inner > li").eq(kvIdx).css({"margin-left":"-100%"}).stop().animate({"margin-left":"0%"},motionDelay);
			$(".kv .carousel li").removeClass("active");
			$(".kv .carousel li").eq(kvIdx).addClass("active");
			setTimeout(function(){
				motionIng = false;
			},motionDelay);
		}
		return false;
	});
	
	$(".kv .btn-next").click(function(){
		if (!motionIng && kvIdx < $(".kv .kv-inner > li").length-1 && !$(this).hasClass("disabled"))
		{
			if (check_allDevice() != "" && $("footer").css("position") == "absolute")
			{
				if (windowWidth < windowHeight)
				{
					$(".device footer").css({"transform":"translateY(100%)", "opacity":1});
				}				
			}
			motionIng = true;
			kvMax = $(".kv .kv-inner > li").length;
			$(".kv .kv-inner > li").eq(kvIdx).stop().animate({"margin-left":"-100%"},motionDelay);
			kvIdx++;
			/*if (kvIdx == kvMax)
			{
				kvIdx = 0;
			}*/

			$(".kv .btn-prev").removeClass("disabled");
			if (kvIdx == kvMax - 1 )
			{
				$(this).addClass("disabled");
			}

			$(".kv .kv-inner > li").eq(kvIdx).css({"margin-left":"100%"}).stop().animate({"margin-left":"0%"},motionDelay);
			$(".kv .carousel li").removeClass("active");
			$(".kv .carousel li").eq(kvIdx).addClass("active");
			setTimeout(function(){
				motionIng = false;
			},motionDelay);
		}
		
		return false;
	});

	$(".kv .carousel button").click(function(){
		if (!motionIng && !$(this).parent().hasClass("active"))
		{
			motionIng = true;
			var clickIdx = $(this).parent().index();
			if ($(this).parent().index() > kvIdx)
			{
				$(".kv .kv-inner > li").eq(kvIdx).stop().animate({"margin-left":"-100%"},motionDelay);
				$(".kv .kv-inner > li").eq(clickIdx).css({"margin-left":"100%"}).stop().animate({"margin-left":"0%"},motionDelay);
			}else{
				$(".kv .kv-inner > li").eq(kvIdx).stop().animate({"margin-left":"100%"},motionDelay);
				$(".kv .kv-inner > li").eq(clickIdx).css({"margin-left":"-100%"}).stop().animate({"margin-left":"0%"},motionDelay);
			}
			$(".kv .carousel li").removeClass("active");
			$(".kv .carousel li").eq(clickIdx).addClass("active");

			kvIdx = clickIdx;
			kvMax = $(".kv .kv-inner > li").length;
			
			$(".kv .btn-prev").removeClass("disabled");
			$(".kv .btn-next").removeClass("disabled");
			if (kvIdx == 0)
			{
				$(".kv .btn-prev").addClass("disabled");
			}else if (kvIdx == kvMax-1)
			{
				$(".kv .btn-next").addClass("disabled");
			}


			setTimeout(function(){
				motionIng = false;
			},motionDelay);
		}
		return false;
	});
	/* Main End */

	/*Profile Start*/
	$(".members .profile-img button").click(function(){
		var clickIdx = $(this).parent().index();
		profilePopup = clickIdx;
		//var imgHeight = parseFloat($(".members .profile-img li button .contents-obj img").outerHeight()) * 2;
		var imgHeight = windowWidth/2 > 720 ? 720 : windowWidth/2;
		var thumbHeight = $(".members .profile-img button .contents-obj img").outerHeight();

		if (viewportWidth() < 769)
		{
			imgHeight = windowWidth;
		}
		
		if (Math.ceil(imgHeight) > imgHeight)
		{
			imgHeight = Math.floor(imgHeight);
			if (checkBrowser() != "safari" || imgHeight % 2 == 1)
			{
				++imgHeight;
			}
		}else{
			imgHeight = Math.ceil(imgHeight);
			++imgHeight;
		}
		
		
		$(".popup ul li .contents-obj img").css({"height":imgHeight + "px"});

		if (viewportWidth() < 769)
		{
			$("main").css({"padding-bottom":thumbHeight + "px"});
			$(".members .popup-inner > ul > li .contents").css({"height":thumbHeight + "px"});
		}

		$(".members .popup-inner > ul > li").removeClass("active").css({"display":"none"});
		$(".members .popup-inner > ul > li").eq(clickIdx).addClass("active").css({"display":"block"});
		$(".members .popup").css({"display":"block","opacity":0}).animate({"opacity":1},motionDelay);
		if (viewportWidth() < 769)
		{
			var reTop = 0;
			if (pageURL.indexOf("TXT") != -1 || pageURL.indexOf("txt") != -1 || pageURL.indexOf("txt.ibighit.com") != -1 || pageURL.indexOf("qa_txt.ibighit.com") != -1)
			{
				switch (clickIdx)
				{
					case 0:
					{
						reTop = 0;
						break;
					}case 1:
					{
						reTop = windowWidth / 2;
						break;
					}default:
					{
						reTop = windowWidth;
					}			
				}
			}else if (pageURL.indexOf("BTS") != -1 || pageURL.indexOf("bts") != -1 || pageURL.indexOf("bts.ibighit.com") != -1 || pageURL.indexOf("qa_bts.ibighit.com") != -1){
				if (pageURL[pageURL.length-1].split(".")[0] == "awards")
				{
					switch (clickIdx)
					{
						case 0:
						{
							reTop = 0;
							break;
						}default:
						{
							reTop = windowWidth / 2;
						}			
					}
				}else{
					switch (clickIdx)
					{
						case 0:
						{
							reTop = 0;
							break;
						}case 1:
						{
							reTop = windowWidth / 2;
							break;
						}case 4:
						{
							reTop = windowWidth + windowWidth / 2;
							break;
						}case 5:
						{
							reTop = windowWidth + windowWidth / 2;
							break;
						}case 6:
						{
							reTop = windowWidth + windowWidth / 2;
							break;
						}default:
						{
							reTop = windowWidth;
						}			
					}
				}				
			}
			if (windowWidth % 2 == 1 && profilePopup != 0)
			{
				if($("body").hasClass("safari")){
					$(".members .popup-inner > ul > li.active").css({"top": (Math.floor(reTop) + 1) + "px"});
				}else{
					$(".members .popup-inner > ul > li.active").css({"top": (Math.floor(reTop) - 1) + "px"});
				}
			}else{
				$(".members .popup-inner > ul > li.active").css({"top": reTop + "px"});
			}

			
		}else{
			$(".members .popup-inner > ul > li.active").css({"top":""});
		}
		return false;
	});

	$(".members .popup-inner > ul > li .btn-close").click(function(){
		$(this).parents(".popup").animate({"opacity":0},motionDelay,function(){
			$(this).css({"display":"none"});
		});
		return false;
	});

	$(".members .dimmed").click(function(){
		$(this).parents(".popup").animate({"opacity":0},motionDelay,function(){
			$(this).css({"display":"none"});
		});
		return false;
	});
	
	
	$(".members .popup-inner > ul > li").click(function(){
		
		return false;
	});

	
	$(".awards .btn-load").click(function(){
		var fullHeight = $(".awards .contents-desc").outerHeight();
		++Awards_moreIdx;
		var reHeight = Math.floor(viewportWidth()*0.0486) * 20 * Awards_moreIdx;
		if (reHeight < fullHeight)
		{
			$(".awards .scroll_wrap .scroll_inner").css({"height":reHeight + "px"});
		}else{
			$(".awards .btn-load").css({"display":"none"});
			$(".awards .scroll_wrap .scroll_inner").css({"height":fullHeight + "px"});
		}
		return false;
	});
	/*Profile End*/

	/*Discography Start*/
	$(".album-list ul li a").click(function(){
		var locationHref = $(this).attr("href");
		document.location.href=locationHref;
		return false;
	});

	$(".album-detail .album-video .slide-wrap > ul > li .btn-play").click(function(){
		if (pageLoad)
		{
			var cta = $(this).attr("data-omni");
			gtag('event','Button Click', {'event_category' : 'Music Video', 'event_label' : cta});

			if ($(this).hasClass("mp4"))
			{
				if ($(this).hasClass("btn-pause"))
				{
					$(this).parent().find("video").each(function(){
						this.pause();
						this.currentTime = 0;
						
					});
					$(this).find("img").css({"opacity":""});
					$(this).removeClass("btn-pause");
				}else{
					$(".album-detail .album-video .slide-wrap > ul > li").removeClass("active");
					$(".album-detail .album-video .slide-wrap > ul > li.slide_video ul li").removeClass("active");
					$(this).parent().parent().addClass("active");
					$(this).parents(".slide_video").addClass("active");
					changeMusicVideo(100);
					$(this).parent().find("video").each(function(){
						$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap video").each(function(){
							$(this).parent().find("button").removeClass("btn-pause");
							if (!this.paused)
							{
								this.pause();
								this.currentTime = 0;
							}					
						});

						if (!$(this).parent().find("button").hasClass("btn-pause"))
						{
							$(this).parent().find("button").addClass("btn-pause");
						}
						this.play();					
					});
				}			
			}else{
				$(".album-detail .album-video .bottom ul li").removeClass("active");
				$(".album-detail .album-video .slide-wrap > ul > li").removeClass("active");

				$(this).parent().parent().addClass("active");
				if ($(this).parent().parent().parent().parent().hasClass("slide_video"))
				{
					$(this).parents(".slide_video").addClass("active");
				}

				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap video").each(function(){
					$(this).parent().find("button").removeClass("btn-pause");
					if (!this.paused)
					{	
						this.pause();
						this.currentTime = 0;
					}				
				});
				
				videoIndex = $(this).parent().parent().index();
				if ($(this).parent().parent().parent().parent().hasClass("angel_or_devil"))
				{
					videoIndex = videoIndex + 6;
				}
				$(".album-detail .album-video .slide-wrap > ul > li").eq(videoIndex).addClass("active");
				$(".album-detail .album-video .bottom ul li").eq(videoIndex).addClass("active");
				changeMusicVideo(videoIndex);
			}

			if ($(this).parent().parent().parent().parent().hasClass("slide_video"))
			{
				if ($(this).parent().parent().parent().parent().hasClass("magic_island"))
				{
					$(".the_dream_chapter-magic .album-detail .album-video .bottom.rows .narrow").removeClass("active");
					$(".the_dream_chapter-magic .album-detail .album-video .bottom.rows .btn_wrap.btn_magic_island .narrow").eq($(this).parent().parent().index()).addClass("active");
				}else if ($(this).parent().parent().parent().parent().hasClass("angel_or_devil")){
					$(".the_dream_chapter-magic .album-detail .album-video .bottom.rows .narrow").removeClass("active");
					$(".the_dream_chapter-magic .album-detail .album-video .bottom.rows .btn_wrap.btn_angel_or_devil .narrow").eq($(this).parent().parent().index()).addClass("active");
				}
				
			}
		}
		
		return false;
	});
	$(".album-detail .album-video .bottom ul li button").click(function(){
		if (!motionIng && !$(this).parent().hasClass("active") && pageLoad)
		{
			var cta = $(this).attr("data-omni");
			gtag('event','Button Click', {'event_category' : 'Music Video', 'event_label' : cta});

			motionIng = true;

			$(".album-detail .album-video .bottom ul li").removeClass("active");
			$(this).parent().addClass("active");
			var videoIdx = $(this).parent().index();
			var newIdx = -1;

			$(".album-detail .album-video .bottom ul li").each(function(){
				if ($(this).hasClass("narrow"))
				{
					++newIdx;
					if ($(this).hasClass("active"))
					{
						videoIdx = newIdx;
					}
				}
			});
			var tabIdx = 0;
			var reIdx = videoIdx;

			if ($(".wrapper").hasClass("the_dream_chapter-magic"))
			{
				if (videoIdx > 4)
				{
					if (videoIdx > 10)
					{
						tabIdx = videoIdx - 11;	
						reIdx = videoIdx - 5;
					}else{
						tabIdx = videoIdx - 5;
						if (videoIdx < 10)
						{
							reIdx = videoIdx - 5;					
						}else{
							reIdx = 5;
						}
					}
				}
			}
			
			var cIdx = videoIndex;
			if ($(".wrapper").hasClass("the_dream_chapter-magic"))
			{
				if (videoIndex > 4)
				{
					if (videoIndex <= 10)
					{
						cIdx = 5;
					}else{
						cIdx = 6;
					}
				}
			}

			if (cIdx != videoIdx)
			{
				$(".album-detail .album-video .slide-wrap > ul > li").eq(cIdx).stop().animate({"opacity":0},motionDelay,function(){
					if ($(this).index() != 0)
					{
						$(this).css({"display":"none"});
					}					
				});
			}
			videoIndex = videoIdx;
			cIdx = videoIndex;
			if ($(".wrapper").hasClass("the_dream_chapter-magic"))
			{
				if (videoIndex > 4)
				{
					if (videoIndex <= 10)
					{
						cIdx = 5;
					}else{
						cIdx = 6;
					}
				}
			}

			$(".album-detail .album-video .slide-wrap > ul > li").eq(cIdx).css({"display":"block","opacity":0, "margin-left":""}).stop().animate({"opacity":1},motionDelay,function(){
				$(".album-detail .album-video .slide-wrap > ul > li").removeClass("active");
				$(this).addClass("active");
				if (!$(this).hasClass("slide_video"))
				{
					$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap video").each(function(){
						$(this).parent().find("button").removeClass("btn-pause");
						if (!this.paused)
						{							
							this.pause();
							this.currentTime = 0;
						}						
					});
					
					changeMusicVideo(reIdx);
				}else{
					if (reIdx >= 5)
					{
						$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap video").each(function(){
							$(this).parent().find("button").removeClass("btn-pause");
							if (!this.paused)
							{							
								this.pause();
								this.currentTime = 0;
							}						
						});
						changeMusicVideo(reIdx);
					}else{
						$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap video").each(function(){
							$(this).parent().find("button").removeClass("btn-pause");
							if (!this.paused)
							{
								this.pause();
								this.currentTime = 0;
							}						

							if ($(this).parent().parent().hasClass("active"))
							{
								
								$(this).parent().find("button").addClass("btn-pause");
								this.play();							
							}
						});
						changeMusicVideo(100);
					}					
				}
			});

			if ($(this).parent().parent().parent().hasClass("btn_magic_island") || $(this).parent().parent().parent().hasClass("btn_angel_or_devil"))
			{
				if ($(this).parent().parent().parent().hasClass("btn_magic_island"))
				{
					$(".album-detail .album-video .slide-wrap > ul > li.magic_island ul").eq(0).find("li").removeClass("active");
					$(".album-detail .album-video .slide-wrap > ul > li.magic_island ul").eq(0).find("li").eq(tabIdx).addClass("active").css({"margin-left":""});
				}else if ($(this).parent().parent().parent().hasClass("btn_angel_or_devil"))
				{
					$(".album-detail .album-video .slide-wrap > ul > li.angel_or_devil ul").eq(0).find("li").removeClass("active");
					$(".album-detail .album-video .slide-wrap > ul > li.angel_or_devil ul").eq(0).find("li").eq(tabIdx).addClass("active").css({"margin-left":""});
				}
			}

			setTimeout(function(){
				motionIng = false;
			},1000);
		}
		return false;
	});
	if (pageURL.indexOf("discography") != -1 || pageURL.indexOf("mixtape") != -1)
	{
		youtubeAPI_Load();
	}
	
	$(".the_dream_chapter-magic .album-detail .album-video.slide .slide_video .btn-next").click(function(){
		if (!motionIng)
		{
			motionIng = true;
			changeMusicVideo(100);
			$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap video").each(function(){
				if (!this.paused)
				{
					$(this).parent().find("button").removeClass("btn-pause");
					this.pause();
					this.currentTime = 0;
				}			
			});
			if ($(this).parent().parent().parent().hasClass("magic_island"))
			{
				var maxLength = $(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide li").length-1;

				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul li").eq(magicVideo[0]).animate({"margin-left":"-100%"}, motionDelay);
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide > li").eq(magicVideo[0]).animate({"opacity":"0"}, motionDelay);
				magicVideo[0]++;
				if (magicVideo[0] > maxLength)
				{
					magicVideo[0] = 0;
				}
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul li").eq(magicVideo[0]).css({"margin-left":"100%"}).animate({"margin-left":"0%"}, motionDelay);
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide > li").eq(magicVideo[0]).animate({"opacity":"1"}, motionDelay);
			}else if ($(this).parent().parent().parent().hasClass("angel_or_devil"))
			{
				var maxLength = $(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul.contents-sub-slide li").length-1;

				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul li").eq(magicVideo[1]).animate({"margin-left":"-100%"}, motionDelay);
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul.contents-sub-slide > li").eq(magicVideo[1]).animate({"opacity":"0"}, motionDelay);
				magicVideo[1]++;
				if (magicVideo[1] > maxLength)
				{
					magicVideo[1] = 0;
				}
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul li").eq(magicVideo[1]).css({"margin-left":"100%"}).animate({"margin-left":"0%"}, motionDelay);
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul.contents-sub-slide > li").eq(magicVideo[1]).animate({"opacity":"1"}, motionDelay);
			}
			setTimeout(function(){
				motionIng = false;
			},motionDelay);
		}
		return false;
	});

	$(".the_dream_chapter-magic .album-detail .album-video.slide .slide_video .btn-prev").click(function(){
		if (!motionIng)
		{
			motionIng = true;
			changeMusicVideo(100);
			$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap video").each(function(){
				if (!this.paused)
				{
					$(this).parent().find("button").removeClass("btn-pause");
					this.pause();
					this.currentTime = 0;
				}			
			});
			if ($(this).parent().parent().parent().hasClass("magic_island"))
			{
				var maxLength = $(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide li").length-1;

				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul li").eq(magicVideo[0]).animate({"margin-left":"100%"}, motionDelay);
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide > li").eq(magicVideo[0]).animate({"opacity":"0"}, motionDelay);

				magicVideo[0]--;
				if (magicVideo[0] < 0)
				{
					magicVideo[0] = maxLength;
				}
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul li").eq(magicVideo[0]).css({"margin-left":"-100%"}).animate({"margin-left":"0%"}, motionDelay);
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide > li").eq(magicVideo[0]).animate({"opacity":"1"}, motionDelay);
			}else if ($(this).parent().parent().parent().hasClass("angel_or_devil"))
			{
				var maxLength = $(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul.contents-sub-slide li").length-1;

				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul li").eq(magicVideo[1]).animate({"margin-left":"100%"}, motionDelay);
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul.contents-sub-slide > li").eq(magicVideo[1]).animate({"opacity":"0"}, motionDelay);
				magicVideo[1]--;
				if (magicVideo[1] < 0)
				{
					magicVideo[1] = maxLength;
				}
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul li").eq(magicVideo[1]).css({"margin-left":"-100%"}).animate({"margin-left":"0%"}, motionDelay);
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul.contents-sub-slide > li").eq(magicVideo[1]).animate({"opacity":"1"}, motionDelay);
			}

			setTimeout(function(){
				motionIng = false;
			},motionDelay);
		}
		return false;
	});
	
	
	$(".album-detail .album-photo .bottom ul li button").click(function(){
		
		if (!motionIng && !$(this).parent().hasClass("active"))
		{
			albumPhoto = $(this).parent().index();
			$(".album-detail .album-photo .bottom ul li").removeClass("active");
			$(this).parent().addClass("active");
			motionIng = true;
			$(".album-detail .album-photo .slide-wrap > ul > li").removeClass("active");
			if ($(".wrapper").hasClass("the_dream_chapter-magic"))
			{
				if (albumPhoto == 0)
				{
					$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).addClass("active").css({"opacity":1, "display":"block", "position":"relative"});
					$(".album-detail .album-photo .slide-wrap > ul > li").eq(oldPhoto).css({"position":"absolute"}).stop().animate({"opacity":0},motionDelay,function(){
						$(this).css({"display":"none"});
					});
				}else{
					if (oldPhoto > albumPhoto)
					{
						
						$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).addClass("active").css({"opacity":1, "display":"block", "position":"relative"});
						$(".album-detail .album-photo .slide-wrap > ul > li").eq(oldPhoto).css({"position":"absolute"}).stop().animate({"opacity":0},motionDelay,function(){
							$(this).css({"display":"none"});
						});
					}else{
						$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).css({"opacity":0, "display":"block"}).addClass("active").stop().animate({"opacity":1},motionDelay,function(){
							$(this).css({"position":"relative"});
							$(".album-detail .album-photo .slide-wrap > ul > li").eq(oldPhoto).css({"opacity":0, "display":"none", "position":"absolute"});							
						});
					}
					
				}
				$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("> ul > li").css({"margin-left":""});
				$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("> ul > li").removeClass("relative");
				$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("> ul > li").eq(0).addClass("relative");
				albumPhoto_idx[albumPhoto] = 0;
			}else if ($(".wrapper").hasClass("dynamite")){
				if (albumPhoto == 0)
				{
					$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find(".slide-obj").css({"display":"block"});
					$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).addClass("active").animate({"opacity":1},motionDelay);
					$(".album-detail .album-photo .slide-wrap > ul > li").eq(oldPhoto).stop().animate({"opacity":0},motionDelay,function(){
						if (oldPhoto > 0)
						{
							$(this).css({"display":"none"});
						}
						$(this).find(".slide-obj").css({"display":"none"});
					});
				}else{
					if (oldPhoto > albumPhoto)
					{
						$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find(".slide-obj").css({"display":"block"});
						$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).addClass("active").css({"opacity":0, "display":"block"}).animate({"opacity":1},motionDelay);
						$(".album-detail .album-photo .slide-wrap > ul > li").eq(oldPhoto).stop().animate({"opacity":0},motionDelay,function(){
							if (oldPhoto > 0)
							{
								$(this).css({"display":"none"});
							}
							$(this).find(".slide-obj").css({"display":"none"});
						});
					}else{
						$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find(".slide-obj").css({"display":"block"});
						$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).css({"opacity":0, "display":"block"}).addClass("active").stop().animate({"opacity":1},motionDelay);
						if (oldPhoto > 0)
						{
							$(".album-detail .album-photo .slide-wrap > ul > li").eq(oldPhoto).animate({"opacity":0},motionDelay,function(){
								$(this).css({"display":"none"});
								$(this).find(".slide-obj").css({"display":"none"});
							});
						}else{
							$(".album-detail .album-photo .slide-wrap > ul > li").eq(oldPhoto).animate({"opacity":0},motionDelay,function(){
								$(this).find(".slide-obj").css({"display":"none"});
							});
						}
					}
				}
			}else{
				if (albumPhoto == 0)
				{
					$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).addClass("active").animate({"opacity":1},motionDelay);
					$(".album-detail .album-photo .slide-wrap > ul > li").eq(oldPhoto).stop().animate({"opacity":0},motionDelay,function(){
						if (oldPhoto > 0)
						{
							$(this).css({"display":"none"});
						}
					});
				}else{
					if (oldPhoto > albumPhoto)
					{
						
						$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).addClass("active").css({"opacity":0, "display":"block"}).animate({"opacity":1},motionDelay);
						$(".album-detail .album-photo .slide-wrap > ul > li").eq(oldPhoto).stop().animate({"opacity":0},motionDelay,function(){
							if (oldPhoto > 0)
							{
								$(this).css({"display":"none"});
							}
						});
					}else{
						$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).css({"opacity":0, "display":"block"}).addClass("active").stop().animate({"opacity":1},motionDelay);
						if (oldPhoto > 0)
						{
							$(".album-detail .album-photo .slide-wrap > ul > li").eq(oldPhoto).animate({"opacity":0},motionDelay,function(){
								$(this).css({"display":"none"});
							});
						}else{
							$(".album-detail .album-photo .slide-wrap > ul > li").eq(oldPhoto).animate({"opacity":0},motionDelay);
						}
					}
				}
			}
			
			if ($(".wrapper").hasClass("the_dream_chapter-magic"))
			{
				sqStop();
			}
			
			setTimeout(function(){
				oldPhoto = albumPhoto;
				motionIng = false;
				if ($(".wrapper").hasClass("the_dream_chapter-magic"))
				{
					sqStart();
				}
			},(motionDelay + 100));
		}
		
		return false;
	});

	$(".album-detail .album-photo .slide-wrap .slide-obj button").on("mouseenter touchstart", function(){
		$(this).addClass("active");
	});

	$(".album-detail .album-photo .slide-wrap .slide-obj button").on("mouseleave touchend", function(){
		$(this).removeClass("active");
	});
	
	
	$(".album-detail .album-photo .slide-wrap .btn-next").click(function(){
		if (!motionIng)
		{
			motionIng = true;
			albumPhoto = $(this).parent().parent().index();

			var levelMax = $(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").length;
			
			$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).stop().animate({"margin-left":"-100%"},motionDelay);
			++albumPhoto_idx[albumPhoto];
			if (albumPhoto_idx[albumPhoto] == levelMax)
			{
				albumPhoto_idx[albumPhoto] = 0;
			}
			$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).css({"margin-left":"100%"}).stop().animate({"margin-left":"0%"},motionDelay);

			if ($(".wrapper").hasClass("the_dream_chapter-magic"))
			{
				$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").removeClass("relative");
				$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).addClass("relative");
				if ($(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).find(".contents-obj").hasClass("portrait"))
				{
					$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).find(".contents-obj img").css({"width":"100%","height":"auto"});
				}else{
					$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).find(".contents-obj img").css({"width":"","height":""});
				}
			}
			
			if ($(".wrapper").hasClass("the_dream_chapter-magic"))
			{
				sqStop();
			}
			setTimeout(function(){
				motionIng = false;
				if ($(".wrapper").hasClass("the_dream_chapter-magic"))
				{
					sqStart();
				}
			},motionDelay);
		}
		return false;
	});
	$(".album-detail .album-photo .slide-wrap .btn-prev").click(function(){
		if (!motionIng)
		{
			motionIng = true;
			albumPhoto = $(this).parent().parent().index();

			var levelMax = $(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").length;
	 
			$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).stop().animate({"margin-left":"100%"},motionDelay);
			--albumPhoto_idx[albumPhoto];
			if (albumPhoto_idx[albumPhoto] < 0)
			{
				albumPhoto_idx[albumPhoto] = levelMax-1;
			}
			$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).css({"margin-left":"-100%"}).stop().animate({"margin-left":"0%"},motionDelay);
			
			if ($(".wrapper").hasClass("the_dream_chapter-magic"))
			{
				$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").removeClass("relative");
				$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).addClass("relative");
				if ($(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).find(".contents-obj").hasClass("portrait"))
				{
					$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).find(".contents-obj img").css({"width":"100%","height":"auto"});
				}else{
					$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).find(".contents-obj img").css({"width":"","height":""});
				}
			}

			if ($(".wrapper").hasClass("the_dream_chapter-magic"))
			{
				sqStop();
			}
			setTimeout(function(){
				motionIng = false;
				if ($(".wrapper").hasClass("the_dream_chapter-magic"))
				{
					sqStart();
				}
			},motionDelay);
		}
		return false;
	});
	/*Discography End*/

	/*Calendar Start*/
	$(".calendar .btn-close").click(function(){
		if (!motionIng)
		{
			motionIng = true;
		
			if (viewportWidth() < 769)
			{
				$(".calendar .popup-dimmed").stop().animate({"opacity":0},300,function(){
					$(this).css({"display":"none"})
				});
				$(this).parents(".popup").stop().animate({"opacity":0},300,function(){
					$(this).css({"display":"none", "bottom":"100%"});
					$(".calendar tr").removeClass("active");
				});
			}else{
				$(this).parents(".popup").stop().animate({"opacity":"0"},300,function(){
					$(this).css({"display":"none", "bottom":"100%"});
					$(".calendar tr").removeClass("active");
				});
			}
			
			
			setTimeout(function(){
				motionIng = false;
			},500);
		}
		return false;
	});
	$(".calendar table tbody td .schedule-list button").click(function(){
		if (!motionIng)
		{
			motionIng = true;
			$(".calendar table tr").each(function(){
				if ($(this).hasClass("active"))
				{
					$(this).find(".popup").stop().animate({"opacity":"0"},300,function(){
						$(this).css({"display":"none", "bottom":"100%"});
						$(this).parents("tr").removeClass("active");
					});
				}
			});

			$(".calendar table tbody tr td .date").removeClass("active");
			$(this).parent().parent().find(".date").addClass("active");

			
			var dataID = $(this).attr("data-id");
			$(this).parents("tr").find(".popup .list").removeClass("active");
			$(this).parents("tr").find(".popup .list#" +dataID).addClass("active");
			$(this).parents("tr").addClass("active");
			/*if ($(this).parents("tr").hasClass("active"))
			{
				$(this).parents("tr").siblings("tr").find(".popup").animate({"opacity":1},300, function(){
					$(this).css({"display": "none"});
					$(this).parent("tr").removeClass("active");
				});
			}*/
			if (viewportWidth() > 768)
			{
				$(this).parents("tr").find(".popup").css({"display":"block","bottom":"0px","opacity":0}).stop().animate({"bottom":"0px","opacity":1},300);
			}else{
				$(this).parents("tr").find(".popup").css({"display":"block", "bottom":"-100%","opacity":0}).stop().animate({"bottom":"-100%","opacity":1},300);
			}
			
			if (viewportWidth() < 769)
			{
				$(".calendar .popup-dimmed").css({"display":"block","opacity":0}).stop().animate({"opacity":1},300);
			}			

			setTimeout(function(){
				motionIng = false;
			},500);
		}
		return false;
	});

	$(".calendar .popup-dimmed").click(function(){
		if (!motionIng)
		{
			motionIng = true;
			$(".calendar .active .popup").stop().animate({"opacity":"0"},300,function(){
				$(this).css({"display":"none", "bottom":"100%"});
				$(".calendar tr").removeClass("active");				
			});

			setTimeout(function(){
				motionIng = false;
			},500);
		}
	});

	$(".calendar .active .popup").click(function(){
		return false;
	});
	$(".calendar .popup .list").click(function(){
		return false;
	});
	$(".calendar .popup .valign").click(function(){
		return false;
	});
	$(".calendar table tbody tr td .date").click(function(){
		if ($(this).parent().parent().hasClass("active"))
		{
			return false;
		}		
	});

	$(".calendar table tbody tr td").click(function(){
		if ($(this).parent().hasClass("active"))
		{
			return false;
		}		
	});

	$(".calendar table tbody tr").click(function(){
		if ($(this).hasClass("active"))
		{
			return false;
		}		
	});

	$(".calendar .btn-prev").click(function(){
		$(this).css({"display":"none"});
		$(".calendar .btn-next").css({"display":"block"});
		$(".calendar .contents").removeClass("active");
		$(".calendar .contents").eq(0).addClass("active");
		return false;
	});
	$(".calendar .btn-next").click(function(){
		$(this).css({"display":"none"});
		$(".calendar .btn-prev").css({"display":"block"});
		$(".calendar > .contents").removeClass("active");
		$(".calendar > .contents").eq(1).addClass("active");
		return false;
	});
	/*Calendar End*/
	/*News Start*/
	$(".news-detail .btn-obj > div a").click(function(){
		if ($(this).attr("href") == "#")
		{
			return false;
		}
		
	});
	/*News End*/
	/*Tour Start*/
	$(".has_tab .tab_menu li a").click(function(){
		var goTop = $(".tour-list").eq($(this).parent().index()).offset().top;
		var speed = Math.abs(scrollTop-goTop)/5;
		$("html, body").stop().animate({"scrollTop":goTop + "px"}, speed, 'swing');
		return false;
	});

	if (check_allDevice() ==  '')
	{
		$(".all-tour .drop_inner").hover(function(){
			$(this).addClass("active");
			$(".all-tour ul").css({"display":"block","opacity":0}).stop().animate({"opacity":1},200);
		},function(){
			$(this).removeClass("active");
			$(".all-tour ul").stop().animate({"opacity":0},200,function(){
				$(this).css({"display":"none"});				
			});
		});

		$(".has_tab .tab-drop").hover(function(){
			$(this).addClass("active");
			$(".tab-drop ul").css({"display":"block","opacity":0}).stop().animate({"opacity":1},200);
		},function(){
			$(this).removeClass("active");
			$(".tab-drop ul").stop().animate({"opacity":0},200,function(){
				$(this).css({"display":"none"});				
			});
		});
	}else{
		$(".all-tour button").click(function(){
			if (!$(this).parent().hasClass("active"))
			{
				$(this).parent().addClass("active");
			}else{
				$(this).parent().removeClass("active");
			}
			return false;
		});

		$(".has_tab .tab-drop button.btn-present").click(function(){
			if (!$(this).parent().hasClass("active"))
			{
				$(this).parent().addClass("active");
			}else{
				$(this).parent().removeClass("active");
			}
			return false;
		});
		if (pageURL.indexOf("tour") != -1)
		{
			$("body").click(function(){
				if ($(".all-tour .drop_inner").hasClass("active"))
				{
					$(".all-tour .drop_inner").removeClass("active");
				}

				if ($(".has_tab .tab-drop").hasClass("active"))
				{
					$(".has_tab .tab-drop").removeClass("active");
				}
				return false;
			});
		}
	}
	
	$(".has_tab .tab-drop li button").click(function(){
		var tourTab = $(this).parent().index();
		$(".has_tab .tour-list").removeClass("active");
		$(".has_tab .tour-list").eq(tourTab).addClass("active");
		
		$(".has_tab .tab-drop button.btn-present").html($(this).text());
		$(this).parents(".tab-drop").removeClass("active");
		if (check_allDevice() ==  '')
		{
			$(".tab-drop ul").stop().animate({"opacity":0},200,function(){
				$(this).css({"display":"none"});				
			});
		}
		return false;
	});

	/*Tour End*/


	if (pageType == "txt" || pageType == "bts" || pageType == "leehyun" || pageURL.length <= 5)
	{
		kvMax = $(".kv .kv-inner > li").length - 1;
		
		/*var downAble = false;
		$(".kv .kv-inner").mousedown(function(e){
			downAble = true;
			swipeAble = false;
		});

		$(".kv .kv-inner").mousemove(function(e){
			if (downAble)
			{
				swipeAble = true;
			}			
		});*/

		/*
		$(".kv .kv-inner").swipe({
			swipeStatus:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
			},
			swipe:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
				if(distance > 50 && !popupShow)
				{
					if(direction == "left" || phase == "left" || direction == "right" || phase == "right")
					{
						if((direction == "left" || phase == "left"))
						{							
							if (!motionIng)
							{
								motionIng = true;
								kvMax = $(".kv .kv-inner > li").length;
								$(".kv .kv-inner > li").eq(kvIdx).stop().animate({"margin-left":"-100%"},motionDelay);
								kvIdx++;
								if (kvIdx == kvMax)
								{
									kvIdx = 0;
								}
								$(".kv .kv-inner > li").eq(kvIdx).css({"margin-left":"100%"}).stop().animate({"margin-left":"0%"},motionDelay);
								$(".kv .carousel li").removeClass("active");
								$(".kv .carousel li").eq(kvIdx).addClass("active");
								setTimeout(function(){
									motionIng = false;
								},motionDelay);
							}
						}else if((direction == "right" || phase == "right"))
						{
							if (!motionIng)
							{
								motionIng = true;
								kvMax = $(".kv .kv-inner > li").length - 1;

								$(".kv .kv-inner > li").eq(kvIdx).stop().animate({"margin-left":"100%"},motionDelay);
								kvIdx--;
								if (kvIdx < 0)
								{
									kvIdx = kvMax;
								}
								$(".kv .kv-inner > li").eq(kvIdx).css({"margin-left":"-100%"}).stop().animate({"margin-left":"0%"},motionDelay);
								$(".kv .carousel li").removeClass("active");
								$(".kv .carousel li").eq(kvIdx).addClass("active");
								setTimeout(function(){
									motionIng = false;
								},motionDelay);
							}
						}
					}
				}
			}
		});*/
	}else if (pageURL.indexOf("discography") != -1 && pageURL.indexOf("detail") != -1)
	{
		$(".album-detail .album-photo .slide-wrap > ul > li ul").swipe({
			swipeStatus:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
			},
			swipe:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
				if(distance > 50 && !popupShow)
				{
					if(direction == "left" || phase == "left" || direction == "right" || phase == "right")
					{
						if((direction == "left" || phase == "left"))
						{							
							if (!motionIng)
							{
								motionIng = true;
								albumPhoto = $(this).parent().index();

								var levelMax = $(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").length;
								if (levelMax == 1)
								{
									motionIng = false;
									return false;
								}
								$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).stop().animate({"margin-left":"-100%"},motionDelay);
								++albumPhoto_idx[albumPhoto];
								if (albumPhoto_idx[albumPhoto] == levelMax)
								{
									albumPhoto_idx[albumPhoto] = 0;
								}
								$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).css({"margin-left":"100%"}).stop().animate({"margin-left":"0%"},motionDelay);
								
								if ($(".wrapper").hasClass("the_dream_chapter-magic"))
								{

									$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").removeClass("relative");
									$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).addClass("relative");
									if ($(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).find(".contents-obj").hasClass("portrait"))
									{
										$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).find(".contents-obj img").css({"width":"100%","height":"auto"});
										//$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).find(".contents-obj img")
									}else{
										$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).find(".contents-obj img").css({"width":"","height":""});
									}
								}

								if ($(".wrapper").hasClass("the_dream_chapter-magic"))
								{
									sqStop();
								}
								setTimeout(function(){
									motionIng = false;
									if ($(".wrapper").hasClass("the_dream_chapter-magic"))
									{
										sqStart();
									}
								},motionDelay);
							}
						}else if((direction == "right" || phase == "right"))
						{
							if (!motionIng)
							{
								motionIng = true;
								albumPhoto = $(this).parent().index();

								var levelMax = $(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").length;
								if (levelMax == 1)
								{
									motionIng = false;
									return false;
								}

								$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).stop().animate({"margin-left":"100%"},motionDelay);
								--albumPhoto_idx[albumPhoto];
								if (albumPhoto_idx[albumPhoto] < 0)
								{
									albumPhoto_idx[albumPhoto] = levelMax-1;
								}
								$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).css({"margin-left":"-100%"}).stop().animate({"margin-left":"0%"},motionDelay);
								
								if ($(".wrapper").hasClass("the_dream_chapter-magic"))
								{
									$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").removeClass("relative");
									$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).addClass("relative");
									if ($(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).find(".contents-obj").hasClass("portrait"))
									{
										$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).find(".contents-obj img").css({"width":"100%","height":"auto"});
									}else{
										$(".album-detail .album-photo .slide-wrap > ul > li").eq(albumPhoto).find("li").eq(albumPhoto_idx[albumPhoto]).find(".contents-obj img").css({"width":"","height":""});
									}
								}

								if ($(".wrapper").hasClass("the_dream_chapter-magic"))
								{
									sqStop();
								}
								setTimeout(function(){
									motionIng = false;
									if ($(".wrapper").hasClass("the_dream_chapter-magic"))
									{
										sqStart();
									}
								},motionDelay);
							}
						}
					}
				}
			},allowPageScroll:"vertical"
		});
		
		$(".the_dream_chapter-magic .album-detail .album-video.slide .slide_video").swipe({
			swipeStatus:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
			},
			swipe:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
				if($("body").hasClass("device") && distance > 50 && !popupShow)
				{
					if(direction == "left" || phase == "left" || direction == "right" || phase == "right")
					{
						if((direction == "left" || phase == "left"))
						{							
							if (!motionIng)
							{
								motionIng = true;
								
								changeMusicVideo(100);
								$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap video").each(function(){
									if (!this.paused)
									{
										$(this).parent().find("button").removeClass("btn-pause");
										this.pause();
										this.currentTime = 0;
									}			
								});
								if ($(this).hasClass("magic_island") && $(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide li").length > 1)
								{
									var maxLength = $(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide li").length-1;
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul li").eq(magicVideo[0]).animate({"margin-left":"-100%"}, motionDelay);
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide li").eq(magicVideo[0]).animate({"opacity":"0"}, motionDelay);
									magicVideo[0]++;
									if (magicVideo[0] > maxLength)
									{
										magicVideo[0] = 0;
									}
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul li").eq(magicVideo[0]).css({"margin-left":"100%"}).animate({"margin-left":"0%"}, motionDelay);
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide li").eq(magicVideo[0]).animate({"opacity":"1"}, motionDelay);
								}else if ($(this).hasClass("angel_or_devil") && $(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul.contents-sub-slide li").length > 1)
								{
									var maxLength = $(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul.contents-sub-slide li").length-1;
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul li").eq(magicVideo[1]).animate({"margin-left":"-100%"}, motionDelay);
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul.contents-sub-slide li").eq(magicVideo[1]).animate({"opacity":"0"}, motionDelay);
									magicVideo[1]++;
									if (magicVideo[1] > maxLength)
									{
										magicVideo[1] = 0;
									}
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul li").eq(magicVideo[1]).css({"margin-left":"100%"}).animate({"margin-left":"0%"}, motionDelay);
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul.contents-sub-slide li").eq(magicVideo[1]).animate({"opacity":"1"}, motionDelay);
								}								

								setTimeout(function(){
									motionIng = false;
								},motionDelay);
							}
						}else if((direction == "right" || phase == "right"))
						{
							if (!motionIng)
							{
								motionIng = true;
								changeMusicVideo(100);
								$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap video").each(function(){
									if (!this.paused)
									{
										$(this).parent().find("button").removeClass("btn-pause");
										this.pause();
										this.currentTime = 0;
									}			
								});
								if ($(this).hasClass("magic_island") && $(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide li").length > 1)
								{
									var maxLength = $(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide li").length-1;
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul li").eq(magicVideo[0]).animate({"margin-left":"100%"}, motionDelay);
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide li").eq(magicVideo[0]).animate({"opacity":"0"}, motionDelay);

									magicVideo[0]--;
									if (magicVideo[0] < 0)
									{
										magicVideo[0] = maxLength;
									}
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul li").eq(magicVideo[0]).css({"margin-left":"-100%"}).animate({"margin-left":"0%"}, motionDelay);
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul.contents-sub-slide li").eq(magicVideo[0]).animate({"opacity":"1"}, motionDelay);
								}else if ($(this).hasClass("angel_or_devil") && $(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul.contents-sub-slide li").length > 1)
								{
									var maxLength = $(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul.contents-sub-slide li").length-1;
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul li").eq(magicVideo[1]).animate({"margin-left":"100%"}, motionDelay);
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul.contents-sub-slide li").eq(magicVideo[1]).animate({"opacity":"0"}, motionDelay);
									magicVideo[1]--;
									if (magicVideo[1] < 0)
									{
										magicVideo[1] = maxLength;
									}
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul li").eq(magicVideo[1]).css({"margin-left":"-100%"}).animate({"margin-left":"0%"}, motionDelay);
									$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul.contents-sub-slide li").eq(magicVideo[1]).animate({"opacity":"1"}, motionDelay);
								}

								setTimeout(function(){
									motionIng = false;
								},motionDelay);
							}							
						}
					}
				}
			},allowPageScroll:"vertical"
		});
	}	
});

function popupClose_position()
{
	if (viewportWidth() < 769)
	{	
		$(".kv .kv-inner li").each(function(){
			if ($(this).find(".kv-popup").css("display") == "block")
			{
				var titleTop = 0;
				if ($("body").hasClass("device"))
				{
					titleTop = $(this).find(".kv-popup h2").offset().top + parseInt($(this).find(".kv-popup h2").css("padding-top")) + $(".wrapper-top").scrollTop();
				}else{
					titleTop = $(this).find(".kv-popup h2").offset().top + parseInt($(this).find(".kv-popup h2").css("padding-top")) + $(".wrapper").scrollTop();
				}
				
				var btnHeight = $(this).find(".kv-popup .btn-close").outerHeight(true);
				var gnbTop = $("header").outerHeight();

				var mTop = (titleTop - gnbTop) / 2 - (btnHeight / 2);
				
				$(this).find(".kv-popup .btn-close").css({"top":mTop + "px"});
			}
		});
	}else{
		$(".kv .kv-inner .kv-popup .btn-close").css({"top":"0px"});
	}
}

function allClear()
{
	if (pageType == "txt" || pageType == "bts" || pageType == "leehyun" || pageURL.length <= 5)
	{
		$(".kv .kv-inner li").each(function(){
			if ($(this).find(".kv-popup").css("display") == "table" || $(this).find(".kv-popup").css("display") == "block")
			{
				$(this).find(".kv-popup").animate({"opacity":"0"},motionDelay,function()
				{
					$(this).css({"display":"none"});
					popupShow = false;
				});
			}
		});
		
	}else if (pageURL.indexOf("schedule") != -1)
	{
		$(".calendar table tbody tr").each(function(){
			if ($(this).hasClass("active"))
			{
				if (viewportWidth() < 769)
				{
					$(".calendar .popup-dimmed").animate({"opacity":0},300,function(){
						$(this).css({"display":"none"})
					});
					$(this).find(".popup").animate({"opacity":0},300,function(){
						$(this).css({"bottom":"100%"});
						$(".calendar tr").removeClass("active");
					});
				}else{
					$(this).find(".popup").animate({"opacity":0},300,function(){
						$(this).css({"bottom":"100%"});
						$(".calendar tr").removeClass("active");
					});
				}
			}
		});
	}

	if ($(".gnb").hasClass("active"))
	{
		
		$("body").css({"position":"","margin-top":""});
		$("html, body").animate({"scrollTop":fixedTop + "px"},0);
		$("header").css({"position":""});
		$(".gnb").removeClass("active");
		$("nav").stop().animate({"opacity":"0"},motionDelay,function()
		{					
			$(this).css({"display":"none"});				
		});
		
	}

	if ($(".lang_opt").hasClass("active"))
	{
		$(".lang_opt ul").animate({"opacity":"0"},motionDelay,function(){
			$(".lang_opt").removeClass("active");
		});
	}
	if ($(".footer_wrap .family_inner button").hasClass("active"))
	{
		$(".footer_wrap .family_inner ul").animate({"opacity":"0"},motionDelay,function()
		{
			$(this).css({"display":"none"});
			$(".footer_wrap .family_inner button").removeClass("active");
		});
	}
}

function mainKV_Swipe()
{
	$(".kv .kv-inner").swipe({
		swipeStatus:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
			
		},
		swipe:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
			swipeAble = true;
			if(distance > 50 && !popupShow)
			{
				if(direction == "left" || phase == "left" || direction == "right" || phase == "right")
				{
					if((direction == "left" || phase == "left"))
					{
						$(".kv .btn-next").trigger("click");
					}else if((direction == "right" || phase == "right"))
					{
						$(".kv .btn-prev").trigger("click");
					}
				}
			}
			swipeAble = false;
		},
		allowPageScroll:"vertical"
	});
}

var swipeAble = false;
var kvMax = 0;
var kvIdx = 0;
var popupShow = false;
var videoIndex = 16;

var musicVideo01;
var musicVideo02;
var musicVideo03;
var musicVideo04;
var musicVideo05;
var musicVideo06;
var musicVideo07;
var musicVideo08;
var musicVideo09;
var musicVideo10;
var musicVideo11;
var musicVideo12;
var musicVideo13;
var musicVideo14;
var musicVideo15;
var musicVideo16;
var musicVideo17;
var musicVideo18;
var musicVideo19;
var musicVideo20;
var ytFunction;
function youtubeAPI_Load()
{
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function changeMusicVideo(t) {
	//console.log("changeMusicVideo : " + t);
	if (musicVideo01 && ytReady[0])
	{
		if (musicVideo01.getPlayerState()>0)
		{
			musicVideo01.pauseVideo();
			musicVideo01.stopVideo();
		}
	}
	if (musicVideo02 && ytReady[1])
	{
		if (musicVideo02.getPlayerState()>0)
		{
			musicVideo02.pauseVideo();
			musicVideo02.stopVideo();
		}
	}
	if (musicVideo03 && ytReady[2])
	{
		if (musicVideo03.getPlayerState()>0)
		{
			musicVideo03.pauseVideo();
			musicVideo03.stopVideo();
		}
	}
	if (musicVideo04 && ytReady[3])
	{
		if (musicVideo04.getPlayerState()>0)
		{
			musicVideo04.pauseVideo();
			musicVideo04.stopVideo();
		}
	}
	if (musicVideo05 && ytReady[4])
	{
		if (musicVideo05.getPlayerState()>0)
		{
			musicVideo05.pauseVideo();
			musicVideo05.stopVideo();
		}
	}
	if (musicVideo06 && ytReady[5])
	{
		if (musicVideo06.getPlayerState()>0)
		{
			musicVideo06.pauseVideo();
			musicVideo06.stopVideo();
		}
	}
	if (musicVideo07 && ytReady[6])
	{
		if (musicVideo07.getPlayerState()>0)
		{
			musicVideo07.pauseVideo();
			musicVideo07.stopVideo();
		}
	}
	if (musicVideo08 && ytReady[7])
	{
		if (musicVideo08.getPlayerState()>0)
		{
			musicVideo08.pauseVideo();
			musicVideo08.stopVideo();
		}
	}
	if (musicVideo09 && ytReady[8])
	{
		if (musicVideo09.getPlayerState()>0)
		{
			musicVideo09.pauseVideo();
			musicVideo09.stopVideo();
		}
	}
	if (musicVideo10 && ytReady[9])
	{
		if (musicVideo10.getPlayerState()>0)
		{
			musicVideo10.pauseVideo();
			musicVideo10.stopVideo();
		}
	}

	if (musicVideo11 && ytReady[10])
	{
		if (musicVideo11.getPlayerState()>0)
		{
			musicVideo11.pauseVideo();
			musicVideo11.stopVideo();
		}
	}

	if (musicVideo12 && ytReady[11])
	{
		if (musicVideo12.getPlayerState()>0)
		{
			musicVideo12.pauseVideo();
			musicVideo12.stopVideo();
		}
	}

	if (musicVideo13 && ytReady[12])
	{
		if (musicVideo13.getPlayerState()>0)
		{
			musicVideo13.pauseVideo();
			musicVideo13.stopVideo();
		}
	}

	if (musicVideo14 && ytReady[13])
	{
		if (musicVideo14.getPlayerState()>0)
		{
			musicVideo14.pauseVideo();
			musicVideo14.stopVideo();
		}
	}

	if (musicVideo15 && ytReady[14])
	{
		if (musicVideo15.getPlayerState()>0)
		{
			musicVideo15.pauseVideo();
			musicVideo15.stopVideo();
		}
	}

	if (musicVideo16 && ytReady[15])
	{
		if (musicVideo16.getPlayerState()>0)
		{
			musicVideo16.pauseVideo();
			musicVideo16.stopVideo();
		}
	}

	if (musicVideo17 && ytReady[16])
	{
		if (musicVideo17.getPlayerState()>0)
		{
			musicVideo17.pauseVideo();
			musicVideo17.stopVideo();
		}
	}

	if (musicVideo18 && ytReady[17])
	{
		if (musicVideo18.getPlayerState()>0)
		{
			musicVideo18.pauseVideo();
			musicVideo18.stopVideo();
		}
	}

	if (musicVideo19 && ytReady[18])
	{
		if (musicVideo19.getPlayerState()>0)
		{
			musicVideo19.pauseVideo();
			musicVideo19.stopVideo();
		}
	}

	if (musicVideo20 && ytReady[19])
	{
		if (musicVideo20.getPlayerState()>0)
		{
			musicVideo20.pauseVideo();
			musicVideo20.stopVideo();
		}
	}

	if (ytReady[t])
	{
		if ($(".wrapper").hasClass("the_dream_chapter-magic"))
		{
			if (t > 5)
			{
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul li").eq(t-6).find(".btn-play").stop().animate({"opacity":0},motionDelay,function(){
					$(this).css({"display":"none"});
				});
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.angel_or_devil ul li").eq(t-6).find("iframe").css({"display":"block"});
			}else if (t == 5)
			{
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul li").eq(5).find(".btn-play").stop().animate({"opacity":0},motionDelay,function(){
					$(this).css({"display":"none"});
				});
				$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap > ul > li.slide_video.magic_island ul li").eq(5).find("iframe").css({"display":"block"});
			}else{
				$(".album-detail .album-video .slide-wrap > ul > li").eq(t).find(".btn-play").stop().animate({"opacity":0},motionDelay,function(){
					$(this).css({"display":"none"});
				});
				$(".album-detail .album-video .slide-wrap > ul > li").eq(t).find("iframe").css({"display":"block"});
			}
			
		}else{
			$(".album-detail .album-video .slide-wrap > ul > li").eq(t).find(".btn-play").stop().animate({"opacity":0},motionDelay,function(){
				$(this).css({"display":"none"});
			});
			$(".album-detail .album-video .slide-wrap > ul > li").eq(t).find("iframe").css({"display":"block"});
		}

		switch (t)
		{
			case 0:
			{
				musicVideo01.playVideo();
				break;
			}
			case 1:
			{
				musicVideo02.playVideo();
				break;
			}
			case 2:
			{
				musicVideo03.playVideo();
				break;
			}
			case 3:
			{	
				musicVideo04.playVideo();
				break;
			}		
			case 4:
			{	
				musicVideo05.playVideo();
				break;
			}		
			case 5:
			{	
				musicVideo06.playVideo();
				break;
			}
			case 6:
			{	
				musicVideo07.playVideo();
				break;
			}	
			case 7:
			{	
				musicVideo08.playVideo();
				break;
			}	
			case 8:
			{	
				musicVideo09.playVideo();
				break;
			}	
			case 9:
			{	
				musicVideo10.playVideo();
				break;
			}case 10:
			{	
				musicVideo11.playVideo();
				break;
			}	
			case 11:
			{	
				musicVideo12.playVideo();
				break;
			}	
			case 12:
			{	
				musicVideo13.playVideo();
				break;
			}
			case 13:
			{	
				musicVideo14.playVideo();
				break;
			}
			case 14:
			{	
				musicVideo15.playVideo();
				break;
			}	
			case 15:
			{	
				musicVideo16.playVideo();
				break;
			}	
			case 16:
			{	
				musicVideo17.playVideo();
				break;
			}	
			case 17:
			{	
				musicVideo18.playVideo();
				break;
			}	
			case 18:
			{	
				musicVideo19.playVideo();
				break;
			}	
			case 19:
			{	
				musicVideo20.playVideo();
				break;
			}	
		}
	}
}
var videoId = new Array();
function onYouTubeIframeAPIReady() {
	$(".album-detail .album-video .slide-wrap > ul > li").each(function(){
		videoId.push($(this).find(".btn-play").attr("data-src"));
	});

	if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 1)
	{
		musicVideo01 = new YT.Player('music-video01', {
			height: '608',
			width: '1080',
			videoId: videoId[0],
			playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
			events: {
				'onReady': onPlayerReady01,
	            'onStateChange': onPlayerStateChange01
			}
		});
	}
	if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 2)
	{
		musicVideo02 = new YT.Player('music-video02', {
			height: '608',
			width: '1080',
			videoId: videoId[1],
			playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
			events: {
				'onReady': onPlayerReady02,
	            'onStateChange': onPlayerStateChange02
			}
		});
	}
	if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 3)
	{
		musicVideo03 = new YT.Player('music-video03', {
			height: '608',
			width: '1080',
			videoId: videoId[2],
			playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
			events: {
				'onReady': onPlayerReady03,
	            'onStateChange': onPlayerStateChange03
			}
		});
	}
	if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 4)
	{

		musicVideo04 = new YT.Player('music-video04', {
			height: '608',
			width: '1080',
			videoId: videoId[3],
			playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
			events: {
				'onReady': onPlayerReady04,
	            'onStateChange': onPlayerStateChange04
			}
		});
	}
	if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 5)
	{

		musicVideo05 = new YT.Player('music-video05', {
			height: '608',
			width: '1080',
			videoId: videoId[4],
			playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
			events: {
				'onReady': onPlayerReady05,
	            'onStateChange': onPlayerStateChange05
			}
		});
	}
	if ($(".wrapper").hasClass("the_dream_chapter-magic"))
	{
		musicVideo06 = document.getElementById("music-video06");
		if (musicVideo06 !== false)
		{
			var vID = $("#music-video06").parent().find("button").attr("data-src");
			musicVideo06 = new YT.Player('music-video06', {
				height: '608',
				width: '1080',
				videoId: vID,
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady06,
					'onStateChange': onPlayerStateChange06
				}
			});
		}

		musicVideo07 = document.getElementById("music-video07");
		if (musicVideo07 !== false)
		{
			var vID = $("#music-video07").parent().find("button").attr("data-src");
			musicVideo07 = new YT.Player('music-video07', {
				height: '608',
				width: '1080',
				videoId: vID,
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady07,
					'onStateChange': onPlayerStateChange07
				}
			});
		}

		musicVideo08 = document.getElementById("music-video08");
		if (musicVideo08 !== false)
		{
			var vID = $("#music-video08").parent().find("button").attr("data-src");
			musicVideo08 = new YT.Player('music-video08', {
				height: '608',
				width: '1080',
				videoId: vID,
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady08,
					'onStateChange': onPlayerStateChange08
				}
			});
		}

		musicVideo09 = document.getElementById("music-video09");
		if (musicVideo09 !== false)
		{
			var vID = $("#music-video09").parent().find("button").attr("data-src");
			musicVideo09 = new YT.Player('music-video09', {
				height: '608',
				width: '1080',
				videoId: vID,
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady09,
					'onStateChange': onPlayerStateChange09
				}
			});
		}

		musicVideo10 = document.getElementById("music-video10");
		if (musicVideo10 !== false)
		{
			var vID = $("#music-video10").parent().find("button").attr("data-src");
			musicVideo10 = new YT.Player('music-video10', {
				height: '608',
				width: '1080',
				videoId: vID,
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady10,
					'onStateChange': onPlayerStateChange10
				}
			});
		}

		musicVideo11 = document.getElementById("music-video11");
		if (musicVideo11 !== false)
		{
			var vID = $("#music-video11").parent().find("button").attr("data-src");
			musicVideo11 = new YT.Player('music-video11', {
				height: '608',
				width: '1080',
				videoId: vID,
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady11,
					'onStateChange': onPlayerStateChange11
				}
			});
		}

		musicVideo12 = document.getElementById("music-video12");
		if (musicVideo12 !== false)
		{
			var vID = $("#music-video12").parent().find("button").attr("data-src");
			musicVideo12 = new YT.Player('music-video12', {
				height: '608',
				width: '1080',
				videoId: vID,
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady12,
					'onStateChange': onPlayerStateChange12
				}
			});
		}
	}else if ($(".wrapper").hasClass("the_dream_chapter-eternity"))
	{
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 6)
		{

			musicVideo06 = new YT.Player('music-video06', {
				height: '608',
				width: '1080',
				videoId: videoId[5],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady06,
					'onStateChange': onPlayerStateChange06
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 7)
		{

			musicVideo07 = new YT.Player('music-video07', {
				height: '608',
				width: '1080',
				videoId: videoId[6],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady07,
					'onStateChange': onPlayerStateChange07
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 8)
		{

			musicVideo08 = new YT.Player('music-video08', {
				height: '608',
				width: '1080',
				videoId: videoId[7],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady08,
					'onStateChange': onPlayerStateChange08
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 9)
		{

			musicVideo09 = new YT.Player('music-video09', {
				height: '608',
				width: '1080',
				videoId: videoId[8],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady09,
					'onStateChange': onPlayerStateChange09
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 10)
		{

			musicVideo10 = new YT.Player('music-video10', {
				height: '608',
				width: '1080',
				videoId: videoId[9],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady10,
					'onStateChange': onPlayerStateChange10
				}
			});
		}

		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 11)
		{

			musicVideo11 = new YT.Player('music-video11', {
				height: '608',
				width: '1080',
				videoId: videoId[10],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady11,
					'onStateChange': onPlayerStateChange11
				}
			});
		}

		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 12)
		{

			musicVideo12 = new YT.Player('music-video12', {
				height: '608',
				width: '1080',
				videoId: videoId[11],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady12,
					'onStateChange': onPlayerStateChange12
				}
			});
		}

		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 13)
		{

			musicVideo13 = new YT.Player('music-video13', {
				height: '608',
				width: '1080',
				videoId: videoId[12],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady13,
					'onStateChange': onPlayerStateChange13
				}
			});
		}

		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 14)
		{

			musicVideo14 = new YT.Player('music-video14', {
				height: '608',
				width: '1080',
				videoId: videoId[13],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady14,
					'onStateChange': onPlayerStateChange14
				}
			});
		}
	}else{
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 6)
		{

			musicVideo06 = new YT.Player('music-video06', {
				height: '608',
				width: '1080',
				videoId: videoId[5],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady06,
					'onStateChange': onPlayerStateChange06
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 7)
		{

			musicVideo07 = new YT.Player('music-video07', {
				height: '608',
				width: '1080',
				videoId: videoId[6],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady07,
					'onStateChange': onPlayerStateChange07
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 8)
		{

			musicVideo08 = new YT.Player('music-video08', {
				height: '608',
				width: '1080',
				videoId: videoId[7],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady08,
					'onStateChange': onPlayerStateChange08
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 9)
		{

			musicVideo09 = new YT.Player('music-video09', {
				height: '608',
				width: '1080',
				videoId: videoId[8],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady09,
					'onStateChange': onPlayerStateChange09
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 10)
		{

			musicVideo10 = new YT.Player('music-video10', {
				height: '608',
				width: '1080',
				videoId: videoId[9],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady10,
					'onStateChange': onPlayerStateChange10
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 11)
		{

			musicVideo11 = new YT.Player('music-video11', {
				height: '608',
				width: '1080',
				videoId: videoId[10],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady11,
					'onStateChange': onPlayerStateChange11
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 12)
		{

			musicVideo12 = new YT.Player('music-video12', {
				height: '608',
				width: '1080',
				videoId: videoId[11],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady12,
					'onStateChange': onPlayerStateChange12
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 13)
		{

			musicVideo13 = new YT.Player('music-video13', {
				height: '608',
				width: '1080',
				videoId: videoId[12],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady13,
					'onStateChange': onPlayerStateChange13
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 14)
		{

			musicVideo14 = new YT.Player('music-video14', {
				height: '608',
				width: '1080',
				videoId: videoId[13],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady14,
					'onStateChange': onPlayerStateChange14
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 15)
		{

			musicVideo15 = new YT.Player('music-video15', {
				height: '608',
				width: '1080',
				videoId: videoId[14],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady15,
					'onStateChange': onPlayerStateChange15
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 16)
		{

			musicVideo16 = new YT.Player('music-video16', {
				height: '608',
				width: '1080',
				videoId: videoId[15],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady16,
					'onStateChange': onPlayerStateChange16
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 17)
		{

			musicVideo17 = new YT.Player('music-video17', {
				height: '608',
				width: '1080',
				videoId: videoId[16],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady17,
					'onStateChange': onPlayerStateChange17
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 18)
		{

			musicVideo18 = new YT.Player('music-video18', {
				height: '608',
				width: '1080',
				videoId: videoId[17],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady18,
					'onStateChange': onPlayerStateChange18
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 19)
		{

			musicVideo10 = new YT.Player('music-video19', {
				height: '608',
				width: '1080',
				videoId: videoId[18],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady19,
					'onStateChange': onPlayerStateChange19
				}
			});
		}
		if ($(".album-detail .album-video .slide-wrap > ul > li").length >= 20)
		{

			musicVideo10 = new YT.Player('music-video20', {
				height: '608',
				width: '1080',
				videoId: videoId[19],
				playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque','rel':0 },
				events: {
					'onReady': onPlayerReady20,
					'onStateChange': onPlayerStateChange20
				}
			});
		}
	}
	
}


function onPlayerStateChange01(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(0);
	}
}

function onPlayerStateChange02(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(1);
	}
}

function onPlayerStateChange03(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(2);
	}
}

function onPlayerStateChange04(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(3);
	}
}

function onPlayerStateChange05(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(4);
	}
}

function onPlayerStateChange06(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(5);
	}
}

function onPlayerStateChange07(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(6);
	}
}

function onPlayerStateChange08(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(7);
	}
}

function onPlayerStateChange09(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(8);
	}
}

function onPlayerStateChange10(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(9);
	}
}

function onPlayerStateChange11(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(10);
	}
}

function onPlayerStateChange12(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(11);
	}
}

function onPlayerStateChange13(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(12);
	}
}

function onPlayerStateChange14(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(13);
	}
}

function onPlayerStateChange15(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(14);
	}
}

function onPlayerStateChange16(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(15);
	}
}

function onPlayerStateChange17(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(16);
	}
}

function onPlayerStateChange18(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(17);
	}
}

function onPlayerStateChange19(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(18);
	}
}

function onPlayerStateChange20(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		ytPlay_control(19);
	}
}


var ytReady = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function onPlayerReady01(event) {
	ytReady[0] = 1;
}
function onPlayerReady02(event) {
	ytReady[1] = 1;
}
function onPlayerReady03(event) {
	ytReady[2] = 1;
}
function onPlayerReady04(event) {
	ytReady[3] = 1;
}
function onPlayerReady05(event) {
	ytReady[4] = 1;
}
function onPlayerReady06(event) {
	ytReady[5] = 1;
}
function onPlayerReady07(event) {
	ytReady[6] = 1;
}
function onPlayerReady08(event) {
	ytReady[7] = 1;
}
function onPlayerReady09(event) {
	ytReady[8] = 1;
}
function onPlayerReady10(event) {
	ytReady[9] = 1;
}
function onPlayerReady11(event) {
	ytReady[10] = 1;
}
function onPlayerReady12(event) {
	ytReady[11] = 1;
}
function onPlayerReady13(event) {
	ytReady[12] = 1;
}
function onPlayerReady14(event) {
	ytReady[13] = 1;
}
function onPlayerReady15(event) {
	ytReady[14] = 1;
}
function onPlayerReady16(event) {
	ytReady[15] = 1;
}
function onPlayerReady17(event) {
	ytReady[16] = 1;
}
function onPlayerReady18(event) {
	ytReady[17] = 1;
}
function onPlayerReady19(event) {
	ytReady[18] = 1;
}
function onPlayerReady20(event) {
	ytReady[19] = 1;
}


var playID;
function ytPlay_control(p)
{
	if ($(".wrapper").hasClass("the_dream_chapter-magic"))
	{
		$(".the_dream_chapter-magic .album-detail .album-video .slide-wrap video").each(function(){
			if (!this.paused)
			{
				$(this).parent().find("button").removeClass("btn-pause");
				this.pause();
				this.currentTime = 0;
			}			
		});
		$(".album-detail .album-video .slide-wrap > ul > li .btn-play img").css({"opacity":""});
		$(".album-detail .album-video .slide-wrap > ul > li .btn-play").removeClass("btn-pause");
	}
    
	if (playID != p && playID >= 0)
	{
		switch (playID)
		{
			case 0:
			{
				musicVideo01.pauseVideo();
				musicVideo01.stopVideo();
				break;
			}		
			case 1:
			{
				musicVideo02.pauseVideo();
				musicVideo02.stopVideo();
				break;
			}		
			case 2:
			{
				musicVideo03.pauseVideo();
				musicVideo03.stopVideo();
				break;
			}		
			case 3:
			{
				musicVideo04.pauseVideo();
				musicVideo04.stopVideo();
				break;
			}		
			case 4:
			{
				musicVideo05.pauseVideo();
				musicVideo05.stopVideo();
				break;
			}		
			case 5:
			{
				musicVideo06.pauseVideo();
				musicVideo06.stopVideo();
				break;
			}		
			case 6:
			{
				musicVideo07.pauseVideo();
				musicVideo07.stopVideo();
				break;
			}		
			case 7:
			{
				musicVideo08.pauseVideo();
				musicVideo08.stopVideo();
				break;
			}		
			case 8:
			{
				musicVideo09.pauseVideo();
				musicVideo09.stopVideo();
				break;
			}		
			case 9:
			{
				musicVideo10.pauseVideo();
				musicVideo10.stopVideo();
				break;
			}
			case 10:
			{
				musicVideo11.pauseVideo();
				musicVideo11.stopVideo();
				break;
			}
			case 11:
			{
				musicVideo12.pauseVideo();
				musicVideo12.stopVideo();
				break;
			}
			case 12:
			{
				musicVideo13.pauseVideo();
				musicVideo13.stopVideo();
				break;
			}
			case 13:
			{
				musicVideo14.pauseVideo();
				musicVideo14.stopVideo();
				break;
			}
			case 14:
			{
				musicVideo15.pauseVideo();
				musicVideo15.stopVideo();
				break;
			}
			case 15:
			{
				musicVideo16.pauseVideo();
				musicVideo16.stopVideo();
				break;
			}
			case 16:
			{
				musicVideo17.pauseVideo();
				musicVideo17.stopVideo();
				break;
			}
			case 17:
			{
				musicVideo18.pauseVideo();
				musicVideo18.stopVideo();
				break;
			}
			case 18:
			{
				musicVideo19.pauseVideo();
				musicVideo19.stopVideo();
				break;
			}
			case 19:
			{
				musicVideo20.pauseVideo();
				musicVideo20.stopVideo();
				break;
			}
		}
	}
	playID = p;
}


function languageAlt()
{
	if (pageURL.indexOf("kor") != -1)
	{
		if ($(".gnb").hasClass("active"))
		{
			$(".gnb p").text("메뉴 닫기");
		}else{
			$(".gnb p").text("메뉴 열기");
		}
		$(".nav-txt .valign li").last().children("a").attr('title','INTRODUCTION : 새 창에서 열기');
	}else if (pageURL.indexOf("eng") != -1)
	{
		if ($(".gnb").hasClass("active"))
		{
			$(".gnb p").text("Close the Menu");
		}else{
			$(".gnb p").text("Open the Menu");
		}
		$(".nav-txt li").last().children("a").attr('title','INTRODUCTION : Open in a New Window');
	}else if (pageURL.indexOf("jpn") != -1)
	{
		if ($(".gnb").hasClass("active"))
		{
			$(".gnb p").text("メニュー画面を閉じる");
		}else{
			$(".gnb p").text("メニュー画面を開く");
		}
		$(".nav-txt .valign li").last().children("a").attr('title','INTRODUCTION : 新しいウィンドウで開く');
	}else if (pageURL.indexOf("chn") != -1)
	{
		if ($(".gnb").hasClass("active"))
		{
			$(".gnb p").text("关闭菜单");
		}else{
			$(".gnb p").text("打开菜单");
		}
		$(".nav-txt .valign li").last().children("a").attr('title','INTRODUCTION : 在新窗口打开');
	}
}