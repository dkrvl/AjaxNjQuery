/*
==============================================================
@file Name: myscript.js
@Author: Dipak Raval
@Pupose: Demo test for jQuery API Documents
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
	Object.getOwnPropertyNames(jQuery).filter(function(p) {
		return typeof jQuery[p] === 'function';
	});
	/***********************************************************
	@function Name: getAttributes
	@Type: JQuery Plugin
	@Return: Array of Object (element's attibute name as object key
	AND attributes value as object value)
	/***********************************************************/
	$.fn.getAttributes = function() {
		var attributes = {};
		if (this.length) {
			$.each(this[0].attributes, function(index, attr) {
				attributes[attr.name] = attr.value;
			});
		}
		return attributes;
	};
	/***********************************************************
	@function Name: xpathEvaluate
	@Type: JQuery Plugin
	@Return: xPath of element
	/***********************************************************/
	$.fn.xpathEvaluate = function(xpathExpression) {
		// NOTE: vars not declared local for debug purposes
		$this = this.first(); // Don't make me deal with multiples before coffee

		// Evaluate xpath and retrieve matching nodes
		xpathResult = this[0].evaluate(xpathExpression, this[0], null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

		result = [];
		while (elem = xpathResult.iterateNext()) {
			result.push(elem);
		}

		$result = jQuery([]).pushStack(result);
		return $result;
	}

}());

