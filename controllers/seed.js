const express = require('express');
const router = express.Router();

const usersInfo = require('../models/users.js');
const itemsInfo = require('../models/users.js');

const newUsers = [
  {username: "guest@guest.com",
   password: "guest"},

  {username: "guest2@guest.com",
   password: "guest"},

  {username: "guest3@guest.com",
   password: "guest"}
];

const newItems = [
  {
    item: [
    {
      name: "Food",
      price: 12
    },
    {
      name: "More Food",
      price: 24
    },
    {
      name: "Even More Food",
      price: 36
    }
    ]
  },
  { tax: 1 },
  {tip: 2}
];

router.get('/', (req, res)=>{
  usersInfo.create(newUsers, function(err){
    if(err){
      console.log(err);
      res.send('Error seeding user database');
    } else {
      console.log('Seed successfully executed');
    }
  });
});

router.get('/dropdatabase', (req, res)=>{
  usersInfo.collection.drop();
  itemsInfo.collection.drop();
  res.send('Database successfully dropped');
});

module.exports = router;
