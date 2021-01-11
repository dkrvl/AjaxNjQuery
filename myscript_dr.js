/*
==============================================================
@file Name: myscript.js
@Author: Dipak Raval
@Pupose: Demo test for jQuery Functions
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


@AJAX
// $.ajax(); << core
// $.get(); << core
// $.post(); << core
// $.getScript(); << core
// $.getJSON(); << core
// $('').load(); << core


==============================================================
*/

(function() {
	$.noConflict();
	jQuery(document).ready(function($) {
		var article = $("article h1");
		$(article).click(function() {
			if ($(this).parent().hasClass("active")) {
				$(this).parent().removeClass("active");
			} else {
				$("article").removeClass("active");
				$(this).parent().addClass("active");
			}
			$(this).next("div").toggleClass("activeDiv");
		});

		$("section h2").click(function() {
			$(this).toggleClass('active');
			$(this).next('ul').toggleClass('show');
		});
	});
}());