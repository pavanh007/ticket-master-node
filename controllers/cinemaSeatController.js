import {CinemaSeat} from "../models/cinemaSeatModel.js";
import AppError from "../utilities/appError.js";
import catchAsync from "../utilities/catchAsync.js";

export const createCinemaSeat = catchAsync(async (req, res, next) => {
  const seat = await CinemaSeat.create(req.body);
  if(!seat) next(new AppError(`${req.body.seatNumber} is not created`))
  res.status(200).json({
    status: 'Success',
    data: seat
  })
})

export const deleteCinemaSeat = catchAsync(async (req, res, next) => {
  const cinemaSeat = await CinemaSeat.findByIdAndDelete({ cinemaSeatId: req.params.cinemaSeatId });
  if (!cinemaSeat) next(new AppError(`${req.body.seatNumber} is not found`));
  res.status(200).json({
    status: 'Success',
    data: cinemaSeat,
  });
})