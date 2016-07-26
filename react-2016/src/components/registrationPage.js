"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var Register = React.createClass({
	SetInitialState: function() {
        return {
            username:null
            , password:null
            , email:null
        }
    }
    , userChangeHandler: function(event) {
        this.setState({username: event.target.value});
    }

    , passwordChangeHandler: function(event) {
        this.setState({password: event.target.value});
    }

    , emailChangeHandler: function(event) {
        this.setState({email: event.target.value});
    }

    , formSubmitHandler: function(event) {
        event.preventDefault();
        console.log(this.state);

        // AJAX CALL for REGISTRATION - WORKING!~

        $.ajax({
            url:'http://localhost:8000/api/v1/users/'
            , type: 'POST'
            , data: this.state
            , success: function() {
                toastr.success("User registration successfully executed!");
            }
            , error: function() {
                toastr.error("User registration failed! Username already in the database!");
            }
        }).then(function(data) {
            //toastr.success("User registration successfully executed!")
        })
    }
    , render: function() {
		return (
			<div className="container container-table  all-centered">
        		<div className="row">
                    <div className="col-md-12 text-center">
                        <image src="images/logo10.png" />
                    </div>
            		<div className="col-md-4 col-md-offset-4 form-bg text-center">
                		<h4> Register your account</h4>
                		<br />
                		<form>
                			<div className="form-group">
    							<input type="text" className="form-control" placeholder="Username" name="username" id="username"  onChange={this.userChangeHandler} />
    						</div>
    						<div className="form-group">
    							<input type="password" className="form-control"  name="password" id="password"  placeholder="Password"  onChange={this.passwordChangeHandler} />
    						</div>
                            <div className="form-group">
                                <input type="text" className="form-control"  name="email" id="email"  placeholder="E-mail"  onChange={this.emailChangeHandler} />
                            </div>
    						<div className="form-group">
                        		<button name="submit" className="btn btn-success btn-block" onClick={this.formSubmitHandler}> Register </button>
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