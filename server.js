const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/urlRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/urls', router);

const mongodbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('Failed to connect:', error.message);
    process.exit(1);
  }
};

const startServer = async () => {
  await mongodbConnection();

  app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running successfully');
  });
};

startServer();

