const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
const Product = require('../models/Product');
const products = require('../data/products');
const MONGO_URL = 'mongodb+srv://admin:admin@cluster0.xh4u5be.mongodb.net/Product-CompareDB'; 

mongoose.connect(MONGO_URL)
  .then(response => console.log(`Connected to the database ${response.connection.name}`))
  .then (() => {
      return Product.create(products)
  })
  .then(createdProduct => console.log(`Inserted ${createdProduct.length} present in the database`))
  .then(() => mongoose.connection.close())
  .catch(err => console.log(err))