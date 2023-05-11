import { Router } from 'express';

import {
  deleteMovie,
  updateMovie,
  getAllMovies,
  createMovie,
  getMovieById,
  aliasTopMovies
} from '../controllers/movieController.js';
import { deleteShow } from '../controllers/showController.js';

const router = Router();
router.route('/getTopMovies').get(aliasTopMovies, getAllMovies);
router.route('/:id').delete(deleteMovie, deleteShow).patch(updateMovie).get(getMovieById);
router.route('/').get(getAllMovies).post(createMovie);

export default router;


