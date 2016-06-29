'use strict';

// define "learnjs" namespace
var learnjs = {};

// bootstrap the application
learnjs.appOnReady = function() {
	console.log('***Loading Application...');
	window.onhashchange = function() {
		learnjs.showView(window.location.hash);
	};
	learnjs.showView(window.location.hash);
}

// problem view
learnjs.problemView = function(problemNumber) {
	var title = 'Problem #' + problemNumber + ' Coming soon!';
	return $('<div class="problem-view">').text(title);
}

// router function
learnjs.showView = function(hash) {
	var routes = {
		'#problem': learnjs.problemView
	};
	var hashParts = hash.split('-')
	var viewFn = routes[hashParts[0]];
	if (viewFn) {
		$('.view-container').empty().append(viewFn(hashParts[1]));
	}
}