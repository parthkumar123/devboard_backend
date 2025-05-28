const mongoose = require('mongoose');

async function connectMongoDB(connectionString) {
  try {
    await mongoose.connect(connectionString);
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectMongoDB;
