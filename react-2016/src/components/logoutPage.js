"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Logout = React.createClass({
	render: function() {
    	sessionStorage.clear();
        localStorage.clear();
    	Router.HashLocation.push("#");
    }
});

module.exports = Logout;
	
