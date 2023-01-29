const { Schema, model } = require('mongoose');
 
const productSchema = new Schema(
  {
    name: String,
    image: {
        type: String,
        default: 'https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg',
    },
    description: String, 
    seasons: {
        type: [Schema.Types.ObjectId],
        ref: 'Brand'
      } 
    },
  {
    timestamps: true
  }
);
 
const Product = model('Product', productSchema);

module.exports = Product;