const { Schema, model } = require('mongoose');
 
const articleSchema = new Schema(
  {
    price: {
      type: Number,
    },
    market: {
      type: Schema.Types.ObjectId,
      ref: 'Market'
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  },
  {
    timestamps: true
  }
);
 
const Article = model('Article', articleSchema);

module.exports = Article;