import { Hall } from "../models/cinemaHallModel.js";
import catchAsync from "../utilities/catchAsync.js";

export const createCinemaHall = catchAsync(async (req, res, next) => {
  const hall = await Hall.create(req.body);
  res.status(201).json({
    status: 'hall created successfully',
    data: {
      cinema: hall,
    },
  });
});

export const deleteHall = catchAsync(async (req, res, next) => {
  const hall = await Hall.findByIdAndDelete(req.params.id);
  res.status(202).json({
    status: 'hall deleted successfully',
    hall: hall
  })
  next();
})


export const updateHall = catchAsync(async (req, res, next) => {
  const filterBody = filterObj(req.body, 'totalSeats');
  const updatedHall = await Cinema.findByIdAndUpdate(
    req.params.id,
    filterBody,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedHall) {
    return next(
      new AppError(`No updatedCinema found with id ${req.params.id}`),
      404
    );
  }
  res.status(200).json({
    status: 'updated successfully',
    data: {
      cinema: updatedHall,
    },
  });
});