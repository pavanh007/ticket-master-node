import { Router } from 'express';

import { createCinema, deleteCinema, getCinemasByLocation, updateCinema } from '../controllers/cinemaController.js';
import { protect, restrict } from '../controllers/authController.js';

const router = Router();

router
  .route('/:id')
  .delete(protect, restrict(['admin']), deleteCinema)
  .patch(protect, restrict(['admin']), updateCinema);
router
  .route('/')
  .post(protect, restrict(['admin']), createCinema)
  .get(getCinemasByLocation);
export default router;
