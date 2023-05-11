import mongoose, { Schema } from 'mongoose';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';

const showSchema = mongoose.Schema({
  showId: {
    type: String,
    default: uuidv4(),
    unique: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
    set: (date) => date.setHours(0, 0, 0, 0), // to only store date part and ignore the time
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  cinemaHallId: {
    type: String,
    unique: true,
    trim: true,
  },
  movieId: {
    type: String,
    unique: true,
    trim: true,
  },
});

const Show = mongoose.model('show', showSchema);

export default Show;



export async function validateCreateShow(showData) {
  const validateShowSchema = Joi.object({
    showId: Joi.string(),
    date: Joi.date().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    cinemaHallId: Joi.string().trim().required(),
    movieId: Joi.string().trim().required(),
  });
   try {
     return validateShowSchema.validate(showData);
   } catch (error) {
     console.error(error);
   }
}
