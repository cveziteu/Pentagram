"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var CommentBlock = React.createClass({
    getInitialState: function() {
        return {
        } 
            
    }
    , componentWillMount: function() {
        var self = this;
        var userid = self.props.userID;
        var comment = self.props.commentTEXT;
        $.ajax ({
            url: 'http://127.0.0.1:8000/api/v1/users/'
            , type: 'GET'
            , error: function(xhr, errorThrown) {

            }
            }).then(function(data) {
                for (var key in data) {
                    var item = data[key];
                    if (item.id == userid) {
                        self.setState({userName: item.username});
                        self.setState({commentItem: comment});
                        // console.log(self.state.commentItem);
                    }
                }
            });
    }
    , render: function() {
        var self = this;
        return (
            <div> 
                <div className="chip">
                    <img src="/images/user-default2.jpg" alt="Contact Person" />
                    {self.state.userName}
                </div>
                <div className="chip chip-comment">{self.state.commentItem}</div>
            </div> 
        );
    }

});

var LikeBlock = React.createClass({
    getInitialState: function() {
        return {
        } 
            
    }
    , componentWillMount: function() {
        var self = this;
        var userid = self.props.userID;
        $.ajax ({
            url: 'http://127.0.0.1:8000/api/v1/users/'
            , type: 'GET'
            , error: function(xhr, errorThrown) {

            }
            }).then(function(data) {
                for (var key in data) {
                    var item = data[key];
                    if (item.id == userid) {
                        self.setState({userName: item.username});
                    }
                }
            });
    }
    , render: function() {
        var self = this;
        return (
            <div>
                <div className="chip">
                    Posted by {self.state.userName}
                </div>
            </div> 
        );
    }

});


var PostedByBlock = React.createClass({
    getInitialState: function() {
        return {
        } 
            
    }
    , componentWillMount: function() {
        var self = this;
        var userid = self.props.userID;
        $.ajax ({
            url: 'http://127.0.0.1:8000/api/v1/users/'
            , type: 'GET'
            , error: function(xhr, errorThrown) {

            }
            }).then(function(data) {
                for (var key in data) {
                    var item = data[key];
                    if (item.id == userid) {
                        self.setState({userName: item.username});
                    }
                }
            });
    }
    , render: function() {
        var self = this;
        return (
            <div>
                <div>
                    Posted by {self.state.userName}
                </div>
            </div> 
        );
    }

});

var LikeButton = React.createClass({
    getInitialState: function(){
        return {
            likedStatus: ''
        }
    }
    , componentWillMount: function() {
        var self = this;
        var userId = localStorage.getItem("userId");
        var photoId = this.props.photoid;

        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/photos/'+ photoId +'/like/'
            , type: 'GET'
            , error: function(xhr, textStatus, errorThrown) {

            }
        }).then(function(data) {
            var count = 0;
            for (var key in data) {
                var item = data[key];
                count++;
                if (item.user == userId && item.photo == photoId) {
                    console.log("User "+ item.user + " likes photo " + photoId);
                    self.setState({likedStatus: "liked"});
                }       
            }
            self.setState({likedCount: count});
        });
    }
    , render: function() {
        var photoId = this.props.photoid;
        return (
            <i className={'material-icons my-img-like-icon right icon-id-'+ photoId +' '+ this.state.likedStatus} data-id={photoId}>thumb_up</i>
        );
    }

    
});

