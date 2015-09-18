(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {
	var dropDown = $('#dropDown');
	var $form = $('#form');
	var picURL = $('#picURL');
	var comments = $('#comments');
	var cancel = $('#cancel');
	var add = $('#add');
	var section = $('#section');
	var url = 'http://tiyfe.herokuapp.com/collections/fee';
	var error = $('#error');

	$form.hide();
	console.log('hiding form');

	dropDown.click(function () {
		$form.toggle('slow');
	});

	cancel.click(function (e) {
		e.preventDefault();
		error.html('');
		picURL.val('');
		comments.val('');
		$form.toggle('slow');
	});

	add.click(function (e) {
		e.preventDefault();

		if ((picURL.val().toLowerCase().indexOf('jpg') !== -1 || picURL.val().toLowerCase().indexOf('jpeg') !== -1 || picURL.val().toLowerCase().indexOf('png') !== -1 || picURL.val().toLowerCase().indexOf('gif') !== -1) && comments.val() !== '') {
			$.post(url, {
				photo: picURL.val(),
				caption: comments.val()
			}, function (response) {
				console.log(response);
				$form.toggle('slow');
				picURL.val('');
				comments.val('');
			}, 'json');
		} else {
			error.html('Make sure picture is jpeg or png and there is a comment.');
		}
	});

	setInterval(function () {
		$.get(url, function (response) {
			section.html('');
			response.forEach(function (response) {
				section.append('<div class="pic"><img class="actualPic" src="' + response.photo + '"></div><div class="commentsMade">' + response.caption + '</div>');
			});
		});
	}, 500);
});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map