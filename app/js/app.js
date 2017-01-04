var angular=require('angular');
require('angular-route');
require('angular-ui-router');
require('angular-animate');

var screen=angular.module('screen', ['ngRoute','ngAnimate']);

require('./controllers');
require('./directives');
require('./services');
require('./filters');
screen.config(require('./routes'));
//screen.config(require('./config'));



