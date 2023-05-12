import { CinemaSeat } from '../models/cinemaSeatModel.js';
import { ShowSeat } from '../models/showSeatModel.js';
import Show from '../models/showModel.js';
import AppError from '../utilities/appError.js';
import catchAsync from '../utilities/catchAsync.js';


//Define a function to create a new show seat
export const createShowSeat = catchAsync(async (req, res, next) => {
  const { cinemaHallId, seatNumber, price, status, showId } = req.body;
  const seat = await CinemaSeat.findOne({ cinemaHallId, seatNumber });
  const show = await Show.findById({ showId: showId });
  // Create a new Show_seat document with the relevant data
  if (seat && show) {
    return next(new AppError(`${show.showId || seat.seatNumber} not found!`, 404));
  }
  let showSeat = new ShowSeat({
    status,
    price,
    cinemaSeatId: seat.cinemaSeatId,
    showId,
  });
  //Save the new Show_seat document to the database
  await showSeat.save();
  res.status(200).json({
    status: 'success',
    data: `${seat.cinemaSeatId} updated to the ${showId}`,
  });
});



export const getAllSeats = catchAsync(async (req, res, next) => {
  const seats = await ShowSeat.find();
  const availableSeats = seats.filter((seat) => !seat.status === 'AVAILABLE');
  const heldSeats = seats.filter((seat) => !seat.status === 'HOLD');
  const bookedSeats = seats.filter((seat) => !seat.status === 'BOOKED');
  res.status(200).json({
    status: 'All seats',
    available: availableSeats,
    held: heldSeats,
    booked: bookedSeats,
  });
});