/***********************************************************
@@@@@ DOCUMENT READY START HERE @@@@@@
/***********************************************************/
jQuery(document).ready(function($) {
	$("a").click(function(e) {
		e.preventDefault();
	});
	/***********************************************************
	@@@ Top Header Links Code
	**********************************************************/
	$("#one").height($(document).height() - 120);
	$("#about").click(function(ev) {
		ev.preventDefault();
		$("#xmlContainer").html(function() {
			var aboutText = '<h1 style="color: white;">' +
			'Project: JQuery API document</h1>' +
			'<h2 style="color: white;">' +
			'By:Dipak Raval</h2>';
			return aboutText;
		});
	});
	$("#home").click(function(ev) {
		ev.preventDefault();
		var jqsrc = "https://api.jquery.com/all-selector/";
		var oneText = $('<iframe></iframe>');
		oneText.attr('src', 'jqsrc').css({
			"overflow": "hidden",
			"overflow-x": "hidden",
			"overflow-y": "hidden",
			"height": "100%",
			"width": "100%",
			"position": "absolute",
			"top": "0px",
			"left": "0px",
			"right": "0px",
			"bottom": "0px",
			"border": "none"
		});
		$("#xmlContainer").html(function() {
			return oneText;
		});
	});

	/***********************************************************
	@@@ $("section ul li a") mouseenter mouseleave link clicks
	code for sidebar links
	**********************************************************/
	var thisText = "";
	$("section ul li a").mouseenter(function() {
		thisText = $(this).html();
		var newSpan = $("<span id='anchorText'></span>");
		$(this).html("");
		$(newSpan).appendTo(this);
		$(newSpan).html(thisText)
	});
	$("section ul li a").mouseleave(function() {
		$("span#anchorText").remove();
		$(this).html(thisText)
	});
	/*
	$("section ul li a").click(function(ev) {
	ev.preventDefault();
	$('#one iframe').remove();
	var src = $(this).attr("href");
		var oneText = $('<iframe></iframe>');
		oneText.attr('src', 'jqsrc').css({
			"overflow": "hidden",
			"overflow-x": "hidden",
			"overflow-y": "hidden",
			"height": "100%",
			"width": "100%",
			"position": "absolute",
			"top": "0px",
			"left": "0px",
			"right": "0px",
			"bottom": "0px",
			"border": "none"
		});
		$("#one").html(function() {
			return oneText;
		});
	});
	*/

	var article = $("article h1");
	$(article).click(function() {
		var artEle = $("article");
		artEle.children("section ul.show").removeClass('show');
		artEle.children("section h2.active").removeClass('active');
		artEle.children("div.activeDiv").removeClass('activeDiv');
		artEle.removeClass('active');
		if ($(this).parent().hasClass("active")) {
			alert("??");
			$(this).parent().removeClass("active");
		} else {
			$("article").removeClass("active");
			$(this).parent().addClass("active");
		}
		$(this).next("div").addClass("activeDiv");
	});
	$("section h2").click(function() {
		$(this).toggleClass('active');
		$(this).next('ul').toggleClass('show');
	});
	var anchors = $("section ul li a");
	var anchorsArr = [];
	for (var i = 0; i < anchors.length; i++) {
		var Ahref = $(anchors[i]).attr('href');
		var name = Ahref.slice(23, Ahref.length - 1)
		anchorsArr.push(name);
	}

	/***********************************************************
	@@@ Default AJAX call and XML render as HTML
	to #('#ONE') selector
	**********************************************************/
	$.ajax({
		url: 'xmlToHTML/_index.xml',
		type: 'GET',
		dataType: 'text',
		cache: false,
		success: function(result) {
			var data = $.parseHTML(result);
			var div = $(data).find("div.indexContent");
			$("#xmlContainer").append(data);
		}
	});

	/***********************************************************
	@@@ TEST AJAX CALL
	**********************************************************/
	$("#test").click(function() {
		$.ajax({
			url: 'xmlToHTML/clone.xml',
			type: 'GET',
			dataType: 'text',
			success: function(r) {
				var parsedXML = $.parseXML(r);
				S_XmlAJAXcall(parsedXML);
				console.log(r);
			}
		}).done(function() {
			console.log("done");
		});
	});
	/****************************************************
	// AJAX TEST END 
	*****************************************************/



	/***********************************************************
	@Description: for store last location of url in prevButton
	to go return at last point and AJAX Call
	/***********************************************************/
	$('.apiTitle .prevButton').click(function(event) {
		var curData = {
			html: $(".currentButton").html(),
			src: $(".currentButton").attr('href')
		}
		console.log(curData);
		event.preventDefault();
		var src = $(this).attr('href');
		if (src == '#' || src == '') { // if src null
			$.ajax({
				url: 'xmlToHTML/_index.xml',
				type: 'GET',
				dataType: 'text',
				cache: false,
				success: function(result) {
					var data = $.parseHTML(result);
					var div = $(data).find("div.indexContent");
					$("#xmlContainer").html(data);
				}
			});
		} else { // ELSE src defined
			var prevfileName = src.slice(23, src.length - 1);
			var preXML = "xmlToHTML/" + prevfileName + ".xml ";
			$.ajax({
				url: preXML,
				cache: true,
				type: 'GET',
				dataType: 'xml',
				success: function(result) {
					S_XmlAJAXcall(result);
				}
			}).fail(function() {
				console.log("error");
			}).done(function() {
				// console.log(this);
				$(".apiTitle .prevButton").html(curData.html).attr('href', curData.src);
				$(".apiTitle .currentButton").attr('href', src);
				console.log($(".apiTitle .prevButton").html());
			});
		}
	});


	/***********************************************************
	@Description: SIDEBAR Navigation Links with AJAX CALL
	/***********************************************************/
	$("section ul li a").addClass('navigation');
	$("section a").click(function(ev) {
		ev.preventDefault();
		var prevSrc = "";
		var arrOflink = $("section a.activelink");
		$("section a").removeClass('activelink');
		$.each(arrOflink, function(index, val) {
			console.log('Index: ' + index);
			console.log('Val: ' + val)
				// if ($(arrOflink[index]).hasClass('activelink')) {
					var prevlink = $(arrOflink[index]).attr('href');
					var prevSrc = prevlink.slice(23, prevlink.length - 1);
					var jqUrl = "https://api.jquery.com/";
					$(".apiTitle .prevButton")
					.html(prevSrc).attr('href', jqUrl + prevSrc + '/')
					.addClass('navigation');
					console.log($(".apiTitle .prevButton"));
			// }
		});
		$(this).addClass('activelink');
		var src = $(this).attr('href');
		var fileName = src.slice(23, src.length - 1);
		var xmlUrl = "xmlToHTML/" + fileName + ".xml"
		$.ajax({
			url: xmlUrl,
			cache: true,
			type: 'GET',
			dataType: 'xml',
			success: function(success) {
				S_XmlAJAXcall(success, src);
			}
		}).fail(function() {
			console.log("error");
		}).done(function() {
			formateImgSrc();
		});


	});

	/***********************************************************
	@Description: HIGHLIGHT JS for highlight code and pre tag
	in html view area
	/***********************************************************/
	$('code').each(function(i, block) {
		SyntaxHighlighter.all();
		// $(this).addClass('lineNumbers');
		// hljs.lineNumbersBlock(block);
		// hljs.highlightBlock(block);
	});

});
/***********************************************************
@@@@@ DOCUMENT READY END HERE @@@@@@
/***********************************************************/



