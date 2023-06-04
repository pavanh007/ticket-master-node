import { Router } from 'express';
import {
  createCinemaHall,
  deleteHall,
  updateHall
} from '../controllers/hallController.js';
import { deleteCinemaSeat } from '../controllers/cinemaSeatController.js';
import { protect, restrict } from '../controllers/authController.js';

const router = Router();

router.route('/').post(protect, restrict(['admin']), createCinemaHall);
router
  .route('/:id')
  .delete(protect, restrict(['admin']), deleteHall, deleteCinemaSeat)
  .patch(protect, restrict(['admin']), updateHall);

export default router;
