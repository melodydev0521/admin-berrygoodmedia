import express from 'express';
import { getAll, updateUser, getSingleUser, deleteUser, updateProfile, updatePassword } from '../controllers/userController';
import { auth, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route("/").get(auth, admin, getAll);
router.route("/:id").put(auth, admin, updateUser).get(auth, admin, getSingleUser).delete(auth, admin, deleteUser);
router.route("/update").put(auth, updateProfile);
router.route("/update/password").put(auth, updatePassword);

export default router;