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

    var tokenNumber = sessionStorage.getItem("authToken");
    if (!tokenNumber) {
      var show_header = <HeaderLoggedOut/>;
    }
    else {
      var show_header = <HeaderLoggedIn/>;
    };
		return (
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <Link to="app" className="brand-logo left"><image src="images/logo101.png" height="40px" /></Link>
                {show_header}
            </div>
          </nav>
        </div>
		);
	}
});

var HeaderLoggedOut = React.createClass({
  render: function() {
    return (
      <ul className="right hide-on-med-and-down">
          <li><Link to="login"><i className="material-icons left">supervisor_account</i>Login</Link></li>
          <li><Link to="register"><i className="material-icons left">assignment</i>Register</Link></li>
      </ul>
    );
  }
});


var HeaderLoggedIn = React.createClass({
  LogOutHandler: function(event) {
    sessionStorage.clear();
    localStorage.clear();
    Router.HashLocation.push("login");
  }
  , render: function() {
    var user_name = localStorage.getItem("userName");
    var user_id = localStorage.getItem("userId");
    var style = {
      fontSize: '30px',
      color: '#000'
    };
    return (
      <ul className="right hide-on-med-and-down">
          <li className="userinfo"> {user_name} ({user_id}) </li>
          <li><Link to="home" className="waves-effect waves-light"><i className="material-icons left">view_module</i>Photos</Link></li>
          <li><Link to="add-photo" className="waves-effect waves-light"><i className="material-icons left">add</i>Add Photo</Link></li>
          <li><Link to="my-photos" className="waves-effect waves-light"><i className="material-icons left">dashboard</i>My Photos</Link></li>
          <li onClick={this.LogOutHandler}><a href="" className="waves-effect waves-light"><i className="material-icons left">power_settings_new</i>Logout</a></li>;
      </ul>
    );
  }
});


module.exports = Header, HeaderLoggedIn, HeaderLoggedOut;
