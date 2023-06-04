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
import { protect, restrict } from '../controllers/authController.js';

const router = Router();
router.route('/getTopMovies').get(aliasTopMovies, getAllMovies);
router
  .route('/:id')
  .delete(protect, restrict(['admin']), deleteMovie, deleteShow)
  .patch(protect, restrict(['admin']), updateMovie)
  .get(protect, restrict(['admin', 'user']), getMovieById);
router
  .route('/')
  .get(getAllMovies)
  .post(protect, restrict(['admin']), createMovie);

export default router;


