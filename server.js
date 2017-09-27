//Declarations & Requirements
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const session = require('express-session');
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;

//Middleware
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

const itemsController = require('./controllers/items.js');
app.use('/items', itemsController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

//Mongoose connections
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/paymint';
mongoose.connect(mongoUri);
mongoose.connection.once('open', ()=>{
  console.log('MONGOOSE CONNECTION SUCCESSFUL');
});

//Listening on port
app.listen(port, ()=>{
  console.log('listening...');
})
