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
      .when('/likes/:id', {
        templateUrl: 'views/likes.html',
        controller: 'Likes'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
