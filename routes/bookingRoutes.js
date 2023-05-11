import { Router } from 'express';
import {bookTickets} from '../controllers/bookingController.js';
const router = Router();

router.route('/seats').post(bookTickets);

export default router;