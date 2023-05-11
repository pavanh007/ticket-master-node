import catchAsync from './../utilities/catchAsync.js';
import { Cinema, validateCreateCinema } from '../models/cinemaModel.js';
import AppError from '../utilities/appError.js';
import { City } from '../models/cityModel.js';
import { Movie } from '../models/movieModel.js';
import showSeat  from '../models/showSeatModel.js';
import { filterObj } from '../utilities/updateParams.js';
import Show from '../models/showModel.js';
import { Hall } from '../models/cinemaHallModel.js';

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
   const { error } = await validateCreateCinema(cinemaData); // Validate the user input
   if (error) return res.status(400).send(error.details[0].message);
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
});

export const getCinemaWithShowTime = catchAsync(async (req, res, next) => {
  const { movieName, city } = req.body;

  const cinemas = await Cinema.aggregate([
    {
      $match: {
        city: city._id,
        movies: {
          $elemMatch: {
            name: movieName,
          },
        },
      },
    },
    {
      $lookup: {
        from: 'shows',
        localField: 'cinemaHallId',
        foreignField: 'cinemaHallId',
        as: 'shows',
      },
    },
    {
      $lookup: {
        from: 'movies',
        localField: 'movies.movieId',
        foreignField: 'movieId',
        as: 'movies',
      },
    },
    {
      $project: {
        _id: 0,
        MovieID: '$movies.movieId',
        ShowID: '$shows.showId',
        Title: '$movies.name',
        Description: '$movies.description',
        Duration: '$movies.duration',
        Genre: '$movies.genre',
        Language: '$movies.language',
        ReleaseDate: '$movies.releaseDate',
        Country: '$movies.country',
        StartTime: '$shows.startTime',
        EndTime: '$shows.endTime',
        Seats: {
          $map: {
            input: '$shows.seats',
            as: 'seat',
            in: {
              Type: '$$seat.type',
              Price: '$$seat.price',
              Status: '$$seat.status',
            },
          },
        },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      cinemas,
    },
  });
});



