const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Market = require('../models/Market');
const MONGO_URL = 'mongodb+srv://admin:admin@cluster0.xh4u5be.mongodb.net/Product-CompareDB';
const markets = require('../data/marketsData');

mongoose.connect(MONGO_URL)
  .then(response => console.log(`Connected to the database ${response.connection.name}`))
  .then(() => {
    return Market.create(markets)
  })
  .then(createdMarkets => console.log(`Inserted ${createdMarkets.length} markets in the database`))
  .then(() => mongoose.connection.close())
  .catch(err => console.error(err))