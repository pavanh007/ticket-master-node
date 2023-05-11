import { Router } from 'express';

import { createCinema, deleteCinema, getCinemasByLocation, updateCinema } from '../controllers/cinemaController.js';

const router = Router();

router.route('/:id').delete(deleteCinema).patch(updateCinema);
router.route('/').post(createCinema).get(getCinemasByLocation);
export default router;
