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
    .state('profile', { url: '/profile',
            templateUrl: '/html/profile.html',
            controller: 'profileCtrl',
            resolve: {
                CurrentUser: function(User) {
                  return User.getProfile()
                }
            }
          })
    .state('edit', {url: '/profile/edit', templateUrl: '/html/editProfile.html', controller: 'editProfileCtrl'})
    .state('users', {url: '/users', templateUrl: '/html/users.html', controller: 'usersCtrl'})

  $urlRouterProvider.otherwise('/');
});
