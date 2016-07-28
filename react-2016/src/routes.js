"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
  	//  Default Page load - login page
    <DefaultRoute handler={require('./components/homePage')} />
    <Route name="about" handler={require('./components/about/aboutPage')} />
  	//  Login Page 
    <Route name="login" handler={require('./components/loginPage')} />
    <Route name="logout" handler={require('./components/logoutPage')} />
  	//  Registration Page 
    <Route name="register" handler={require('./components/registrationPage')} />
    <NotFoundRoute handler={require('./components/notFoundPage')} />
    // do the redirect if route fails
    <Redirect from="about-us" to="about" />
    <Redirect from="about/*" to="about" />
  </Route>
);

module.exports = routes;