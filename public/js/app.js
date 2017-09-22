const app = angular.module('MyApp', []);

app.controller('mainController', ['$http', function($http){
  //Declarations in all Ctrl
  const controller = this;
  this.formdata = {};

  //Declarations for user Ctrl
  this.loggedIn = false;
  this.user = "";
  this.showRegForm = false;
  this.showLogForm = false;

  //USERS --------------------------------------------->
  this.handleRegForm = function(){
    this.showRegForm = !this.showRegForm;
  },

  this.handleLogForm = function(){
    this.showLogForm = !this.showLogForm;
  },

  this.getUsers = function(){
    $http({
      method: 'GET',
      url: '/users'
    }).then(function(response){
      controller.users = response.data;
    }, function(error){
      console.log('error', error);
    });
  },

  this.postUser = function(){
    $http({
      method: 'POST',
      url: '/users/register',
      data: {
        email: this.regEmail,
        password: this.regPassword
      }
    }).then(function(response){
      controller.regEmail = "";
      controller.regPassword = "";
      controller.loggedIn = true;
      controller.user = response.data;
    }, function(error){
      console.log('error', error);
    });
  },

  this.editUser = function(user){
    $http({
      method: 'PUT',
      url: '/users/' + user._id,
      data: {
        email: this.updatedEmail,
        password: this.updatedPassword
      }
    }).then(function(response){
      controller.updatedEmail = "";
      controller.updatedPassword = "";
    }, function(error){
      console.log('error', error);
    });
  },

  this.deleteUser = function(user){
    $http({
      method: 'DELETE',
      url: '/users/' + user._id,
    }).then(function(response){
      console.log('Deleted User successfully');
    }, function(error){
      console.log('Deleted User unsuccessfully');
    });
  },

  this.loginUser = function(email, password){
    $http({
      method: 'POST',
      url: '/users/login',
      data: {
        email: this.email,
        password: this.password
      }
    }).then(function(response){
      console.log('Log In successful', response);
        if(response.data === true){
          controller.email = "";
          controller.password = "";
          controller.loggedIn = response.data;
        } else {
          console.log('Log In unsuccessfully');
        }
    }, function(error){
      console.log('error', error);
    });
  },

  this.logoutUser = function(){
    $http({
      method: 'GET',
      url: '/users/logout'
    }).then(function(response){
      controller.loggedIn = false;
    }, function(error){
      console.log('error', error);
    });
  }
}]);
