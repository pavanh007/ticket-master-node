import { Router } from 'express';
import {
  addCity,
  getAllCities,
  deletCity,
  getCity
} from '../controllers/cityController.js';

const router = Router();

router.route('/').get(getAllCities).post(addCity);
router.route('/:id').get(getCity).delete(deletCity);

export default router;
