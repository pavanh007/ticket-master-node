import mongoose from "mongoose";

const cinemaHallSchema = mongoose.Schema({
  cinemaHallId: {
    type: String,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  cinemaId: {
    type: String,
    unique: true,
    trim: true,
  },
});

const CinemaHall = mongoose.model('Hall', cinemaHallSchema);
export { CinemaHall };