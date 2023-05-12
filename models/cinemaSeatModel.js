import mongoose from 'mongoose';

const cinemaSeatSchema = new mongoose.Schema(
  {
    cinemaSeatId: { type: String, unique: true, trim: true },
    cinemaHallId: { type: String, unique: true, trim: true },
    seatIdentifier: { type: Boolean, default: false },
    isTaken: { type: Boolean, default: false },
    seatType: {
      type: String,
      enum: ['REGULAR', 'PREMIUM', 'ACCESSIBLE', 'SHIPPED', 'EMERGENCY_EXIT'],
      default: 'REGULAR',
    },
  },
  { timestamps: true }
);

export const CinemaSeat = mongoose.model('CinemaSeat', cinemaSeatSchema);


