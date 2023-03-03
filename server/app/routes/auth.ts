import express from 'express';
import { registerController, loginController } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.get('/', protect, async (req, res) => {
    // try {
    //   const user = await User.findById(req.user.id).select('-password');
    //   res.json(user);
    // } catch (err) {
    //   console.error(err.message);
    //   res.status(500).send('Server Error');
    // }
});

export default router;