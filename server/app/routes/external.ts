import express, { Router } from 'express';
import { getInfuse, getPlug, getTiktok_adgroup } from '../controllers/externalApiController';
const router: Router = express.Router();

router.get('/infuse/:start/:end', getInfuse);
router.get('/plug/:start/:end/:timezone/:bearerToken', getPlug);
router.get('/tiktok/:start/:end/advertiser_id', getTiktok_adgroup);

export default router;