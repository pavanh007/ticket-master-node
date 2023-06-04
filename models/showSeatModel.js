import mongoose from "mongoose";

const showSeatSchema = new mongoose.Schema({
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

export const ShowSeat = mongoose.model('ShowSeat', showSeatSchema);
