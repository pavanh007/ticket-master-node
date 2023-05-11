
import Show, { validateCreateShow } from "../models/showModel";
import AppError from "../utilities/appError";
import catchAsync from "../utilities/catchAsync";
import { filterObj } from "../utilities/updateParams";

export const listOfShowForMovie = catchAsync(async (req, res, next) => {
  const shows = await Show.aggregate([
    {
      $match: { movieName: req.params.movieName },
    },
    {
      $lookup: {
        from: 'movies',
        localField: 'movieId',
        foreignField: 'movieId',
        as: 'movie',
      },
    },
    {
      $unwind: '$movie',
    },
  ]);

  if (shows.length === 0) {
    return next(new AppError('No shows found for the movie', 404));
  }

  res.status(200).json({
    status: 'Success',
    shows: shows,
  });
});

export const updateShow = catchAsync(async (req, res, next) => {
  const filterBody = filterObj(req.body, 'date', 'startTime', 'endTime', 'cinemaHallId', 'movieId');
  const updatedShow = await Show.findByIdAndUpdate(req.params.id, filterBody, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'Show updated successfully',
    data: updatedShow
  })
})

export const deleteShow = catchAsync(async (req, res, next) => {
  const deletedShow = await Show.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'Show deleted successfully',
    data: deletedShow
  })
})

export const createShow = catchAsync(async (req, res, next) => {
  const showData = req.body;
  const { error } = await validateCreateShow(showData); // Validate the user input
  if(error) next(new AppError(`${error.details[0].message}`, 400));
  const show = await Show.create(req.body);
  res.status(200).json({
    status: 'Show created successfully',
    data: show,
  });
})


