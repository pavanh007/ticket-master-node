import { Router } from 'express';
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deletUser,
} from '../controllers/userController.js';

const router = Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deletUser);

export default router;
