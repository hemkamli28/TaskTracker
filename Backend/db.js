const mongoose = require('mongoose');


const connectToMongo = async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/taskManager", { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error(`MongoDB connection error: ${error.message}`);
    }
  };

module.exports = connectToMongo;