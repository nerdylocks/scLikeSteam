'use strict';

var LikeStream = angular.module('scLikeStreamApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]);
LikeStream.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/logged-in', {
        templateUrl: 'views/loggedin.html',
        controller: 'LoggedIn'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
