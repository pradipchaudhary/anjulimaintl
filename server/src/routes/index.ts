import express from 'express';
import { getUsers, assignRole } from '../controllers/user.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { login, register } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/users', authenticate, authorize('admin'), getUsers);
router.patch('/users/:id', authenticate, authorize('admin'), assignRole);

export default router;
