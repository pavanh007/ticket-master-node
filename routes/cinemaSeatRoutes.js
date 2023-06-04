import { Router } from 'express';
import {
 createCinemaSeat
} from '../controllers/cinemaSeatController.js';
import { protect, restrict } from '../controllers/authController.js';

const router = Router();

router.route('/').post(protect, restrict(['admin']), createCinemaSeat);

export default router;
