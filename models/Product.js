const { Schema, model } = require('mongoose');
 
const productSchema = new Schema(
  {
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    image: {
        type: String,
        default: './images/product default.png',
    },
    price: Number,
    priceInMarket: Number,
    description: String, 
    pricesInMarket: {
        type: [Schema.Types.ObjectId],
        ref: 'Price'
      },
    market: {
     type: [Schema.Types.ObjectId],
     ref: 'Market'   
    }, 
    },
  {
    timestamps: true
  }
);
 
const Product = model('Product', productSchema);

module.exports = Product;