const { Schema, model } = require('mongoose');
 
const highlightedSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: 'Article'
      //quizas hay que insertar aqui los key product y market?
    }
  },
  {
    timestamps: true
  }
);
 
const Highlighted = model('Highlighted', highlightedSchema);

module.exports = Highlighted;