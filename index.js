// Description: Main entry point of the application.
const express = require('express');
const bodyParser = require('body-parser');

// Create the express app.
const app = express();
app.use(bodyParser.json());

// Dynamic port binding.
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({
  path: path.join(__dirname, `/env/${process.env.NODE_ENV}.env`),
});

// Connect to MongoDB
const connectMongoDB = require('./connection');
connectMongoDB(process.env.MONGO_URI);

// Routes.
const loginRouter = require('./routes/auth/login');
const signupRouter = require('./routes/auth/signup');

// Authentication routes
app.use('/auth/login', loginRouter);
app.use('/auth/signup', signupRouter);

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
