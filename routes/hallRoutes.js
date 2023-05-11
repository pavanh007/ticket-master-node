import { Router } from 'express';
import {
  createCinemaHall,
  deleteHall,
  updateHall
} from '../controllers/hallController.js';
import { deleteCinemaSeat } from '../controllers/cinemaSeatController.js';

const router = Router();

router.route('/').post(createCinemaHall);
router.route('/:id').delete(deleteHall, deleteCinemaSeat).patch(updateHall);

export default router;
