import mongoose from 'mongoose';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';

const cinemaSchema = new mongoose.Schema({
  cinemaId: {
    type: String,
    default: uuidv4(),
    unique: true,
  },
  totalCinemaHalls: { type: Number, required: true },
  cityId: { type: String, unique: true, trim: true },
  cinemaName: {
    type: String,
    required: true,
    trim: true,
    validator: {
      validate: function () {
        !this.name && this.name.length > 3;
      },
    },
  },
});

const Cinema = mongoose.model('Cinema', cinemaSchema);

export { Cinema };


export async function validateCreateCinema(movieData) {
  const cinemaSchema = Joi.object({
    cinemaId: Joi.string().uuid(),
    totalCinemaHalls: Joi.number().integer().required(),
    cityId: Joi.string().required(),
    cinemaName: Joi.string().trim().min(3).required(),
  });
  try {
    return cinemaSchema.validate(movieData);
  } catch (error) {
    console.error(error);
  }
}