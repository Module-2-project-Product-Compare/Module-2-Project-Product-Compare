const { Schema, model } = require('mongoose');
 
const offerSchema = new Schema(
  {
    discount: {
      type: Number,
      required: [true, 'Introduce a discount']
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
 
const Offer = model('Offer', offerSchema);

module.exports = Offer;