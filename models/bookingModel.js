import Joi from 'joi';
import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    trim: true,
  },
  numberOfSeats: {
    type: Number,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: String,
    unique: true,
    trim: true,
  },
  showId: {
    type: String,
    unique: true,
    trim: true,
  },
});

const Booking = mongoose.model('booking', bookingSchema);
export { Booking };

export async function validateBooking(bookingData) {
  const bookingSchema = Joi.object({
    numberOfSeats: Joi.number().min(1).required(),
    userId: Joi.string().required(),
    showId: Joi.string().required(),
    cinemaSeatIds: Joi.array().items(Joi.string()).min(1).required(),
  });
  try {
    return bookingSchema.validate(bookingData);
  } catch (error) {
    console.error(error);
    d;
  }
}
