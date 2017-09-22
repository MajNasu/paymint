const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemsSchema = new Schema({

  item: {
    name: {type: String,required: true},
    price: {type: Number, required: true}
  },

  tax: {type: Number, required: true},

  tip: {type: Number, required: true},

  total: {type: Number, required: true}

})

const Items = mongoose.model('Items', itemSchema);

module.exports = Items;
