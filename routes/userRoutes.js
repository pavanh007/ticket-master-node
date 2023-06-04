import { Router } from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  deletUser,
} from '../controllers/userController.js';
import { login, signUp } from '../controllers/authController.js';
const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.route('/').get(protect, restrict(['admin']), getAllUsers);
router
  .route('/:id')
  .get(protect, restrict(['admin']), getUser)
  .patch(protect, restrict(['admin', 'user']), updateUser)
  .delete(protect, restrict(['admin', 'user']), deletUser);

export default router;

