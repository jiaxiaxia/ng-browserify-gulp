var angular = require('angular');
angular.module('screen')
    .service('server', require('./server'))
    .service('interceptorServer', require('./interceptorServer'))
    .service('localStorageService', require('./localStorageService'));
