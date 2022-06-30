const express = require('express');
const fs = require('fs');

const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/../dummy-data/tours.json`).toString()
);

const getAllUsers = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined',
   });
};

const createUser = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined',
   });
};

const getUser = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined',
   });
};

const updateUser = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined',
   });
};

const deleteUser = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined',
   });
};

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
