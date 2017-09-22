const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');
const bcrypt = require('bcrypt');

// //Get all users
// router.get('/', (req, res)=>{
//   if(req.session.currentUser){
//     Users.find({}, (err, foundUsers)=>{
//       res.json(foundUsers);
//     });
//   } else {
//     res.redirect('/users');
//   }
// });

router.get('/', (req, res)=>{
  Users.find({}, (err, foundUsers)=>{
    res.json(foundUsers);
  });
});

//Post / Register a user
router.post('/register', (req, res, next)=>{
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userDbEntry = {};

  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;
  Users.create(userDbEntry, (err, user)=>{
    req.session.james = user._id;
    req.session.username = user.username;
    req.session.logged = true;
    console.log('####!!!####', req.session);//remove this guy later
    if(err){
      res.send(err);
    } else {
      res.json(user);
    }
  });
});

//Log into a user
router.post('/login', (req, res)=>{
  Users.findOne({username: req.body.username}, (err, user)=>{
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.username = user.username;
        req.session.logged = true;
        res.json(req.session.logged);
      } else {
        req.session.message = 'Username or password are incorrect';
        res.json(req.session.message);
      }
    } else {
      req.session.message = 'Username or password are incorrect';
      res.json(req.session.message);
    };
  });
});

//Delete account
router.delete('/:id', (req, res)=>{
  Users.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
    res.json(deletedUser);
  });
});

//Update account
// router.put('/:id', (req, res)=>{
//   Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, user)=>{
//     //--------->
//   })
// })

//Log out of account
router.get('/logout', (req, res)=>{
  console.log('predes', req.session); //Remove
  req.session.destroy(function(err){
    console.log('posdes', req.session); //these
    req.session = false;
    console.log('postfals', req.session); //guys
    console.log('Logged out');             //later
    res.json(req.session);
  });
});

//View account
router.get('/:id', (req, res)=>{
  Users.find({_id: req.params.id}, function(err, foundUser){
    res.json(foundUser);
  });
});

module.exports = router;
