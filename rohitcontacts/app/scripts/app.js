'use strict';

/**
 * @ngdoc overview
 * @name rohitcontactsApp
 * @description
 * # rohitcontactsApp
 *
 * Main module of the application.
 */
angular
  .module('rohitcontactsApp', [
    'ngRoute',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/contacts.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/contacts.html'
      });
  });
