const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemsSchema = new Schema({

  restaurant: {type: String, required: true},

  item: [
  {
    name: {type: String, required: true},
    price: {type: Number, required: true}
  }
  ],

  tax: {type: Number, required: true},

  tip: {type: Number, required: true},

  total: {type: Number}

})

const Items = mongoose.model('Items', itemsSchema);

module.exports = Items;
