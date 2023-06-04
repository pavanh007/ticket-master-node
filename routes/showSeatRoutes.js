import { Router } from 'express';

import {
  createShowSeat,
  getAllSeats
} from '../controllers/showSeatController.js';
import { protect, restrict } from '../controllers/authController.js';

const router = Router();

router
  .route('/')
  .post(protect, restrict(['admin']), createShowSeat)
  .get(protect, restrict(['admin']), getAllSeats);

export default router;
