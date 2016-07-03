'use strict';

// define "learnjs" namespace
var learnjs = {};

// problem data structures
learnjs.problems = [
	{
		description: "What is truth?",
		code: "function problem() { return __; }"
	},
	{
		description: "Simple Math",
		code: "function problem() { return 42 === 6 * __; }"
	}
];

// bootstrap the application
learnjs.appOnReady = function() {
	console.log('***Loading Application...');
	window.onhashchange = function() {
		learnjs.showView(window.location.hash);
	};
	learnjs.showView(window.location.hash);
}

// generate landing view
learnjs.landingView = function() {
	return learnjs.template('landing-view');
}

// apply one way data binding to view elements
learnjs.applyObject = function(obj, elem) {
	for (var key in obj) {
		elem.find('[data-name="' + key + '"]').text(obj[key]);
	}
};

// use jQuery Effects API to provide visual feedback to users
learnjs.flashElement = function(elem, content) {
	elem.fadeOut('fast', function() {
		elem.html(content);
		elem.fadeIn();
	});
}

// clone a template
learnjs.template = function(name) {
	return $('.templates .' + name).clone();
}

// build correct answer flash contents
learnjs.buildCorrectFlash = function(problemNum) {
	// dynamically create link to next problem
	var correctFlash = learnjs.template('correct-flash');
	var link = correctFlash.find('a');
	if (problemNum < learnjs.problems.length) {
		link.attr('href', '#problem-' + (problemNum + 1))
	} else {
		link.attr('href', '');
		link.text("You're Finished!");
	}
	return correctFlash;
}

// problem view
learnjs.problemView = function(data) {
	var problemNumber = parseInt(data, 10);
	var view = $('.templates .problem-view').clone();
	var problemData = learnjs.problems[problemNumber - 1];
	var resultFlash = view.find('.result');
	
	function checkAnswer() {
		var answer = view.find('.answer').val();
		var test = problemData.code.replace('__', answer) + '; problem();';
		return eval(test);
	}
	
	function checkAnswerClick() {
		if (checkAnswer()) {
			learnjs.flashElement(resultFlash, learnjs.buildCorrectFlash(problemNumber));
		} else {
			learnjs.flashElement(resultFlash,'Incorrect!');
		}
		return false;
	}
	
	view.find('.check-btn').click(checkAnswerClick);
	view.find('.title').text('Problem #' + problemNumber);
	learnjs.applyObject(problemData, view);
	return view;
}

// router function
learnjs.showView = function(hash) {
	var routes = {
		'#problem': learnjs.problemView,
		'#': learnjs.landingView,
		'': learnjs.landingView
	};
	var hashParts = hash.split('-')
	var viewFn = routes[hashParts[0]];
	if (viewFn) {
		$('.view-container').empty().append(viewFn(hashParts[1]));
	}
}