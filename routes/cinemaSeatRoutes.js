import { Router } from 'express';
import {
 createCinemaSeat
} from '../controllers/cinemaSeatController.js';

const router = Router();

router.route('/').post(createCinemaSeat);

export default router;
