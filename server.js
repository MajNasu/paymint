//Declarations & Requirements
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
const session = require('express-session');
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;

//Middleware
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
    secret: "this is a random string secret", //a random string do not copy this value or your stuff will get hacked
    resave: false,
    saveUninitialized: false
}));

//Controllers
const seedController = require('./controllers/seed.js');
app.use('/seed', seedController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

//Mongoose connections
mongoose.connect('mongodb://localhost:27017/paymint');
mongoose.connection.once('open', ()=>{
  console.log('MONGO CONNECTION YES');
});

//Listening on port
app.listen(port, ()=>{
  console.log('listening...');
})
