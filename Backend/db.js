
require('dotenv').config()
const mongoose = require('mongoose');

const connectToMongo = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error(`MongoDB connection error: ${error.message}`);
    }
  };

module.exports = connectToMongo;