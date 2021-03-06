'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, User, $state) {
  console.log('mainCtrl!');

  $scope.logOut = () => {
    User.logout()
    .then(
      $state.go('login')
    )
  }
});

app.controller('loginRegisterCtrl', function($scope, User, $state) {

  $scope.userRegister = () => {
    if($scope.newUser.password !== $scope.newUser.password2) {

      $scope.newUser.password = null;
      $scope.newUser.password2 = null;

      alert('Passwords do not match.  Try again')
    } else {

      User.register($scope.newUser)
      .then(res => {
        User.login($scope.newUser)
        .then(res => {
          $state.go('profile');
        })
      })
      .catch(err => {
        console.log('err:', err);
        alert('Failed.  Check console')
      })
    }
  }

  $scope.userLogin = () => {
    console.log($scope.user);
    User.login($scope.user)
    .then(res => {
      $state.go('profile');
    })
    .catch(err => {
      console.log('err:', err);
    })
  }

})

app.controller('profileCtrl', function($scope, $rootScope) {
  console.log('profileCtrl!');
  console.log($rootScope.currentUser);

  $scope.deleteAccount = () => {
    console.log('Delete!');
  }
})

app.controller('editProfileCtrl', function ($scope, User, $state, $rootScope) {
  console.log($rootScope.currentUser);

  $scope.editProfile = () => {
    console.log('click!');
    console.log($scope.user);
    User.editProfile($scope.user)
    .then( res => {
      $state.go('profile')
    })
  }
})

app.controller('usersCtrl', function($scope, User) {

  User.getAll()
  .then(res => {
    $scope.users = res.data;
  })
  .catch(err => {
    console.log('err:', err);
  })
})
