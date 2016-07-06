'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, User) {
  console.log('mainCtrl!');
});

app.controller('loginRegisterCtrl', function($scope, User) {

  $scope.userRegister = () => {

    if($scope.user.password !== $scope.user.password2) {

      $scope.user.password = null;
      $scope.user.password2 = null;

      alert('Passwords do not match.  Try again')
    } else {

      User.register($scope.user)
      .then(res => {
        $stat.go('profile');
      })
      .catch(err => {
        console.log('err:', err);
        alert('Failed.  Check console')
      })
    }
  }

})
