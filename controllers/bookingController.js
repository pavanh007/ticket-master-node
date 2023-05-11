import catchAsync from './../utilities/catchAsync.js';
import AppError from '../utilities/appError.js';
import { Booking, validateBooking } from '../models/bookingModel.js';
import Show from '../models/showModel.js';
import ShowSeat from '../models/showSeatModel.js';
import sendEmail from '../utilities/email.js';

// REST endpoint to book tickets for a particular cinema hall
export const bookTickets = catchAsync(async (req, res) => {
  // Validate the request body
  const bookingData = req.body;
  const { error } = await validateBooking(bookingData);
  if (error) {
    return next(new AppError(`${error.details[0].message}`, 400));
  }
  // Get the show details
  const show = await Show.findById(bookingData.showId);
  if (!show) {
    return next(new AppError('Show not found', 400));
  }
  // Check if the requested seats are available
  const showSeats = await ShowSeat.find({ showId: show.showId });
  const selectedSeats = showSeats.filter((showSeat) =>
    req.body.cinemaSeatIds.includes(showSeat.cinemaSeatId.toString())
  );
  if (
    selectedSeats.some((selectedSeat) => selectedSeat.status !== 'AVAILABLE')
  ) {
    return next(new AppError('One or more requested seats are already booked', 400));
  }

  // Calculate the total price for the booking
  const totalPrice = selectedSeats.reduce((total, selectedSeat) => {
    const cinemaSeat = cinemaSeat.find(
      (cinemaSeat) =>
        cinemaSeat.cinemaSeatId.toString() ===
        selectedSeat.cinemaSeatId.toString()
    );
    return total + cinemaSeat.price;
  }, 0);
  const now = new Date();
  const holdTime = new Date(now.getTime() + 5 * 60 * 1000);
  availableSeat.forEach((seat) => {
    seat.status = 'HOLD';
    seat.holdTime = holdTime;
    seat.save();
  });

  const paymentStatus = await waitForPayment(holdTime);
  if (paymentStatus === 'success') {
    // Create the booking object
    const booking = new Booking({
      numberOfSeats: req.body.numberOfSeats,
      userId: req.body.userId,
      timeStamps: Date.now(),
      showId: req.body.showId,
      totalPrice: totalPrice,
    });

    // Save the booking object
    await booking.save();

    // Update the show seat objects with the booking and seat status
    selectedSeats.forEach((selectedSeat) => {
      selectedSeat.status = 'BLOCKED';
      selectedSeat.bookingId = booking._id;
      selectedSeat.save();
    });

    // Return the booking object
    const message = `Thank you for booking seats: ${booking.numberOfSeats} from our platform., please ignore this email.`;
    await sendEmail({
      email: user.email,
      subject: 'Ticket booked successfully',
      message,
    });
    res.status(201).json({
      status: 'success',
      booking: {
        numberOfSeats: booking.numberOfSeats,
        userId: booking.userId,
        showId: booking.showId,
        timeStamps: Date.now(),
        totalPrice: booking.totalPrice,
      },
    });
  } else {
    requestedSeats.forEach((seat) => {
      seat.status = 'AVAILABLE';
      seat.holdTime = null;
      seat.save();
    });
  }
});

// Helper function to simulate waiting for payment
function waitForPayment(holdTime) {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (new Date() >= holdTime) {
        clearInterval(intervalId);
        resolve('connection timeout');
      }
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
      resolve('success');
    }, 5000);
  });
}
