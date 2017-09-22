const express = require('express');
const router = express.Router();
const Items = require('../models/items.js');

//Get all the receipts... but why
router.get('/', (req, res)=>{
  if(req.session.logged == true){
    Items.find({}, (err, foundItems)=>{
      if(err){
        res.send(err);
      } else {
        res.json(foundItems);
      } //closing second if statement
    });
  } //closing first if statement
});

//Create a new receipt
router.post('/', (req, res)=>{
  Items.create(req.body, (err, createdItem)=>{
    res.json(createdItem);
  });
});

//Finalize and remove a receipt
router.put('/:id', (req, res)=>{
  Items.findByIdAndRemove(req.params.id, (err, deletedItem)=>{
    res.json(deletedItem);
  });
});

//Edit a receipt
router.put('/:id', (req, res)=>{
  Items.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, item)=>{})
})
