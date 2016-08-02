"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
	getInitialState: function(){
			return {
				images: [{
					"id": 1,
					"user": 1,
					"photo": "/media/photos/user_constantin/a70e9548-557e-11e6-8a53-485ab608aba0-background7.jpg"
				}]
			};
	}
	, componentWillMount: function() {
		var self = this;
		$.ajax({
			url: 'http://127.0.0.1:8000/api/v1/photos/'
			, type: 'GET'
			, error: function(xhr, textStatus, errorThrown) {

			}
		}).then(function(data) {
            self.setState({images: data});
		});
	}

	, PhotoCommentHandler: function(event) {
		// var photoId = event.target.dataset.id;
		// Router.HashLocation.push('photo/' + photoId);
	}
	,
	 PhotoLikeHandler: function(event) {
		// var photoId = event.target.dataset.id;
		// Router.HashLocation.push('photo/' + photoId);
	}
	, render: function() {
		var self = this;

		var tokenNumber = sessionStorage.getItem("authToken");
		if (!tokenNumber) {
			Router.HashLocation.push("login");
		}
		
		// $.ajaxSetup({
		//     headers: { 'Authorization': 'Token ' + tokenNumber }
		// });
		// $.ajax({
		// 	url:'http://localhost:8000/api/v1/photos/'
  //           , type: 'GET'
  //           , data: this.state
  //           , success: function() {
  //               console.log("GET WORKS!");
  //           }
  //       }).then(function(data) {
  //       	// var collection = data;
  //       	// debugger;
  //           for (var key in data) {
  //           	var item = data[key];
  //           	var template = jQuery("
  					// <div class='col m4 image-block'>
  					// 		<img class='col m12 img-thumbnail img-responsive' src='http://127.0.0.1:8000"+item.photo+"' />
  					// 		<div class='img-caption'><div class='img-caption-divs'>
  					// 			<a href='#''>
  					// 				<i class='material-icons my-img-comment-icon'>comments</i>
  					// 				<span class='hidden-xs'>Comments("+item.id+")</span>
  					// 			</a>
  					// 		</div>
  					// 		<div class='img-caption-divs'>
  					// 			<a href='' class='right'>
  					// 				<i class='material-icons my-img-like-icon right'>thumb_up</i>
  					// 			</a>
  					// 		</div>
  					// 	</div>
  					// </div>");

  //   			// jQuery(".image-gallery-view").append(template);
  //   			// http://127.0.0.1:8000/api/v1/photos/"+item.id+"/like/"
  //           	// collection += collection;
  //           }
  //           // console.log(collection);
  //           // sessionStorage.setItem("collection", data);
  //           // debugger;
  //       });
        // document.body.style.background = "url('/images/background1.jpg') no-repeat fixed center";
        // console.log(sessionStorage("collection"));
        // var collection = sessionStorage.getItem("collection");
		return (
			<div className="row image-gallery-bg">
				<div className="col-md-12">
					
						{self.state.images.map(function(item) {
							return (
								<div className="row image-gallery-view">
								<div className="image-block" key={item.id} >
									<a href={'#/photo/' + item.id}>
										<img src={'http://127.0.0.1:8000' + item.photo} id={'image-'+ item.id} data-id={item.id} width="100%" height="100%"/>
									</a>
									<div className='img-caption'>
							            <div className='img-caption-divs'>
							                <a href="">
							                   	<i className='material-icons my-img-comment-icon'>comments</i>
							                    Comments
							                </a>
							            </div>
							            <div className='img-caption-divs'>
							                <a href="">
							                    <i className='material-icons my-img-like-icon right' >thumb_up</i>
							                    &nbsp;
							                </a>
							            </div>
							        </div>
								</div>
								</div>
							);
						})}
					
				</div>
			</div>
		);
	}
});

module.exports = Home;