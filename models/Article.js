const { Schema, model } = require('mongoose');
 
const articleSchema = new Schema(
  {
    price: {
      type: Number,
    },
    category: {
      type: String,
      enum: ['leche', 'huevos', 'pan', 'arroz', 'espagueti'],
      required: [true, 'Please specify the category']
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