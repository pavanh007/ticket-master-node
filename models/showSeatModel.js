import mongoose from "mongoose";

const showSeatSchema = mongoose.Schema({
  showSeatId: {
    type: Number,
    unique: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'RESERVED', 'BLOCKED'],
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  showId: {
    type: Number,
    unique: true,
    trim: true,
  },
  bookingId: {
    type: Number,
    unique: true,
    trim: true,
  },
});

const showSeat = mongoose.model('showSeat', showSeatSchema);

export default showSeat;