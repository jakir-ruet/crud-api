const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('talking from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
  //console.log('Hello, I am expressjs of nodejs');
  res.send('Hello, I am expressjs of nodejs');
});

module.exports = app;
