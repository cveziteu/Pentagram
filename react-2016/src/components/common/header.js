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
      paddingRight: '30px',
      color: '#000000'
    };


		return (
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <Link to="app" className="brand-logo left"><image src="images/logo101.png" height="25px" /></Link>
              <ul className="right hide-on-med-and-down">
                <li><Link to="login"><i className="material-icons left">supervisor_account</i>Login</Link></li>
                <li><Link to="register"><i className="material-icons left">assignment</i>Register</Link></li>
                <li><Link to="about"><i className="material-icons">settings</i></Link></li>
                <li><Link to="about"><i className="material-icons">power_settings_new</i> </Link></li>
              </ul>
            </div>
          </nav>
        </div>
		);
	}
});

module.exports = Header;
