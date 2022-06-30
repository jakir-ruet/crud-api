const fs = require('fs');
const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/../dummy-data/tours.json`).toString()
);

exports.getAllTours = (req, res) => {
   console.log(req.requestTime);
   res.status(200).json({
      status: 'Success',
      requestAt: req.requestTime,
      result: tours.length,
      data: {
         tours,
      },
   });
}
// console.log(tours);

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
   //console.log(req.body);
   const newId = tours[tours.length - 1].id + 1;
   const newTour = { id: newId };

   tours.push(newTour);
   fs.writeFile(
      `${__dirname}/../dummy-data/tours.json`.toString(),
      JSON.stringify(tours),
      () => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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