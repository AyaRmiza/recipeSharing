import { Router } from "express";
import { register, login } from "../controllers/authController";
import { manageUserActivation } from '../controllers/authController';

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.patch('/manageUser/:id', manageUserActivation);

export default router;
