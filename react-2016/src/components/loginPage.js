"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Login = React.createClass({
	SetInitialState: function() {
        return {
            username:null
            , password:null
        }
    }
    , userChangeHandler: function(event) {
        this.setState({username: event.target.value});
    }

    , passwordChangeHandler: function(event) {
        this.setState({password: event.target.value});
    }

    , formSubmitHandler: function(event) {
        event.preventDefault();
        console.log(this.state);

        // AJAX CALL for Token Authorization - WORKING
        var user_name = this.state.username;
        $.ajax({
            url:'http://localhost:8000/api/v1/login/'
            , type: 'POST'
            , data: this.state
            , success: function() {
                console.log("Token succesfully received from (http://localhost:8000/api/v1/login/)!");
                console.log("Username is: " + user_name);
            }
        }).then(function(data) {
            sessionStorage.setItem("authToken", data.token);
            var token = sessionStorage.getItem("authToken");
            console.log("Authentication Token: ", token);
            localStorage.setItem("userName", user_name);
            localStorage.setItem("loggedIn", "1");
            Router.HashLocation.push("#");
        });
        

        // AJAX CALL for LOGIN - NOT WORKING!~
        
        // $.ajax({
        //      url:'http://localhost:8000/user/login/'
        //     , type: 'POST'
        //     , data: this.state
        //     , success: function() {
        //         alert('success http://localhost:8000/user/login/');
        //     }
        // }).then(function(data) {
        //     function (xhr) {
        //         var tokennumber = sessionStorage.getItem("authToken");
        //         xhr.setRequestHeader('Authorization', 'Token ' + tokennumber);
        //         console.log('Token Authorization Set as:' + tokennumber);
        //     }
        // });
    }
    , render: function() {

        // function getCookie(name) {
        //     var cookieValue = null;
        //     if (document.cookie && document.cookie != '') {
        //         var cookies = document.cookie.split(';');
        //         for (var i = 0; i < cookies.length; i++) {
        //             var cookie = jQuery.trim(cookies[i]);
        //             // Does this cookie string begin with the name we want?
        //             if (cookie.substring(0, name.length + 1) == (name + '=')) {
        //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        //                 break;
        //             }
        //         }
        //     }
        //     return cookieValue;
        // };
        // var csrftokennumber = getCookie('csrftoken');
        
		return (
            <div className="container container-table all-centered">
        		<div className="row">
        			<div className="col-xs-12 text-center">
        				<image src="images/logo10.png" />
        			</div>
            		<div className="col-xs-4 col-xs-offset-4 form-bg text-center">
                		<h5> Login to your account</h5>
                		<br />
                		<form>
                			<div className="form-group">
    							<input type="text" className="form-control" name="username" placeholder="Username" onChange={this.userChangeHandler} />
    						</div>
    						<div className="form-group">
    							<input type="password" className="form-control"  name="password" placeholder="Password" onChange={this.passwordChangeHandler} />
    						</div>
    						<div className="form-group">
                        		<button name="submit" className="btn waves-effect waves-light btn-block" onClick={this.formSubmitHandler}>
                                    
                                    Login
                                </button>
                    		</div>
    					</form>
    				</div>
                    <div className="col-md-4 col-md-offset-4 form-bg text-center">
                        Dont have an account? <Link to="register"> Sign up </Link>
                    </div>
    			</div>
    		</div>
		);
	}
});

module.exports = Login;