/***********************************************************
@function Name: S_XmlAJAXcall
@Type: Function
@Description: It created for Ajax call and Transform the xml
 to HTML format which get as ajax resutl dynamically ON the 
 click of SIDEBAR LINKS.
@Return: Ajax result as HTML to View Area here $("#ONE") selector
/***********************************************************/
function formateImgSrc() {
	var imgs = $("#content img");


}

function S_XmlAJAXcall(success, thisSrc) {
	$("#one main").remove();
	if ($("#one").find("#content") && $("#one").find("#content1")) {
		$("#one #content1").remove();
		$("#content").removeClass('slideInRight').addClass('slideInLeft');
		$("#content").attr('id', 'content1');
	}

	$("#one").addClass("active");
	var xmlData = $(success).find('entry');
	// XML DATA TO CONSOLE
	// console.log(xmlData)

	// ENTRY level attibute and values
	var attr = $(xmlData[0]).getAttributes();
	// console.log(attr);
	// var propNum = 0;
	// for (i in attr) {
	// 	propNum += 1;
	// 	console.log(propNum + " : " + i);
	// 	console.log($(attr).attr(i));
	// }
	// var entryElement = "<div id='" + entryTag + "''> </div>";

	var ey = xmlData[0].tagName;
	var eyType = $(attr).attr('type');
	var eyName = $(attr).attr('name');
	var eyReturn = $(attr).attr('return');
	var title = $(xmlData[0]).find('title').html();
	var pdeschtml = $(xmlData[0]).find('entry > desc').html();


	$(".apiTitle .currentButton")
	.html(title).attr('href', thisSrc);

	var spanh2 = $("<span/>").addClass('name').html(eyName);
	var returnlink = $("<a/>").attr('href', 'javascript:void(0)').html(eyReturn);
	var spanReturn = $("<span>Return: </span>").addClass('returns');
	returnlink.appendTo(spanReturn);

	var h2article = $("<h2/>").addClass('section-title');
	spanh2.appendTo(h2article);
	spanReturn.appendTo(h2article);

	var pDesc = $("<p/>").addClass('desc').html("<strong>Description: </strong>" + pdeschtml);


	var eyWrapper = $("<div/>").addClass('entry-wrapper');
	pDesc.appendTo(eyWrapper);

	var article = $("<article/>").attr('id', eyName).addClass(ey + ' ' + eyType);
	h2article.appendTo(article);
	eyWrapper.appendTo(article);

	var signatures = $(xmlData[0]).find('signature');
	var sl = signatures.length;
	var signUL = $("<ul/>").addClass('signatures');
	var i = 0;
	var j = 0;
	signUL.appendTo(eyWrapper);
	if (typeof(singnatures) != 'undefined') {

	} else {
		for (i; i < sl; i++) {
			var verdetail = $(signatures[i]).find('added').html();
			var signArg = $(signatures[i]).find('argument');
			var signArgLen = signArg.length;
			for (j; j < signArgLen; j++) {
				var signArgAttr = $(signArg[j]).getAttributes();
				var signArgName = $(signArgAttr).attr('name');
				var signArgType = $(signArgAttr).attr('type');
				var arguDesc = $(signArg[j]).find('desc').html();
				if (typeof(arguDesc) == 'undefined') {
					var signDesc = "<ul><li>" + "<div>" + signArgName + "</div>" +
					"<div><span>Type: </span>" + signArgType + "</div></li></ul>";
					// var signDesc = $("<ul/>");
					// $("<li>").appendTo(signDesc);
				} else {
					var signDesc = "<ul><li>" + "<div>" + signArgName + "</div>" +
					"<div><span>Type: </span>" + signArgType + "</div>" +
					"<div>" + arguDesc + "</div>" + "</li></ul>";
				}

				var signature = "<li class='signature'><h4 class='name'><span class='version-details'> version added:" +
				verdetail + "</span><a href='#" + eyName + "-" + signArgName +
				"' id='" + eyName + "-" + signArgName + "'>" + eyName + "-" + signArgName + "</a></h4>" +
				signDesc + "</li>";
				// $(signature).appendTo(".signatures");

			}

		}
		$(signature).appendTo(signUL);
		// if (typeof(singnature) == 'undefined') {

		// } else if ($(signUL).empty()) {
		// 	$(signUL).remove();
		// }
	}
	var eylongDesc = ($(xmlData[0]).find('longdesc')[0]).tagName;
	var eylongDescInner = $(xmlData[0]).find('longdesc').html();
	var longDesc = $("<div />");
	longDesc.addClass(eylongDesc);
	longDesc.attr('id', ey + '-' + eylongDesc)
	longDesc.html(eylongDescInner);
	longDesc.appendTo(eyWrapper);



	var eyContent = $("<div/>").addClass(ey + '-content');
	article.appendTo(eyContent);

	var hTitle = $("<h1/>").addClass(ey + '-title').html(title);

	var header = $("<header/>").addClass(ey + '-header');
	hTitle.appendTo(header);
	$("<hr />").appendTo(header);


	// content appended
	var content = $("<div id='content'></div>").addClass('content');
	header.appendTo(content);
	eyContent.appendTo(content);
	content.addClass('slideInRight current');
	$(".slideInLeft").addClass('current');
	// $('<div id="xmlContainer">').appendTo('#one');
	$("#xmlContainer").html("");
	content.appendTo('#xmlContainer');


	// pDesc.html("<strong>Description: </strong>" + pdeschtml);
	// pDesc.appendTo('.current .entry-wrapper');
	// eyWrapper.appendTo('.current article.' + ey + '.' + eyType);

	// returnlink.appendTo('.current .returns');
	// spanReturn.appendTo('.current .section-title');
	// spanh2.appendTo('.current .section-title');
	// h2article.appendTo('.current article.' + ey + '.' + eyType);
	// article.appendTo('.current .' + ey + '-content');
	// entryContent.appendTo('.current');
	// header.appendTo(content);
	// content.appendTo('#one');

	// headerTitle.appendTo('.current .' + ey + '-header');
	// $("." + ey + "-title").html();
	// $("<hr />").appendTo('.current .' + ey + '-title');

	// // var entryEleTitle = "<h1 class='" + entryTag + "-title'>" + title + "<hr /></h1>";
	// // var entryEleHeader = "<header class='" + entryTag + "-header'>" + entryEleTitle + "</header>";

	// // var entrySecTitleSpanName = "<span class='name'>" + entryTagAttrName + "</span>";
	// // var entrySecTitleSpanReturn = "<span class='returns'>Return: <a href='javascript(void(0));'>" + entryTagAttrReturn + "</a></span>";

	// // var entrySecTitle = "<h2 class='section-title'>" + entrySecTitleSpanName + entrySecTitleSpanReturn + "</h2>"
	// // var pDesc = "<p class='desc'><strong>Description: </strong>" + $(xmlData[0]).find('entry > desc').html() + "</p>";
	// // var entryWrapper = "<div class='entry-wrapper'></div>";

	// var entrylongdesc = ($(xmlData[0]).find('longdesc')[0]).tagName;
	// // var entrylongdesc = "test2";
	// var entrylongInner = $(xmlData[0]).find('longdesc').html();
	// var longDesc = "<div class='" + entrylongdesc + "' id='" + entryTag + "-" + entrylongdesc + "'>" + entrylongInner + "</div> <hr />";



	// var entryEleArticle = "<article class='" + entryTag + " " + entryTagAttrType + "'" +
	// " id='" + entryTagAttrName + "'>" + entrySecTitle + entryWrapper + "</article>";
	// var entryEleContent = "<div class='" + entryTag + "-content'>" + entryEleArticle + "</div>";

	// // $("#content").append(entryEleHeader).after().append(entryEleContent);
	// // $(pDesc).appendTo(".entry-wrapper");
	// $(".entry-wrapper").append(longDesc);
	// var signatures = $(xmlData[0]).find('signature');

	// if (typeof singnatures == 'undefined') {

	// } else {
	// 	var signUL = "<ul class='signatures'></ul>";
	// 	console.log("HERE");
	// 	$(signUL).prependTo(".entry-wrapper");
	// 	for (var i = 0; i < signatures.length; i++) {
	// 		var version_detail = $(signatures[i]).find('added').html();
	// 		// console.log(version_detail);
	// 		var signArgument = $(signatures[i]).find('argument');
	// 		for (j = 0; j < signArgument.length; j++) {
	// 			var signArgumentAttr = $(signArgument[j]).getAttributes();
	// 			// console.log(signArgumentAttr);
	// 			var signArgName = $(signArgumentAttr).attr('name');
	// 			var signArgType = $(signArgumentAttr).attr('type');
	// 			// console.log(signArgName)
	// 			// console.log(signArgType);
	// 			var arguDesc = $(signArgument[j]).find('desc').html();

	// 			if (typeof(arguDesc) == 'undefined') {
	// 				var signDesc = "<ul><li>" + "<div>" + signArgName + "</div>" +
	// 				"<div><span>Type: </span>" + signArgType + "</div></li></ul>";
	// 			} else {
	// 				var signDesc = "<ul><li>" + "<div>" + signArgName + "</div>" +
	// 				"<div><span>Type: </span>" + signArgType + "</div>" +
	// 				"<div>" + arguDesc + "</div>" + "</li></ul>";
	// 			}

	// 			var signature = "<li class='signature'><h4 class='name'><span class='version-details'> version added:" +
	// 			version_detail + "</span><a href='#" + entryTagAttrName + "-" + signArgName +
	// 			"' id='" + entryTagAttrName + "-" + signArgName + "'>" + entryTagAttrName + "-" + signArgName + "</a></h4>" +
	// 			signDesc + "</li>";
	// 			$(signature).appendTo(".signatures");
	// 		}
	// 	}
	// }


	$('#one pre code').each(function(i, block) {
		$(this).addClass('lineNumbers');
		hljs.lineNumbersBlock(block);
		hljs.highlightBlock(block);
	});
}


