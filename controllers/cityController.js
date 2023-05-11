import catchAsync from './../utilities/catchAsync.js';
import { City, validateCreateLocation } from '../models/cityModel.js';
import AppError from '../utilities/appError.js';

export const getAllCities = catchAsync(async (req, res, next) => {
  const cities = await City.find();
  res.status(200).json({
    status: 'cities listed successfully',
    cities: {
      data: cities
    },
  });
});

export const addCity = catchAsync(async (req, res, next) => {
  const { error } = validateCreateLocation(req.body);
   if (error) next(new AppError(`${error.details[0].message}`, 400));
  const city = await City.create(req.body);
  res.status(200).json({
    status: 'cities added successfully',
    data: {
      cities: city,
    },
  });
});

export const getCity = catchAsync(async (req, res, next) => {
  const city = await City.findById({_id: req.params.id});
  res.status(200).json({
    status: 'Success',
    data: {
      cities: city,
    },
  });
});

export const deletCity = catchAsync(async (req, res, next) => {
  const city = await City.findByIdAndDelete({ _id: req.params.id });
  res.status(200).json({
    status: 'City deleted successfully',
    city: city,
  });
  next()
});

