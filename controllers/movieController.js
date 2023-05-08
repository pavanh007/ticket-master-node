import catchAsync from './../utilities/catchAsync.js';
import { Movie, validateCreateMovie } from '../models/movieModel.js';
import { City } from '../models/cityModel.js';
import { filterObj } from '../utilities/updateParams.js';
import AppError from '../utilities/appError.js';

export const getAllMovies = catchAsync(async (req, res, next) => {
  const { movieName, language, directorName, castingType, cityName } = req.body;
  if (cityName) {
    const city = await City.find({ cityName: req.body.cityName });
    if (!city) {
      return next(new AppError("City not found", 404));
    }
    const movies = await Movie.find({ city: city.cityId });
    return res.status(200).json({
      status: 'Succes',
      data: movies,
    });
  }
  const movie = await Movie.find(
    {
    $or: [
      { movieName: movieName },
      { language: language },
      { directorName: directorName },
      { castingType: castingType },
    ],
    }
  );
  res.status(200).json({
    status: 'Succes',
    data: movie,
  });
});

export const getMovieById = catchAsync(async (req, res, next) => {
  const movie = await Movie.find({ _id: req.params.id });
  res.status(200).json({
    status: 'Succes',
    data: movie,
  });
});

export const createMovie = catchAsync(async (req, res, next) => {
  const movieData = req.body;
  const { error } = await validateCreateMovie(movieData); // Validate the user input
  if (error) next(new AppError(`${error.details[0].message}`, 400));
  const result = await Movie.create(req.body);
  res.status(201).json({
    status: 'movie created',
    data: {
      movie: result,
    },
  });
});

export const updateMovie = catchAsync(async (req, res, next) => {
  const filterBody = filterObj(req.body, 'movieName', 'description', 'language', 'directorName', 'releaseDate', 'castingType');
  const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, filterBody, {
    new: true,
    runValidators: true,
  });
  if (!updatedMovie) {
    return next(new AppError(`No result found with id ${req.params.id}`), 404);
  }
  res.status(200).json({
    status: 'updated successfully',
    data: {
      movie: updatedMovie,
    },
  });
});

export const deleteMovie = catchAsync(async (req, res, next) => {
  const deletedMovie = await Movie.findOneAndDelete(req.params.id);
  if (!deletedMovie) {
    return next(new AppError(`No movies found with id ${req.params.id}`), 404);
  }
  res.status(200).json({
    status: 'deleted successfully',
    data: {
      Movie: deletedMovie,
    },
  });
});

