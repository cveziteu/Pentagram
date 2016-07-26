"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
	render: function() {
    var listyle = {
      fontSize: '18px',
      fontWeight: '400',
      paddingTop: '3px',
      borderRight: '1px solid #DDDDDD',
      paddingLeft: '30px',
      paddingRight: '30px'
    };


		return (
          <div className="col-lg-12">
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                      <li><Link to="app"><image src="images/logo101.png" height="25px" /></Link></li>
                      <li style={listyle}><Link to="app">Home</Link></li>
                      <li style={listyle}><Link to="login">Login</Link></li>
                      <li style={listyle}><Link to="register">Register</Link></li>
                    </ul>
                </div>
              </nav>
          </div>
		);
	}
});

module.exports = Header;
