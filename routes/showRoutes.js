import { Router } from 'express';

import {
  createShow,
  deleteShow,
  listOfShowForMovie,
  updateShow
} from '../controllers/showController.js';

const router = Router();

router.route('/:id').delete(deleteShow).patch(updateShow);
router.route('/').post(createShow);
router.route('/listOfShowForMovie/').get(listOfShowForMovie);

export default router;
