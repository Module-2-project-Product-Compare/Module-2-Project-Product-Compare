const { Schema, model } = require('mongoose');
 
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    image: {
      type: String,
      default: './images/product default edit.png'
    },
    price: {
      type: Number
    }, 
    priceInMarket: {
      type: [Schema.Types.ObjectId],
      ref: 'PriceIn'
    },
    description: {
      type:  String,
    },
    market: {
      type: [Schema.Types.ObjectId],
      ref: 'Market'   
    }
  },
  {
    timestamps: true
  }
);
 
const Product = model('Product', productSchema);

module.exports = Product;