import { Router } from 'express';

import {
  deleteMovie,
  updateMovie,
  getAllMovies,
  createMovie,
  getMovieById,
} from '../controllers/movieController.js';

const router = Router();

router.route('/:id').delete(deleteMovie).patch(updateMovie).get(getMovieById);
router.route('/').get(getAllMovies).post(createMovie);

export default router;
