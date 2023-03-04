import express, { Router } from 'express';
import { getInfuse, getPlug, getTiktok_adgroup } from '../controllers/externalApiController';
import { auth } from '../middlewares/authMiddleware';
const router: Router = express.Router();

router.get('/infuse/:start/:end', auth, getInfuse);
router.get('/plug/:start/:end/:timezone/:bearerToken', auth, getPlug);
router.get('/tiktok/:start/:end/advertiser_id', auth, getTiktok_adgroup);

export default router;