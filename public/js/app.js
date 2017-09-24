const app = angular.module('MyApp', []);

app.controller('mainController', ['$http', function($http){
  //Declarations in all Ctrl
  const controller = this;
  this.formdata = {};

  //Declarations for item Ctrl
  this.items = "";
  this.showRecForm = false;
  this.updatedArray = [];
  this.array = [];
  this.editStatus = false;
  this.finalTotal = 0;
  // this.finalTotal = controller.array.price.reduce((a, b)=>a+b, 0);
  // this.currentTotal = this.array.price.reduce((a, b)=> a + b, 0);

  //Declarations for user Ctrl
  this.loggedIn = false;
  this.currentUser = "";
  this.user = "";
  this.showRegForm = false;
  this.showLogForm = false;

  //ITEMS --------------------------------------------->
  // this.getFinalTotal = function(x){
  //   this.finalTotal += x;
  // },

  // this.getFinalTotal2 = function(array){
  //
  // },
  //
  // this.dothis = function(){
  //   console.log(controller.items[0].item);
  // },

  this.toggleEditStatus = function(){
    controller.editStatus = !controller.editStatus;
  }

  this.removeThisItem = function(index){
    controller.array.splice(index, 1);
    console.log(this.array);
  },

  this.addNewItem = function(){
    controller.array.push({name: "", price: ""});
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
        restaurant: this.regRestaurant,
        item: this.array,
        tax: this.regTax,
        tip: this.regTip,
        total: this.finalTotal
      }
    }).then(function(response){
      console.log(response);
      controller.regRestaurant = "";
      controller.array = "";
      controller.regTax = "";
      controller.regTip = "";
      controller.showRecForm = false;
      controller.getItems();
    }, function(error){
      console.log('error', error);
    })
  },
  this.editItem = function(item){
    $http({
      method: 'PUT',
      url: '/items/' + item._id,
      data: {
        restaurant: this.updatedRestaurant,
        item: this.updatedArray,
        tax: this.updatedTax,
        tip: this.updatedTip,
        total: this.updatedTotal
      }
    }).then(function(response){
      console.log(response);
      controller.updatedRestaurant = "";
      controller.tax = "";
      controller.tip = "";
      controller.getItems();
    }, function(error){
      console.log('error', error);
    })
  },

  this.deleteItem = function(item){
    $http({
      method: 'DELETE',
      url: '/items/' + item._id
    }).then(function(response){
      console.log('Deleted receipt successfully');
      controller.getItems();
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
  },
  controller.getItems();
}]);
