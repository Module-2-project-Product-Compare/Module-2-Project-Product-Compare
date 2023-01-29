const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  stars: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  comment: {
    type: String
  },
  username: {
    type: String
  },
//   product: {
//     type: Schema.Types.ObjectId, // Solo uno
//     ref: 'Product'
//   }
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;