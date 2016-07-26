"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var Register = React.createClass({

	render: function() {
		return (
			<div className="container container-table  all-centered">
        		<div className="row">
                    <div className="col-md-12 text-center">
                        <image src="images/logo10.png" />
                    </div>
            		<div className="col-md-4 col-md-offset-4 form-bg text-center">
                		<h4> Register your account</h4>
                		<br />
                		<form method="post">
                			<div className="form-group">
    							<input type="text" className="form-control" placeholder="Username" name="username" id="username" />
    						</div>
    						<div className="form-group">
    							<input type="password" className="form-control"  name="password" id="password"  placeholder="Password" />
    						</div>
                            <div className="form-group">
                                <input type="password" className="form-control"  name="password2" id="password2"  placeholder="Repeat Password" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control"  name="email" id="email"  placeholder="E-mail" />
                            </div>
    						<div className="form-group">
                        		<input type="submit" className="btn btn-success btn-block" value="Register" />
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