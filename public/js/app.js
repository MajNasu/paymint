const app = angular.module('MyApp', []);

app.controller('mainController', ['$http', function($http){
  //Declarations in all Ctrl
  const controller = this;
  this.formdata = {};

  //Declarations for item Ctrl


  //Declarations for user Ctrl
  this.loggedIn = false;
  this.currentUser = "";
  this.user = "";
  this.showRegForm = false;
  this.showLogForm = false;

  //ITEMS --------------------------------------------->
  this.getItems = function(){
    $http({
      method: 'GET',
      url: '/items'
    }).then(function(response){
      //something
    }, function(error){
      console.log('error', error);
    })
  },

  this.postItem = function(){
    $http({
      method: 'POST',
      url: '/items',
      data: {
        item: {
          name: this.regName,
          price: this.regPrice
        },
        tax: this.regTax,
        tip: this.regTip,
        total: this.regTotal
      }
    }).then(function(response){
      //something
    }, function(error){
      console.log('error', error);
    })
  },
  this.editItem = function(item){
    $http({
      method: 'PUT',
      url: '/items' + item._id,
    }).then(function(response){
      //something
    }, function(error){
      console.log('error', error);
    })
  },
  this.deleteItem = function(item){
    $http({
      method: 'DELETE',
      url: '/items' + item._id
    }).then(function(response){
      //something
    }, function(error){
      console.log('error', error);
    })
  },


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
        username: this.regUsername,
        password: this.regPassword
      }
    }).then(function(response){
      controller.regUsername = "";
      controller.regPassword = "";
      controller.loggedIn = true;
      controller.user = response.data;
      controller.currentUser = response.data.username;

    }, function(error){
      console.log('error', error);
    });
  },

  this.editUser = function(user){
    $http({
      method: 'PUT',
      url: '/users/' + user._id,
      data: {
        username: this.updatedUsername,
        password: this.updatedPassword
      }
    }).then(function(response){
      controller.updatedUsername = "";
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

  this.loginUser = function(username, password){
    $http({
      method: 'POST',
      url: '/users/login',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response){
        if(response.data === true){
          controller.username = "";
          controller.password = "";
          controller.loggedIn = response.data;
          controller.currentUser = response.config.data.username;
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