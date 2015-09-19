(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {
	var dropDown = $('#dropDown');
	var $form = $('#form');
	var picURL = $('#picURL');
	var comments = $('#comments');
	var cancel = $('#cancel');
	var add = $('#add');
	var logOut = $('#logOut');
	var section = $('#section');
	var url = 'http://tiyfe.herokuapp.com/collections/fee';
	var error = $('#error');
	// var Uname=$('.username');

	var loginBackground = $('.loginBackground');
	var loginForm = $('#loginForm');
	var username = $('#username');
	var password = $('#password');
	var signinError = $('#signinError');
	var usersURL = 'http://tiyfe.herokuapp.com/collections/feeUsers';
	var getAccount = $('#getAccount');

	var signupForm = $('#signupForm');
	var newUsername = $('#newUsername');
	var newPassword = $('#newPassword');
	var newPasswordCheck = $('#newPasswordCheck');
	var signupError = $('#signupError');
	var cancelSignup = $('#cancelSignup');
	var user;

	signupForm.hide();
	$form.hide();

	logOut.click(function () {
		loginBackground.toggle('right');
		loginForm.show();
		signupForm.hide();
		username.val('');
		password.val('');
		newUsername.val('');
		newPassword.val('');
		signupError.html('');
	});

	loginForm.submit(function (e) {
		e.preventDefault();
		user = username.val();
		if (username.val() === '') {
			signinError.html('Could Not Verify Sign-In, Try Again.');
			password.val('');
		} else if (password.val() === '') {
			signinError.html('Could Not Verify Sign-In, Try Again.');
		} else {
			$.get(usersURL, function (response) {
				for (var i = 0; i < response.length; i++) {
					if (response[i].username === username.val() && response[i].password === password.val()) {
						loginBackground.toggle('slow');
						password.val('');
						signinError.html('');
					} else {
						signinError.html('Could Not Verify Sign-In, Try Again.');
					}
				};
			}, 'json');
		};
	});

	getAccount.click(function () {
		signinError.html('');
		loginForm.toggle('down');
		signupForm.toggle('up');
	});

	signupForm.submit(function (e) {
		e.preventDefault();
		console.log(newPassword.val());
		console.log(newPasswordCheck.val());
		if (newUsername.val() === '') {
			signupError.html('You Must Enter A Username.');
		} else if (newPassword.val() === '') {
			signupError.html('You Must Enter A Password.');
		} else if (newPasswordCheck.val() === '') {
			signupError.html('You Must Enter Your Password Again.');
		} else if (newPassword.val() !== newPasswordCheck.val()) {
			signupError.html('Passwords Must Match');
		} else {
			$.post(usersURL, {
				username: newUsername.val(),
				password: newPassword.val()
			}, 'json');
			loginBackground.hide();
			user = newUsername.val();
		}
	});

	cancelSignup.click(function (e) {
		e.preventDefault();
		signupForm.toggle('down');
		loginForm.toggle('up');
		signupError.html('');
	});

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
		console.log(user);

		if ((picURL.val().toLowerCase().indexOf('jpg') !== -1 || picURL.val().toLowerCase().indexOf('jpeg') !== -1 || picURL.val().toLowerCase().indexOf('png') !== -1 || picURL.val().toLowerCase().indexOf('gif') !== -1) && comments.val() !== '') {
			$.post(url, {
				photo: picURL.val(),
				caption: comments.val(),
				username: user
			}, function (response) {
				console.log(response);
				$form.toggle('slow');
				picURL.val('');
				comments.val('');
				error.html('');
			}, 'json');
		} else {
			error.html('Make sure both fields are filled out.');
		}
	});

	setInterval(function () {
		$.get(url, function (response) {
			section.html('');
			response.forEach(function (response) {
				section.append('<div class="incoming"><div class"nameTag">Posted By: ' + response.username + '</div><div class="pic"><img class="actualPic img-rounded" src="' + response.photo + '"></div><div class="commentsMade">' + response.caption + '</div><div>');
			});
		});
	}, 500);
});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map