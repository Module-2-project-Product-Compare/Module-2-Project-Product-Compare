const { Schema, model } = require('mongoose');
 
const priceSchema = new Schema(
  {
    priceValue: {
      type: Number,
    },
    market: {
      type: [Schema.Types.ObjectId],
      ref: 'Market'
    },
    product: {
      type: [Schema.Types.ObjectId],
      ref: 'Product'
    }
  },
  {
    timestamps: true
  }
);
 
const Price = model('Price', priceSchema);

module.exports = Price;