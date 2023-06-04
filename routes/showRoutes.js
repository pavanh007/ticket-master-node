import { Router } from 'express';

import {
  createShow,
  deleteShow,
  listOfShowForMovie,
  updateShow
} from '../controllers/showController.js';
import { protect, restrict } from '../controllers/authController.js';

const router = Router();

router
  .route('/:id')
  .delete(protect, restrict(['admin']), deleteShow)
  .patch(protect, restrict(['admin']), updateShow);
router.route('/').post(protect, restrict(['admin']), createShow);
router
  .route('/listOfShowForMovie')
  .get(protect, restrict(['admin', 'user']), listOfShowForMovie);

export default router;
