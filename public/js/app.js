const app = angular.module('MyApp', []);

app.controller('mainController', ['$http', function($http){
  //Declarations in all Ctrl
  const controller = this;
  this.formdata = {};

  //Declarations for item Ctrl
  this.items = "";
  this.showRecForm = false;
  this.total = "";
  this.array = [];

  //Declarations for user Ctrl
  this.loggedIn = false;
  this.currentUser = "";
  this.user = "";
  this.showRegForm = false;
  this.showLogForm = false;

  //ITEMS --------------------------------------------->
  this.removeThisItem = function(index){
    controller.array.splice(index, 1);
    console.log(this.array);
  }

  this.addNewItem = function(){
    controller.array.push({name: "", price: 0});
  },

  this.handleRecForm = function(){
    this.showRecForm = !this.showRecForm;
  },

  this.getItems = function(){
    $http({
      method: 'GET',
      url: '/items'
    }).then(function(response){
      controller.items = response.data;
    }, function(error){
      console.log('error', error);
    })
  },

  this.postItem = function(){
    $http({
      method: 'POST',
      url: '/items',
      data: {
        item: this.array,
        tax: this.regTax,
        tip: this.regTip
      }
    }).then(function(response){
      console.log(response);
      controller.regTax = "";
      controller.regTip = "";
    }, function(error){
      console.log('error', error);
    })
  },
  this.editItem = function(item){
    $http({
      method: 'PUT',
      url: '/items' + item._id,
      data: {
        item: {
          name: this.regName,
          price: this.regPrice
        },
        tax: this.regTax,
        tip: this.regTip
      }
    }).then(function(response){
      console.log(response);
    }, function(error){
      console.log('error', error);
    })
  },
  this.deleteItem = function(item){
    $http({
      method: 'DELETE',
      url: '/items' + item._id
    }).then(function(response){
      console.log('Deleted receipt successfully');
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
