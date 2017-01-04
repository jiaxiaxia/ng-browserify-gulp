var angular = require('angular');
angular.module('screen')
    .filter('trustHtml', require('./trustHtml'))
    .filter('numberToTwo',require('./numberToTwo'))
    .filter('formatterPercent',require('./formatterPercent'));
