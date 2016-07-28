"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
	render: function() {

		var tokenNumber = sessionStorage.getItem("authToken");
		if (!tokenNumber) {
			// Router.HashLocation.push("login");
		}
		else {
			var username = localStorage.getItem("userName");

			if (!username) {
				var guest = "Guest";
			}
			else {
				var guest = username;
			}
		};

		$.ajaxSetup({
		    headers: { 'Authorization': 'Token ' + tokenNumber }
		});
		$.ajax({
			url:'http://localhost:8000/api/v1/photos/'
            , type: 'GET'
            , data: this.state
            , success: function() {
            	toastr.info('Signed in as ' + guest);
                console.log("GET WORKS!");
            }
        }).then(function(data) {
            for (var key in data) {
            	var item = data[key];
            	console.log("id: " + item.id + " user:" + item.user + " photo link: " + item.photo);
            	var template = jQuery("<div class='col s4 image-block'><img class='col s12' src='http://127.0.0.1:8000"+item.photo+"' /><div class='img-caption'><div class='img-caption-divs'><a href='#''><i class='material-icons my-img-comment-icon'>comments</i>Comments("+item.id+")</a></div><div class='img-caption-divs'><a href='#' class='right'><i class='material-icons my-img-like-icon right'>thumb_up</i></a></div></div></div>");

    			jQuery(".image-gallery-view").append(template);
            }
        });
		return (
			<div className="row image-gallery-bg">
				<div className="col s12">
					<div className="row image-gallery-view">
						
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Home;