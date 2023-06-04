import { Router } from 'express';
import {bookTickets} from '../controllers/bookingController.js';
import { protect, restrict } from '../controllers/authController.js';
const router = Router();

router.route('/seats').post(protect, restrict(['user']), bookTickets);

export default router;