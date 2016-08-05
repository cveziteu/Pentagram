"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var addPhoto = React.createClass({
	SetInitialState: function() {
        return {
            user: '',

        }
    }
    , photoChangeHandler: function(event) {
        this.setState({photo: event.target.value});
    }
    , formSubmitHandler: function(event) {
        event.preventDefault();

        var userId = localStorage.getItem("userId");
        // var photoAdded = document.getElementById("fileInput").files[0].name;
        // var sendData = {user: userId, photo: photoAdded};
        // var sendData = {user: userId, photo: this.state.photo};
        // console.log(sendData);

        this.setState({user: userId});
        console.log(this.state);

        var data = new FormData();
            data.append('user', "1");
            if ($('input').val() !== "") {
                data.append('photo', $('input').prop('files')[0]);
            }
        $.ajax({
            url:'http://localhost:8000/api/v1/photos/'
            , type: 'POST'
            , contentType: false
            , data: data
            , processData:false
            , error: function(xhr, errorThrown) {
                toastr.error(errorThrown);
                console.log(data);
            }
        }).then(function(data) {
            Router.HashLocation.push("#");
        });
    }
    , render: function() {        
		return (
            <div className="container container-table all-centered">
        		<div className="row">
            		<div className="col-xs-4 col-xs-offset-4 form-bg text-center">
                		<h5> Add your photo</h5>
                		<br />
                		<form>
                			<div className="form-group">
    							<input type="file" accept="image/*" className="form-control" name="photo" id="fileInput" />
    						</div>
    						<div className="form-group">
                        		<button name="submit" className="btn waves-effect waves-light btn-block" onClick={this.formSubmitHandler}>
                                    
                                    Add
                                </button>
                    		</div>
    					</form>
    				</div>
    			</div>
    		</div>
		);
	}
});

module.exports = addPhoto;