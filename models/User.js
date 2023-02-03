const { Schema, model } = require('mongoose');
 
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Please add a username.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Please add your email.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Valid email is required.']
    },
    hashedPassword: {
      type: String,
      required: [true, 'Please set a password.']
    },
    role: {
      type: String,
      default: 'user'
    },
    image: {
      type: String,
      default: '../images/user-default-edit.png'
    }
  },
  {
    timestamps: true
  }
);
 
const User = model('User', userSchema);

module.exports = User;