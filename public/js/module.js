'use strict';

var app = angular.module('myApp', ['ui.router', 'ngCookies']);

app.constant('TOKENNAME', 'authtoken');

app.run(function(User) {
  User.readToken();
})

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { url: '/home', templateUrl: '/html/home.html' })
    .state('login', { url: '/login', templateUrl: '/html/loginregister.html', controller: 'loginRegisterCtrl' })
    .state('register', { url: '/register', templateUrl: '/html/loginregister.html', controller: 'loginRegisterCtrl' })

  $urlRouterProvider.otherwise('/');
});
