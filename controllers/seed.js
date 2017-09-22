const express = require('express');
const router = express.Router();

const usersInfo = require('../models/users.js');

const newUsers = [
  {email: "guest@guest.com",
   password: "guest"},

  {email: "guest2@guest.com",
   password: "guest"},

  {email: "guest3@guest.com",
   password: "guest"}
];

router.get('/', (req, res)=>{
  userInfo.create(newUsers, function(err){
    if(err){
      console.log(err);
      res.send('Error seeding user database');
    } else {
      console.log('Seed successfully executed');
    }
  });
});

router.get('/dropdatabase', (req, res)=>{
  userInfo.collection.drop();
  res.send('Database successfully dropped');
});

module.exports = router;
