import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';

const movieSchema = new mongoose.Schema(
  {
    movieId: { type: String, default: uuidv4(), unique: true},
    cinemaId: { type: String, unique: true, trim: true, index: true },
    cityId: { type: String, unique: true, trim: true, index: true },
    movieName: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    language: { type: String, required: true },
    directorName: { type: String, required: true },
    releaseDate: { type: Date,  default: Date.now() },
    castingType: {
      type: String,
      enum: [
        'ACTION',
        'DRAMA',
        'COMEDY',
        'ROMANCE',
        'HORROR',
        'SCIENCE_FICTI`ON',
        'ANIMATION',
        'DOCUMENTARY',
        'THRILLER',
        'WESTERN',
        'MUSICAL',
        'FAMILY',
        'ADVENTURE',
        'CRIME',
        'FANTASY',
        'WAR',
      ],
      default: 'FAMILY',
    },
  },
  { timestamps: true }
);
const Movie = mongoose.model('Movie', movieSchema);

export { Movie };


export async function validateCreateMovie(movieData) {
  const schema = Joi.object({
    movieId: Joi.string().uuid({ version: 'uuidv4' }),
    cinemaId: Joi.string().required(),
    cityId: Joi.string().required(),
    movieName: Joi.string().required(),
    description: Joi.string().required().trim(),
    language: Joi.string().required(),
    directorName: Joi.string().required(),
    releaseDate: Joi.date(),
    castingType: Joi.string()
      .valid(
        'ACTION',
        'DRAMA',
        'COMEDY',
        'ROMANCE',
        'HORROR',
        'SCIENCE_FICTION',
        'ANIMATION',
        'DOCUMENTARY',
        'THRILLER',
        'WESTERN',
        'MUSICAL',
        'FAMILY',
        'ADVENTURE',
        'CRIME',
        'FANTASY',
        'WAR'
      )
      .default('FAMILY'),
  });
  try {
    return schema.validate(movieData);
  } catch (error) {
    console.error(error);
  }
}