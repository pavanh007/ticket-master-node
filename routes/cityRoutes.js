import { Router } from 'express';
import {
  addCity,
  getAllCities,
  deletCity,
  getCity
} from '../controllers/cityController.js';
import { deleteCinema } from '../controllers/cinemaController.js';
import { deleteHall } from '../controllers/hallController.js';
import { deleteCinemaSeat } from '../controllers/cinemaSeatController.js';

const router = Router();

router.route('/').get(getAllCities).post(addCity);
router.route('/:id').get(getCity).delete(deletCity, deleteCinema, deleteHall, deleteCinemaSeat);

export default router;

