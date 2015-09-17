'use strict';

$(document).ready(function(){
	var dropDown=$('#dropDown');
	var $form=$('#form');
	var picURL=$('#picURL');
	var comments=$('#comments');
	var cancel=$('#cancel');
	var add=$('#add');
	var section=$('#section');
	var url='http://tiyfe.herokuapp.com/collections/Picdom'
	var error=$('#error');

	$form.hide();
	console.log('hiding form');

	$.get(
		url,
		function (response){
			section.val('');
			response.forEach(function(response) {
					section.append('<div class="pic"><img class="actualPic"src="'+response.local+'"></div><div class="commentsMade">'+response.texts+'</div>');
			})
		}

	);

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
		error.html('');
		if ((picURL.val().indexOf('jpeg')!==-1||picURL.val().indexOf('png')!==-1)&&comments.val()!==''){
	    	$.post(
	            url,
	            {
	            	local: picURL.val(),
	            	texts: comments.val()
	            },
	            function(response) {
	            	console.log(response);
	            },
	            'json'
		    );
    	}
    	else{
    		error.html('Make sure picture is jpeg or png and there is a comment.');
    	}
    })



	setInterval(function() {
		$.get(
			url,
			function (response){
				section.html('');
				response.forEach(function(response) {
						section.append('<div class="pic"><img class="actualPic"src="'+response.local+'"></div><div class="commentsMade">'+response.texts+'</div>');
				})
			}

		);
	}, 2000);









})