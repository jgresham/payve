/*jslint browser: true*/
/*global $, Firebase, console*/
/*
 *	login.js
 */
 "use strict";

var ref = new Firebase("https://payve.firebaseio.com");

$(function() { // document.ready function

	// capture login form
	$("#login_form").submit(login);
});

function login(event) {
	event.preventDefault();

	var email = $("#login_email").val();
	var password = $("#login_password:first").val();

	//use the console for debugging, F12 in Chrome, not alerts
    console.log("login attempt: email " + email + "and password " + password);

    // attempt login user
    loginUser(email, password);
}

function loginUser(email, password) {
	ref.authWithPassword({
		email: email,
		password: password,
	}, loginUserCallback);
}

function loginUserCallback(error, authData) {
	if(error) {
		console.log("Login user failed: ", error)
	} else {
		console.log("Successfully login user:", authData);
		location.assign("payve.html");
	}
}