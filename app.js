require('dotenv').config();
require('express-async-errors');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const morgan = require('morgan');

const authRouter = require('./routes/authRoutes');

// express
const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');

//middleware
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
