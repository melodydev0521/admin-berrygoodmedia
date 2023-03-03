import express, { Router } from 'express';
import { getInfuse, getPlug, getTiktok_adgroup } from '../controllers/externalApiController';
import { protect } from '../middlewares/authMiddleware';
const router: Router = express.Router();

router.get('/infuse/:start/:end', protect, getInfuse);
router.get('/plug/:start/:end/:timezone/:bearerToken', protect, getPlug);
router.get('/tiktok/:start/:end/advertiser_id', protect, getTiktok_adgroup);

export default router;