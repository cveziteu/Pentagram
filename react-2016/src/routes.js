"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
  	//  Default Page load - HomePage
    <DefaultRoute handler={require('./components/homePage')} />
    // Home Page
    <Route name="home" handler={require('./components/homePage')} />
    // About Page
    <Route name="about" handler={require('./components/about/aboutPage')} />
  	//  Login Page 
    <Route name="login" handler={require('./components/loginPage')} />
  	//  Registration Page 
    <Route name="register" handler={require('./components/registrationPage')} />
    //  Single Photo Page + comments and likes
    <Route name="photo/:id" handler={require('./components/PhotoPage')} />
    <Route name="my-photos" handler={require('./components/myPhotosPage')} />
    <Route name="add-photo" handler={require('./components/addPhoto')} />
    <NotFoundRoute handler={require('./components/notFoundPage')} />
    // do the redirect if route fails
    <Redirect from="about-us" to="about" />
    <Redirect from="about/*" to="about" />
  </Route>
);

module.exports = routes;