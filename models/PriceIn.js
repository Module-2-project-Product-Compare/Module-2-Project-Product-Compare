const { Schema, model } = require('mongoose');
 
const priceInSchema = new Schema(
  {
    name: {
      type: String,
    },
    priceInMarket: {
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
 
const PriceIn = model('PriceIn', priceInSchema);

module.exports = PriceIn;