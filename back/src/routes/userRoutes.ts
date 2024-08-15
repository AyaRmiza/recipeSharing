import { Router } from 'express';
import { fetchAllUsers } from '../controllers/userController';
import { ROLES } from '../helpers/constants';
import { authMiddleware } from '../middleware/authMiddleware';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

// Apply token verification middleware first
router.use(verifyToken);

// Protect the route with role-based access middleware
router.get('/users', authMiddleware([ROLES.ADMIN]), fetchAllUsers);

export default router;