/***********************************************************
@function Name: N/A
@Type: N/A
@Description: ON WINDOW resize $("ONE") selector height will
 be adjusted accordingly
@Return: N/A
/***********************************************************/

$(window).resize(function() {
	$("#one").height($(document).height() - 123);
});



/***********************************************************
@@function Name: N/A
@@Type: N/A
@@Description: NOT USED CODE FOR AJAX RESULT AS XML and
TRANSFORM TO HTML
@@Return: N/A
/***********************************************************/

// for (var i = 0; i < attr.length; i++) {
// 	console.log(attr[i]);
// }
// console.log($(xmlData[0]).getAttributes());
//  	var jsonText = xmlToJson(success);
// console.log(jsonText);
// console.log(jsonText.entry);
// console.log(jsonText.entry.attributes);
// for (var i = 0; i < (jsonText.entry.attributes).length; i++) {
// 	console.log("here");
// 	console.log(jsonText.entry.attributes[i].type);
// 	console.log(jsonText.entry.attributes[i].name);
// 	console.log(jsonText.entry.attributes[i].return);
// }
// for (i in a) {
// 	if (a.hasOwnProperty(i)) {
// 		count++;
// 	}
// }

// console.log(jsonText.entry.attributes);
// $("#one").text(jsonText.entry);
// for (var t = 0; t < ($(xmlData[0]).children()).length; t++) {
// 	console.log(($(xmlData[0]).children())[t]);
// 	console.log(($(xmlData[0]).children())[t].tagName);
// 	//tagHasChilc
// 	for (var hasChild = 0; hasChild < ($(xmlData[0]).children())[t]; hasChild++) {
// 		console.log("hasChild=====================")
// 		console.log(($(xmlData[0]).children())[t]);
// 		console.log("=====================hasChild");
// 	}
// 	// child has attr
// 	for (var attr = 0; attr < (($(xmlData[0]).children())[t].attributes).length; attr++) {
// 		console.log("attr=====================")
// 		console.log(($(xmlData[0]).children())[t].attributes[attr]);
// 		console.log("=====================attr");
// 	}

