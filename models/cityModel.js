import mongoose from 'mongoose';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';

const citySchema = new mongoose.Schema({
  cityId: {
    type: String,
    default: uuidv4(),
    required: true,
    unique: true
  },
  cityName: { type: String, lowercase: true, trim: true, required: true, unique: true },
  state: { type: String, required: true },
  zipCode: { type: Number },
});

const City = mongoose.model('City', citySchema);

export { City };


export function validateCreateLocation(cityData) {
  const schema = Joi.object({
    cityId: Joi.string().uuid({ version: 'uuidv4' }),
    cityName: Joi.string().min(3).required(),
    state: Joi.string().min(4).required(),
    zipCode: Joi.string()
      .pattern(/^\d{6}(?:[-\s]\d{4})?$/)
      .required(),
  });
  try {
    return schema.validate(cityData);
  } catch (error) {
    console.error(error);
  }
}