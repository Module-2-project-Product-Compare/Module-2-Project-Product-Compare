const { Schema, model } = require('mongoose');
 
const highlightedSchema = new Schema(
  {
    thisUser: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    thisArticle: {
      type: Schema.Types.ObjectId,
      ref: 'Article'
    }
  },
  {
    timestamps: true
  }
);
 
const Highlighted = model('Highlighted', highlightedSchema);

module.exports = Highlighted;