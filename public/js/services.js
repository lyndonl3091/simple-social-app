'use strict';

var app = angular.module('myApp');

app.service('User', function($http, $rootScope, $cookies, $q, TOKENNAME) {

    this.getProfile = () => {
      return $http.get('/api/users/profile')
    }

    this.readToken = () => {
      let token = $cookies.get(TOKENNAME);

      if(typeof token === 'string') {
        let payload = JSON.parse(atob(token.split('.')[1]))
        $rootScope.currentUser = payload;
      }
    };

    this.register = userObj => {
      console.log('userObj', userObj);
      return $http.post('/api/users/register', userObj);
    }

    this.login = userObj => {
      return $http.post('/api/users/login', userObj)
      .then(res => {
        $rootScope.currentUser = res.data;
        console.log('rootScope', $rootScope.currentUser);
        return $q.resolve(res)
      });
    }

    this.editProfile = userObj=> {
      let id = $rootScope.currentUser._id;
      console.log(id);
      return $http.put(`/api/users/${id}`, userObj)
      .then(res => {
        $rootScope.currentUser = res.data;
        return $q.resolve(res)
      })

    }

    this.logout= () => {
      $cookies.remove(TOKENNAME);
      $rootScope.currentUser = null;

      return $q.resolve();
    }

})