var PhotoPage = React.createClass({
    getInitialState: function() {
        return {
            comments: [],
            likes: '',
            comment: ''
        }
    }
	, componentWillMount: function() {
        var self = this;
        var photoId = self.props.params.id;
        var userId = localStorage.getItem("userId");

        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/photos/'
            , type: 'GET'
            , error: function(xhr, textStatus, errorThrown) {
            }
            }).then(function(data) {
                for (var key in data) {
                    var item = data[key];
                    if (item.id == photoId) {
                        self.setState({imageLink: item.photo});
                        console.log(item.photo);
                        self.setState({imageOwner: item.user});
                        console.log("self.state.imageOwner: " + self.state.imageOwner);
                    }
                }
        });

        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/photos/' + photoId + '/comments/'
            , type: 'GET'
            , error: function(xhr, textStatus, errorThrown) {
            }
            }).then(function(commentData) {
                self.setState({comments: commentData});
                // console.log("Comments: " + self.state.comments);
        });

        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/photos/' + photoId + '/like/'
            , type: 'GET'
            , error: function(xhr, textStatus, errorThrown) {
            }
            }).then(function(likesData) {
                self.setState({likes: likesData});
                for (var key in likesData) {
                    var item = likesData[key];
                    if (item.user == userId && item.photo == photoId) {
                        $("#like-img-button").removeClass("grey");
                        $("#like-img-button").addClass("blue");
                    }       
                }
        });

        
    }
    , commentChangeHandler: function(event) {
        this.setState({textareaComment: event.target.value});
    }
    , formSubmitHandler: function(event) {
        var self = this;
        event.preventDefault();
        var photoId = this.props.params.id;
        var userId = localStorage.getItem("userId");
        var commentToAdd = self.state.textareaComment;
        if ((document.getElementById('textareaComment').value.length == 0) || (document.getElementById('textareaComment').value.length < 3)) {
            toastr.error("Please insert a comment with at least 3 characters!");
        }
        else {
            var sendData = {user_id: userId, photo_id: photoId, comment: commentToAdd};
            // console.log(sendData);

            $.ajax({
                url: 'http://127.0.0.1:8000/api/v1/photos/'+ photoId + '/comments/'
                , type: 'POST'
                , data: sendData
                , error: function(xhr, errorThrown) {
                    toastr.error(errorThrown);
                }
            }).then(function(data) {
                toastr.success("You posted a comment!");
                setTimeout(function(){
                   window.location.reload(1);
                }, 800);
            });
        } 
        
    }
    , onLikeHandler: function(event) {
        var photoId = this.props.params.id;
        var userId = localStorage.getItem("userId");
        var token = sessionStorage.getItem("authToken");
        var dataToSend = {user: userId, photo: photoId};
        // toastr.info("Like button for photo [" + photoId +"] was pressed by user ("+ userId +")!");
        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Token ' + token);
            }
            , url: 'http://127.0.0.1:8000/api/v1/photos/'+ photoId + '/like/'
            , type: 'POST'
            , error: function(xhr, textStatus, errorThrown) {
                if (errorThrown != "FOUND") {
                    toastr.error(errorThrown);
                }
                else {
                    toastr.warning("You just unliked photo [ " + photoId + " ]!");
                    $.ajax({
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', 'Token ' + token);
                        }
                        , url: 'http://127.0.0.1:8000/api/v1/photos/'+ photoId + '/like/'
                        , type: 'PUT'
                        , error: function(xhr, textStatus, errorThrown) {
                    
                        }
                    }).then(function(data) {
                        toastr.info("Photo "+ photoId +" has now " + data + " likes");
                        $("#like-img-button").removeClass("blue");
                        $("#like-img-button").addClass("grey");

                    });
                }
            }
        }).then(function(data) {
            toastr.success("You liked photo [ "+ photoId +" ]! YEY!");
            $.ajax({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Token ' + token);
                }
                , url: 'http://127.0.0.1:8000/api/v1/photos/'+ photoId + '/like/'
                , type: 'PUT'
                , error: function(xhr, textStatus, errorThrown) {

                }
            }).then(function(data) {
                toastr.info("Photo has now " + data + " likes");
                $("#like-img-button").removeClass("grey");
                $("#like-img-button").addClass("blue");
            });
        });
    }
    , render: function() {
        var self = this;
        var likeButtonLocation = {
             bottom: '100px',
             right: '24px',
             color: 'black'
        }

        var addButtonLocation = {
            bottom: '25px',
            right: '24px'
        }

        var addButtonColor = {
            color: '#000000'
        }
        var username = localStorage.getItem("userName");
		var tokenNumber = sessionStorage.getItem("authToken");
        var photoId = this.props.params.id;
        return (
			<div className="row image-gallery-bg center-align">
                <div className="row">
                    <div className="col m8 offset-m2 photo-container">
                        <image className="photo-block" src={'http://127.0.0.1:8000' + self.state.imageLink}/>
                    </div>
                </div>
                <div className="row">
                    <form>
                        <div className="col m8 offset-m2 form-group">
                            <textarea type="text" className="form-control" name="textareaComment" id="textareaComment" placeholder="Write your comment ..." onChange={self.commentChangeHandler}/>
                        </div>
                        <div className="col m8 offset-m2 form-group right-align">
                            <button name="submit" className="btn waves-effect waves-light" onClick={self.formSubmitHandler}>
                                
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col m8 offset-m2 photo-container">
                        <h5 className="left-align"> COMMENTS ({self.state.comments.length})</h5>
                        <div className="text-left">
                            {self.state.comments.map(function(item) {
                                return (
                                    <CommentBlock key={item.id} userID={item.user_id} commentTEXT={item.comment} />
                                )   
                            })}
                            {self.state.comments.length == 0 ? <div> No Comments </div>: ''}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col m8 offset-m2 photo-container">
                        <h5 className="left-align"> 
                            {self.state.likes.length == 0 ? <div> NO LIKES </div> : ''}
                            {self.state.likes.length > 0 ? <div>LIKES ({self.state.likes.length}) </div>: ''}
                        </h5>
                    </div>
                </div>
                <div className="fixed-action-btn" style={likeButtonLocation}>
                    <a onClick={self.onLikeHandler} className="btn-floating btn-large grey darken-3 waves-effect" id="like-img-button">
                      <i className="large material-icons">thumb_up</i>
                    </a>
                </div>
                <div className="fixed-action-btn" style={addButtonLocation}>
                    <a  href="/#/add-photo" className="btn-floating btn-large lime accent-3 waves-effect" id="add-img-button">
                      <i className="large material-icons" style={addButtonColor}>add</i>
                    </a>
                </div>
			</div>
		);
	}
});

module.exports = PhotoPage, CommentBlock, LikeBlock, PostedByBlock;