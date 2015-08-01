/*jslint browser: true*/
/*global $, Firebase, console*/
/*
 *	signup.js
 */
"use strict";

var ref = new Firebase("https://payve.firebaseio.com");

$(function() { // document.ready function

	// capture login form
	$("#signup_form").submit(signup);
});

function signup(event) {
	event.preventDefault();

	var email = $("#signup_email").val();
	var password = $("#signup_password").val();
	var password_confirm = $("#signup_password_confirm").val();

	//use the console for debugging, F12 in Chrome, not alerts
    console.log("signup attempt: email " + email + ", password " + password + ", and confirm password " + password_confirm);

    if(validateSignup(email, password, password_confirm)) {
    	// attempt signup user
    	createUser(email, password, password_confirm);
    } else {
    	// report issue to form

    }

}

function validateSignup(email, password, password_confirm) {
	return true;
	if(email.indexOf("@") == -1) {
		return false;
	}
	if(password !== password_confirm) {
		return false;
	}

	return true;
	
}

function createUser(email, password) {
	ref.createUser({
		email: email,
		password: password
	}, createUserCallback);
}

function createUserCallback(error, userData) {
	if(error) {
		switch (error.code) {
			case "INVALID_EMAIL" :
				console.log("Signup email specified is not a valid email.");
				break;
			case "EMAIL_TAKEN" :
				console.log("Signup email is taken.");
				break;
		}
	} else {
		console.log("Successfully created user with uid:", userData.uid);
		location.assign("login.html");
	}
}





