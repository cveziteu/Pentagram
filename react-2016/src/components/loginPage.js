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

        //  setRequestHeader for CSRF Token - done but useless :)

        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (settings.type == 'POST' || settings.type == 'PUT' || settings.type == 'DELETE') {
                    function getCookie(name) {
                        var cookieValue = null;
                        if (document.cookie && document.cookie != '') {
                            var cookies = document.cookie.split(';');
                            for (var i = 0; i < cookies.length; i++) {
                                var cookie = jQuery.trim(cookies[i]);
                                // Does this cookie string begin with the name we want?
                                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                    break;
                                }
                            }
                        }
                        return cookieValue;
                    }
                    if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                        // Only send the token to relative URLs i.e. locally.
                        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                    }
                console.log("CSRF Token: ",getCookie('csrftoken'));
                toastr.success('CSRF Token:' + getCookie('csrftoken'));
                }
            }
        });
        
        // AJAX CALL for Token Authorization - WORKING
        $.ajax({
            url:'http://localhost:8000/api/v1/login/'
            , type: 'POST'
            , data: this.state
            , success: function() {
                console.log("Token succesfully received from (http://localhost:8000/api/v1/login/)!");
            }
        }).then(function(data) {
            console.log("Authentication Token: ", data.token);
            sessionStorage.setItem("authToken", data.token);
            var tokennumber = sessionStorage.getItem("authToken");
            toastr.info('Authentication Token:' + tokennumber);
        });
        

        // AJAX CALL for LOGIN - NOT WORKING!~
        
        $.ajax({
            beforeSend: function (xhr) {
                var tokennumber = sessionStorage.getItem("authToken");
                xhr.setRequestHeader('Authorization', 'Token ' + tokennumber);
                console.log('Token Authorization Set as:' + tokennumber);
            }
            , url:'http://localhost:8000/user/login/'
            , type: 'POST'
            , data: this.state
            , success: function() {
                alert('success http://localhost:8000/user/login/ ');
            }
        }).then(function(data) {
            //sessionStorage.setItem('authToken', data.token);
            //redirect to homepage
        });
    }
    , render: function() {

        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        };
        var csrftokennumber = getCookie('csrftoken');
        
		return (
            <div className="container container-table all-centered">
        		<div className="row">
        			<div className="col-xs-12 text-center">
        				<image src="images/logo10.png" />
        			</div>
            		<div className="col-xs-4 col-xs-offset-4 form-bg text-center">
                		<h4> Login to your account</h4>
                		<br />
                		<form>
                            <input type="hidden" name="csrfmiddlewaretoken" value={csrftokennumber} />
                			<div className="form-group">
    							<input type="text" className="form-control" name="username" placeholder="Username" onChange={this.userChangeHandler} />
    						</div>
    						<div className="form-group">
    							<input type="password" className="form-control"  name="password" placeholder="Password" onChange={this.passwordChangeHandler} />
    						</div>
    						<div className="form-group">
                        		<button name="submit" className="btn btn-primary btn-block" onClick={this.formSubmitHandler}>Login</button>
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

// helloooooo