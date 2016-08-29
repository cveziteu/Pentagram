"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var LikedButton = React.createClass({
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

var CommentsNumber = React.createClass({
    getInitialState: function(){
        return {
            nrComments: ''
        }
    }
    , componentWillMount: function() {
        var self = this;
        var userId = localStorage.getItem("userId");
        var photoId = this.props.photoid;

        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/photos/'+ photoId +'/comments/'
            , type: 'GET'
            , error: function(xhr, textStatus, errorThrown) {

            }
        }).then(function(data) {
            var count = 0;
            for (var key in data) {
                var item = data[key];
                count++;
                // if (item.user == userId && item.photo == photoId) {
                //  console.log("User "+ item.user + " likes photo " + photoId);
                //  self.setState({likedStatus: "liked"});
                // }        
            }
            if (count == 0) {
                self.setState({commentCount: "No Comments"});
            }
            else if (count == 1) {
                self.setState({commentCount: count + " Comment"});
            }
            else {
                self.setState({commentCount: count + " Comments"});
            }
        });
    }
    , render: function() {
        var photoId = this.props.photoid;
        return (
            <a>
                <i className='material-icons my-img-comment-icon'>comments</i>
                {this.state.commentCount}
            </a>
        );
    }

    
});

var myPhotos = React.createClass({
    getInitialState: function(){
        return {
            images: [{
                "id": 1,
                "user": 1,
                "photo": "/media/photos/user_constantin/a70e9548-557e-11e6-8a53-485ab608aba0-background7.jpg"
            }],
            likes: '',
            liked: '',
            comments: [{
                user_id: "",
                photo_id: "",
                comment: "",
            }]
        };
    }
    , componentWillMount: function() {
        var self = this;
        var token = sessionStorage.getItem("authToken");
        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/photos/'
            , type: 'GET'
            , error: function(xhr, textStatus, errorThrown) {

            }
        }).then(function(data) {
            self.setState({images: data});
        });
    }
    , onDeleteHandler: function(event) {
        var photoId = event.target.dataset.id;
        var userId = localStorage.getItem("userId");
        var token = sessionStorage.getItem("authToken");
        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Token ' + token);
            }
            , url: 'http://127.0.0.1:8000/api/v1/photos/'+ photoId + '/delete/'
            , type: 'PUT'
            , error: function(xhr, textStatus, errorThrown) {
                if (errorThrown != "FOUND") {
                    toastr.error(errorThrown);
                }
                else {
                    toastr.success("You just deleted photo #" + photoId + " !");
                }
            }
        });
    }
    , onLikeHandler: function(event) {
        var photoId = event.target.dataset.id;
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
                    toastr.warning("You just unliked photo #" + photoId + ".");
                    $.ajax({
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', 'Token ' + token);
                        }
                        , url: 'http://127.0.0.1:8000/api/v1/photos/'+ photoId + '/like/'
                        , type: 'PUT'
                        , error: function(xhr, textStatus, errorThrown) {
                    
                        }
                    }).then(function(data) {
                        toastr.info("Photo #"+ photoId +" has now " + data + " likes!");
                        $(".icon-id-"+photoId).removeClass("liked");
                    });
                }
            }
        }).then(function(data) {
            toastr.success("You liked photo #"+ photoId +".");
            $.ajax({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Token ' + token);
                }
                , url: 'http://127.0.0.1:8000/api/v1/photos/'+ photoId + '/like/'
                , type: 'PUT'
                , error: function(xhr, textStatus, errorThrown) {

                }
            }).then(function(data) {
                toastr.info("Photo has now " + data + " likes!");
                $(".icon-id-"+photoId).addClass("liked");
            });
        });
    }
    , render: function() {
        var self = this;
        var addButtonLocation = {
            bottom: '25px',
            right: '24px'
        }

        var addButtonColor = {
            color: '#000000'
        }

        var tokenNumber = sessionStorage.getItem("authToken");
        if (!tokenNumber) {
            Router.HashLocation.push("login");
        }

        var userId = localStorage.getItem("userId");
        
        return (
            <div className="row image-gallery-bg">
                <div className="col-md-12">
                    <div className="row image-gallery-view">
                        {self.state.images.map(function(item) {
                            if (item.user == userId) {
                                return (
                                    <div className="image-block hoverable" key={item.id} >
                                        <a href={'#/photo/' + item.id}>
                                            <img src={'http://127.0.0.1:8000' + item.photo} id={'image-'+ item.id} data-id={item.id} width="100%" height="100%"/>
                                        </a>
                                        <div className='img-caption'>
                                            <div className='img-caption-divs'>
                                                <CommentsNumber photoid={item.id} />
                                            </div>
                                            <div className='img-caption-divs'>
                                                <a onClick={self.onLikeHandler} className="waves-effect right">
                                                    <LikedButton photoid={item.id} />
                                                    &nbsp;
                                                </a>
                                            </div>
                                        </div>
                                        <a onClick={self.onDeleteHandler}>
                                            <div className='img-delete'>
                                                <div className='img-delete-button' data-id={item.id}> Delete </div>
                                            </div>
                                        </a>
                                    </div>
                                );
                            } 
                        })}
                    </div>
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

module.exports = myPhotos, LikedButton, CommentsNumber;