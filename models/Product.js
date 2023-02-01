const { Schema, model } = require('mongoose');
 
const productSchema = new Schema(
  {
    category: {
      type: String,
      enum: [ 'leche', 'huevos', 'pan', 'arroz', 'espagueti']
    },
    name: {
      type: String,
      required: [true, 'Please add a product name']
    },
    format: {
      type: Number
    },
    image: {
      type: String,
      default: '../images/product-default-edit.png'
    },
  },
  {
    timestamps: true
  }
);
 
const Product = model('Product', productSchema);

module.exports = Product;