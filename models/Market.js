const { Schema, model } = require('mongoose');
 
const marketSchema = new Schema(
  {
    name: {
      type: String,
      enum: ['Alcampo', 'Bonarea', 'Carrefour', 'Dia', 'Mercadona'],
      required: [true, 'Please add a market name']
    },
    logo: {
      type: String,
      default: '../images/market-default-edit.png'
    },
  },
  {
    timestamps: true
  }
);
 
const Market = model('Market', marketSchema);

module.exports = Market;