// }
// // var entryTitle = ($(xmlData[0]).find('entry'))[];
// var title = ($(xmlData).find('title'))[0].textContent;
// var desc = ($(xmlData).find('entry desc'))[0].textContent;
// var singnatures = $(xmlData).find('entry signature');
// var titleText = title.slice(1, title.length - 2);
// var singnaturesAdded = $(xmlData).find('entry signature');

// for (i = 0; i < xmlData[0].attributes.length; i++) {
// 	console.log(">> entry : " + i);
// 	var attrPropName = xmlData[0].attributes[i].name;
// 	var attrPropVal = xmlData[0].attributes[i].textContent;
// 	console.log("<< entry : " + i);
// }
// console.log(xmlData[0].attributes[1].textContent); // ENTRY TAG TITLE
// console.log(($(xmlData).find('title'))[0].textContent); // TITLE TAG



// //console.log(added);
// //console.log("++++");

// $("#one").html("");
// var titleString = "<article  class='entry method' id='" + title.slice(1, title.length - 2) + "'>" + "<h2 class='section-title'><span class='name'>" + title + " (.selector)</span></h2>" + "</article>";
// var descString = "<div class='entry-wrapper'></div>";
// var pdesc = "<p class='desc'><storng>Description: </storng>" + desc + "</p>";
// var ulSegnature = "<ul class='signatures'></ul>";

