"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var Login = React.createClass({

	render: function() {
		var style = {
			color: 'red',
		};

		var background_style = {
			backgroundImage: 'url(images/background1.jpg)'
		};

		return (
			
			<div className="container container-table all-centered">
        		<div className="row">
        			<div className="col-xs-12 text-center">
        				<image src="images/logo10.png" />
        			</div>
            		<div className="col-xs-4 col-xs-offset-4 form-bg text-center">
                		<h4> Login to your account</h4>
                		<br />
                		<form method="post">
                			<div className="form-group">
    							<input type="text" className="form-control" placeholder="Username" name="username" id="username" />
    						</div>
    						<div className="form-group">
    							<input type="password" className="form-control"  name="password" id="password"  placeholder="Password" />
    						</div>
    						<div className="form-group">
                        		<input type="submit" className="btn btn-primary btn-block" value="Login" />
                    		</div>
    					</form>
    				</div>
                    <div className="col-md-4 col-md-offset-4 form-bg text-center">
                        Don't have an account? <Link to="register"> Sign up </Link>
                    </div>
    			</div>
    		</div>
		);
	}
});

module.exports = Login;