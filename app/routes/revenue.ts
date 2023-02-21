import express, { Router } from 'express';
import { 
    addRevenue, 
    getRevenueList, 
    getRevenues, 
    removeAllRevenue, 
    removeRevenue 
} from '../controllers/revenueController';

const router: Router = express.Router();

router.get('/list', getRevenueList);
router.get('/', getRevenues);
router.post('/', addRevenue);
router.delete('/all', removeAllRevenue);
router.delete('/:_id', removeRevenue);

export default router;