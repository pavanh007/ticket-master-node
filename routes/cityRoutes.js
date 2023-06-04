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
import { protect, restrict } from '../controllers/authController.js';

const router = Router();

router
  .route('/')
  .get(getAllCities)
  .post(protect, restrict(['admin']), addCity);
router
  .route('/:id')
  .get(getCity)
  .delete(
    protect,
    restrict(['admin']),
    deletCity,
    deleteCinema,
    deleteHall,
    deleteCinemaSeat
  );

export default router;

