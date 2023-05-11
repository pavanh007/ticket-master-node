import { Router } from 'express';

import {
  createShowSeat,
  getAllSeats
} from '../controllers/showSeatController.js';

const router = Router();

router.route('/').post(createShowSeat).get(getAllSeats);

export default router;
