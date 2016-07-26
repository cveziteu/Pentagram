"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var username = sessionStorage.getItem("username");

if (!username) {
	username = "Guest";
}
var Home = React.createClass({
	render: function() {
		var token = sessionStorage.getItem("authToken");
		return (
				<div className="jumbotron">

					<h4>Welcome {username}</h4>
					<br />
					<h5> Your token is {token} </h5>

				</div>
		);
	}
});

module.exports = Home;