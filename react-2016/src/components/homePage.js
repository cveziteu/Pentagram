"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
	render: function() {
		return (
				<div className="jumbotron">
					<h1>Home ^_^</h1>
				</div>
		);
	}
});

module.exports = Home;