"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var username = sessionStorage.getItem("userName");

if (!username) {
	username = "Guest";
}
var Home = React.createClass({
	render: function() {

		var tokenNumber = sessionStorage.getItem("authToken");
		$.ajaxSetup({
		    headers: { 'Authorization': tokenNumber }
		});
		$.ajax({
			url:'http://localhost:8000/api/v1/photos/'
            , type: 'GET'
            , data: this.state
            , success: function() {
            	toastr.info(tokenNumber);
                console.log("GET WORKS!");
            }
        }).then(function(data) {
            // console.log("Authentication Token: ", data.token);
            // sessionStorage.setItem("authToken", data.token);
            // var tokennumber = sessionStorage.getItem("authToken")
            // function (xhr) {
            //     var tokennumber = sessionStorage.getItem("authToken");
            //     xhr.setRequestHeader('Authorization', 'Token ' + tokennumber);
            //     console.log('Token Authorization Set as:' + tokennumber);
            // }
            // toastr.info('Authentication Token:' + tokennumber);
        });
		return (
				<div className="jumbotron">

					<h4>Welcome {username}</h4>
					<br />
					<h5> Your token is {tokenNumber} </h5>

				</div>
		);
	}
});

module.exports = Home;