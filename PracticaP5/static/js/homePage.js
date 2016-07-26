/**
 * Created by Constantin on 7/20/2016.
 */


"use strict";  // Evaluate everything that we are doing in strict mode

var React = require('react');

var Home = React.createClass({
    render: function() {
        return (
            <div className="jumbotron">
                <h1> Administration </h1>
            </div>
        );
    }
});

module.exports = Home;