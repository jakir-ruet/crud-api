/* eslint-disable no-unused-vars */
const express = require('express');

const fs = require('fs');

const app = express();

const port = process.env.port || 3000;

app.use(express.json());

//middleware use here
// app.use((req, res, next) => {
//   console.log('Hello, this middlewares');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dummy-data/tours.json`).toString()
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'Success',
    requestAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};
// console.log(tours);

const getTour = (req, res) => {
  //console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  //console.log(id);

  //if(id > tours.length){
  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id',
    });
  }
  //console.log(id);

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};

const createTour = (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId };

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dummy-data/tours.json`.toString(),
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  // res.send('Completed')
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid operation',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Tour updated',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: null,
  });
};

// app.get('/api/v1/tours', getAllTours);

// app.post('/api/v1/tours', createTour);

// app.get('/api/v1/tours/:id', getTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

//==================OR=========================

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.get('/', (req, res) => {
  //console.log('Hello, I am expressjs of nodejs');
  res.send('Hello, I am expressjs of nodejs');
});

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
