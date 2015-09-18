'use strict';

$(document).ready(function(){
	var dropDown=$('#dropDown');
	var $form=$('#form');
	var picURL=$('#picURL');
	var comments=$('#comments');
	var cancel=$('#cancel');
	var add=$('#add');
	var section=$('#section');
	var url='http://tiyfe.herokuapp.com/collections/fee'
	var error=$('#error');
	// var Uname=$('.username');

	var loginBackground=$('.loginBackground');
	var loginForm=$('#loginForm');
	var username=$('#username');
	var password=$('#password');
	var usersURL = 'http://tiyfe.herokuapp.com/collections/feeUsers'
	var getAccount=$('#getAccount');


	var signupForm=$('#signupForm');
	var newUsername=$('#newUsername');
	var newPassword=$('#newPassword');
	var user;

	
	
	signupForm.hide();
	$form.hide();
	
	
	



	loginForm.submit(function(e){
		e.preventDefault();
		user=username.val();
		$.get(
			usersURL,
			function (response){
				for(var i=0; i<response.length; i++){
					if (response[i].username===username.val()&&response[i].password===password.val()){
							loginBackground.hide();
							console.log(username);
					}
				}
			},
			'json'
		);
	})

	getAccount.click(function(){
		loginForm.toggle('down');
		signupForm.toggle('up');
	})

	signupForm.submit(function(e){
		e.preventDefault();
		$.post(
			usersURL,
			{
				username: newUsername.val(),
				password: newPassword.val()
			},
			
			'json'
		);
		loginBackground.hide();
		user=newUsername.val();
	});

	

	dropDown.click(function(){
		$form.toggle('slow');
	});

	cancel.click(function(e){
		e.preventDefault();
		error.html('');
		picURL.val('');
		comments.val('');
		$form.toggle('slow');
	});

	add.click(function(e){
		e.preventDefault();
		console.log(user);
		
		if ((picURL.val().toLowerCase().indexOf('jpg')!==-1||picURL.val().toLowerCase().indexOf('jpeg')!==-1||picURL.val().toLowerCase().indexOf('png')!==-1||picURL.val().toLowerCase().indexOf('gif')!==-1)&&comments.val()!==''){
	    	$.post(
	            url,
	            {
	            	photo: picURL.val(),
	            	caption: comments.val(),
	            	username: user
	            },
	            function(response) {
	            	console.log(response);
	            	$form.toggle('slow');
	            	picURL.val('');
					comments.val('');
					error.html('');
	            },
	            'json'
		    );
		    
    	}
    	else{
    		error.html('Make sure both fields are filled out.');
    	}
    	
    })



	setInterval(function() {
		$.get(
			url,
			function (response){
				section.html('');
				response.forEach(function(response) {
						section.append('<div class="incoming"><div class"nameTag">Posted By: '+response.username+'</div><div class="pic"><img class="actualPic img-rounded" src="'+response.photo+'"></div><div class="commentsMade">'+response.caption+'</div><div>');
				})
			}

		);
	}, 500);









})