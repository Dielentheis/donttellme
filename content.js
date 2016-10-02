var _ = require('lodash');
var $ = require('./jquery-3.0.0.min.js');
var spoils = ['jon', 'khaleesi', 'snow', 'stark', 'starks', 'oberyn', 'martell', 'dany', 'danaerys', 'greyjoy', 'bolton', 'ramsay', 'frey', 'mormont', 'tully', 'baratheon', 'tyrell', 'lannister', 'clegane', 'arya', 'sansa'];

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.message && message.message === "hide_the_spoilers") {
		findThem();
		$(window).on('scroll', _.debounce(function () {
			findThem();
		}, 300));
	}
});

function findThem() {
	$('.userContentWrapper').each(function(i, post) {
		var body = $(this).find('.userContent');
		var words = $(body).text().toLowerCase().split(" ");
		for (var i = 0; i < words.length; i++) {
			// !$(body).hasClass('shown')
			if (spoils.indexOf(words[i]) !== -1) {
				hideThePost($(this).find('.userContent'), words[i]);
				break;
			}
		}
	});
	$('.UFICommentBody').each(function(i, comment) {
		var words = $(this).text().toLowerCase().split(" ");
		for (var i = 0; i < words.length; i++) {
			// && !$(comment).hasClass('shown')
			if (spoils.indexOf(words[i]) !== -1) {
				hideTheComment(comment);
				break;
			}
		}
	});
}

function hideThePost(post, trigger) {
	// adding and styling the button
	var showButton = "<p class='trigger'>This \"friend\" posted a spoiler relating to '" + trigger + "'.</p><br><button class='showPost'>show the spoiler</button>";
	var savedText = $(post).text();
	$(post).text('').css({'text-align': 'center'}).append(showButton);
	$('.trigger').css({'font-size': '12px'});
	$('.showPost').css({'font-size': '16px', padding: '7px', 'background-color': '#FFFFFF', color: '#3b5998', border: '2px solid #6d84b4', 'border-radius': '4px'});
	$('.showPost').hover(function() {
		$(this).css({'background-color': '#3b5998', color: '#FFFFFF'});
	}, function() {
		$(this).css({'background-color': '#FFFFFF', color: '#3b5998'});
	});

	// adding click event to the button
	var findByThis = $(post).attr('id');
	$('.showPost').click(function() {
		if ($(this).parent().attr('id') ==  findByThis) {
			$(post).text(savedText).css({'text-align': 'left'});
			$(post).addClass('shown');
			$(window).off('scroll');
		}
	});
}

function hideTheComment(comment) {
	// adding and styling the button
	var showButton = "<button class='showComment'>show the spoiler</button>";
	var savedText = $(comment).text();
	$(comment).text('').css({'text-align': 'center'}).append(showButton);
	$('.showComment').css({'font-size': '12px', padding: '4px', 'background-color': '#FFFFFF', color: '#3b5998', border: '1px solid #6d84b4', 'border-radius': '4px'});
	$('.showComment').hover(function() {
		$(this).css({'background-color': '#3b5998', color: '#FFFFFF'});
	}, function() {
		$(this).css({'background-color': '#FFFFFF', color: '#3b5998'});
	});

	// adding click event to the button
	var findByThis = $(comment).attr('id');
	$('.showComment').click(function() {
		if ($(this).parent().attr('id') ==  findByThis) {
			$(comment).text(savedText).css({'text-align': 'left'});
			$(comment).addClass('shown');
			$(window).off('scroll');
		}
	});
}

//#1d2129