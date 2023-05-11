import catchAsync from './../utilities/catchAsync.js';
import { Movie, validateCreateMovie } from '../models/movieModel.js';
import { filterObj } from '../utilities/updateParams.js';
import AppError from '../utilities/appError.js';
import APIFeatures from '../utilities/apiFeatures.js';

export const aliasTopMovies = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-releaseDate';
  req.query.fields = 'movieName,description,releaseDate,castingType';
  next();
};

export const getAllMovies = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Movie.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const movie = await features.query;
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
  const { error } = await validateCreateMovie(movieData);
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
  const filterBody = filterObj(
    req.body,
    'movieName',
    'description',
    'language',
    'directorName',
    'releaseDate',
    'castingType'
  );
  const updatedMovie = await Movie.findByIdAndUpdate(
    req.params.id,
    filterBody,
    {
      new: true,
      runValidators: true,
    }
  );
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
  next();
});
