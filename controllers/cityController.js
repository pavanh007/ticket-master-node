import catchAsync from './../utilities/catchAsync.js';
import { City, validateCreateLocation } from '../models/cityModel.js';
// import APIFeatures from '../utilities/apiFeatures.js';

export const getAllCities = catchAsync(async (req, res, next) => {
  const cities = await Location.find();
  res.status(200).json({
    status: 'cities listed successfully',
    cities: {
      data: cities
    },
  });
});

export const addCity = catchAsync(async (req, res, next) => {
  const { error } = validateCreateLocation(req.body);
   if (error) return res.status(400).send(error.details[0].message);
  const city = await Location.create(req.body);
  res.status(200).json({
    status: 'cities added successfully',
    data: {
      cities: city,
    },
  });
});

export const getCity = catchAsync(async (req, res, next) => {
  const city = await Location.findById({_id: req.params.id});
  res.status(200).json({
    status: 'Success',
    data: {
      cities: city,
    },
  });
});

export const deletCity = catchAsync(async (req, res, next) => {
  const city = await Location.findByIdAndDelete({ _id: req.params.id });
  res.status(200).json({
    status: 'City deleted successfully',
    city: city,
  });
});

