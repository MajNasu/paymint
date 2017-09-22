const express = require('express');
const router = express.Router();

const usersInfo = require('../models/users.js');

const newUsers = [
  {username: "guest@guest.com",
   password: "guest"},

  {username: "guest2@guest.com",
   password: "guest"},

  {username: "guest3@guest.com",
   password: "guest"}
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
  res.send('Database successfully dropped');
});

module.exports = router;