// for (var i = 0; i < singnatures.length; i++) {
// 	var added = $(singnatures[i]).find('added').html();


// 	var argument = $(singnatures[i]).find('argument');
// 	for (var j = 0; j < argument.length; j++) {
// 		var argumentData = $(argument[j]).find('desc');
// 		var argumentDesc = $(argumentData).html();
// 		//console.log(j + " : " + argumentDesc);
// 		var liSignature = "<li class='signature'><h4 class='name'><span class='version-detail'>" + added + "</span><a class='" + titleText + "-selector'>" + ":test :" + "</a></h4></li>";
// 		console.log(j + ": " + liSignature)
// 			// debugger;
// 			$('.signatures').append(liSignature);
// 		}
// 	}

// 	var lognDesc = "<div class='longdesc' id='entry-longdesc'></div>"
// 	var example = "<div class='entry-examples'></div>"

// 	$("#one").append(titleString);
// 	$("#" + title.slice(1, title.length - 2)).append(descString);
// 	$(".entry-wrapper").append(pdesc);
// 	$(".entry-wrapper").append(ulSegnature);
// 	$(".entry-wrapper").append(lognDesc);
// 	$(".entry-wrapper").append(example);


/****************************************************
		// XML Transfor USING XML and AJAX  ENDDDDD
		*****************************************************/

// $.get(
// 	'xmlToHTML/add.xml',
// 	function(success) {
// 		//console.log(success)
// 		console.log(typeof(success));
// 		var data1 = $.parseXML(success);
// 		var data2 = $.parseHTML(data1);
// 		console.log(typeof(data1));
// 		console.log("+++++++++");
// 		console.log("here : " + data2);
// 		// debugger;
// 		var sectionTitle = $("<div class='section-title' style='color:white'>Title</div>");
// 		var entryWrapper = $("<div class='entry-wrapper' style='color:white'>entryWrapper</div>");
// 		var entryDisc = $("<p class='disc' style='color:white'></p>");
// 		var singnature = $("<ul class='signatures' style='color:white'></ul>");
// 		var singnatureLi = $("<li class='signature' style='color:white'></li>");
// 		var singnatureLiHead = $("<h2 class='name' style='color:white'><span class='version-detail'></span><a href='#' class='selector'></a></h2>");
// 		var entryLongDesc = $("<div class='entry-longdesc'></div>");
// 		var titletag = $("<h2 id='titletext' style='color:white'>123</span>");
// 		var title = $(data1).find("title");
// 		var desc = $(data1).find("entry > desc");
// 		var signature = $(data1).find("signature");
// 		var longdesc = $(data1).find("longdesc");
// 		console.log(desc);
// 		console.log(signature);
// 		console.log(longdesc);

// 		var h1tag = $(titletag).html(title[0].textContent);
// 		var DiscContent = desc[0].textContent;
// 		console.log(DiscContent);
// 		$("#one").html("");
// 		$(h1tag).appendTo('#one');
// 		$(entryDisc).appendTo('#one');
// 		$('.disc').html("<storng>Description:</storng>" + DiscContent);
// 		console.log($(data1).xpathEvaluate('//entry'));
// 		console.log($(data1).xpathEvaluate('//entry/title').text());
// 		console.log($(data1).xpathEvaluate('//entry//signature'));
// 		console.log($(data1).xpathEvaluate('//entry//disc'));
// 	},
// 	'text');
/*$.get('xmlToHTML/add.xml')
.done(function(data) {
	debugger;
	console.log("data : ");
	console.log(data.document);
	var data1 = $.parseXML(data);
	console.log("here : " + data1);
	var titletag = $("<span id='titletext'>123</span>");
	var title = $(data).find("title");
	var h1tag = $(title).appendTo(titletag);
	console.log("after : " + $.parseXML(data));
	alert(0);
	$(h1tag).appendTo('#one');
	alert(1);
}).fail(function() {
	alert('something went wrong!');
});*/