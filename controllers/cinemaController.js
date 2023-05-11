import catchAsync from './../utilities/catchAsync.js';
import { Cinema, validateCreateCinema } from '../models/cinemaModel.js';
import AppError from '../utilities/appError.js';
import { City } from '../models/cityModel.js';
import { filterObj } from '../utilities/updateParams.js';

export const getCinemasByLocation = catchAsync(async (req, res, next) => {
  const cinemas = await City.aggregate([
    {
      $match: { cityname: req.params.cityName },
    },
    {
      $lookup: {
        from: 'cinemas',
        localField: 'cityId',
        foreignField: 'cityId',
        as: 'cinemas',
      },
    },
    {
      $unwind: '$cinemas',
    },
    {
      $replaceRoot: { newRoot: '$cinemas' },
    },
  ]);
  if (cinemas.length === 0) {
    return next(new AppError('No cinemas found for the city', 404));
  }
  return res.status(200).json({
    status: 'List of cinemas',
    cinemas: cinemas,
  });
});

export const createCinema = catchAsync(async (req, res, next) => {
  const cinemaData = req.body;
  const { error } = await validateCreateCinema(cinemaData);
  if (error) next(new AppError(`${error.details[0].message}`, 400));
  const cinema = await Cinema.create(req.body);
  res.status(201).json({
    status: 'cinema created successfully',
    data: {
      cinema: cinema,
    },
  });
});

export const updateCinema = catchAsync(async (req, res, next) => {
  const filterBody = filterObj(req.body, 'cinemaName', 'totalCinemaHalls');
  const updatedCinema = await Cinema.findByIdAndUpdate(
    req.params.id,
    filterBody,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedCinema) {
    return next(
      new AppError(`No updatedCinema found with id ${req.params.id}`),
      404
    );
  }
  res.status(200).json({
    status: 'updated successfully',
    data: {
      cinema: updatedCinema,
    },
  });
});

export const deleteCinema = catchAsync(async (req, res, next) => {
  const deletedCinema = await Cinema.findOneAndDelete(req.params.id);
  if (!deletedCinema) {
    return next(new AppError(`No movies found with id ${req.params.id}`), 404);
  }
  res.status(200).json({
    status: 'deleted successfully',
    data: {
      Movie: deletedCinema,
    },
  });
  next();
});


