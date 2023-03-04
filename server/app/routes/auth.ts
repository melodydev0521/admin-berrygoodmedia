import express from 'express';
import { register, login, loadUser } from '../controllers/authController';
import { auth } from '../middlewares/authMiddleware';

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.get('/', auth, loadUser);

export default router;