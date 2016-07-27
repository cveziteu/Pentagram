"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var Register = React.createClass({
	SetInitialState: function() {
        return {
            username: null
            , password: null
            , email: null
        }
    }
    , userChangeHandler: function(event) {
        this.setState({username: event.target.value});
    }

    , passwordChangeHandler: function(event) {
        this.setState({password: event.target.value});
    }

    , password2ChangeHandler: function(event) {
        this.setState({password2: event.target.value});
    }

    , emailChangeHandler: function(event) {
        this.setState({email: event.target.value});
    }

    , formSubmitHandler: function(event) {
        event.preventDefault();
        console.log(this.state);

        // AJAX CALL for REGISTRATION - WORKING!~
        if (document.getElementById('username').value.length == 0) {
            toastr.error("Please enter your username!");
        }
        else if (document.getElementById('password').value.length == 0) {
            toastr.warning("Please enter your password!");
        }
        else if (document.getElementById('password2').value.length == 0) {
            toastr.warning("Please repeat your password!");
        }
        else if (document.getElementById('email').value.length == 0) {
            toastr.warning("Please enter your email!");
        }
        else if (this.state.password == this.state.password2) {
            var user_name = this.state.username;
            $.ajax({
                url:'http://localhost:8000/api/v1/users/'
                , type: 'POST'
                , data: this.state
                , success: function() {
                    toastr.success("User " + user_name + " created successfully!");
                }
                , error: function(response) {
                    console.log(response.responseJSON.username[0]);
                    toastr.error(response.responseJSON.username[0]);
                }
            });
        }
        else {
            toastr.error("Passwords do not match!");
        }
        
    }
    , render: function() {
		return (
			<div className="container container-table  all-centered">
        		<div className="row">
                    <div className="col-md-12 text-center">
                        <image src="images/logo10.png" />
                    </div>
            		<div className="col-md-4 col-md-offset-4 form-bg text-center">
                		<h5> Register your account</h5>
                		<br />
                		<form>
                			<div className="form-group">
    							<input type="text" className="form-control validate" placeholder="Username" name="username" id="username"  onChange={this.userChangeHandler} />
    						</div>
    						<div className="form-group">
    							<input type="password" className="form-control validate"  name="password" id="password"  placeholder="Password"  onChange={this.passwordChangeHandler} />
    						</div>
                            <div className="form-group">
                                <input type="password" className="form-control validate"  name="password2" id="password2"  placeholder="Repeat Password"  onChange={this.password2ChangeHandler} />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control validate"  name="email" id="email"  placeholder="E-mail"  onChange={this.emailChangeHandler} />
                            </div>
    						<div className="form-group">
                        		<button name="submit" className="btn waves-effect waves-light btn-block" onClick={this.formSubmitHandler}> Register </button>
                    		</div>
                            <div className="form-group">
                                By signing up, you agree to our
                                <br /> <a href="#/register"> Terms </a>& <a href="#register"> Privacy Policy</a>.
                            </div>
    					</form>
    				</div>
                    <div className="col-md-4 col-md-offset-4 form-bg text-center">
                        Already have an account? <Link to="login"> Log In </Link>
                    </div>
    			</div>
    		</div>
		);
	}
});

module.exports = Register;