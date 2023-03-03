import express from 'express';
import { registerController, loginController } from '../controllers/authController';

const router = express.Router();

router.route("/register").post(registerController);
router.route("/login").post(loginController);

export default router;