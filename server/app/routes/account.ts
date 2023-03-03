import express, { Router } from 'express';
import { 
    addAccount, 
    deleteAccount, 
    editAccount, 
    getAccounts 
} from '../controllers/accountSettingController';
import { protect } from '../middlewares/authMiddleware';
const router: Router = express.Router();

router.get('/', getAccounts);
router.post('/', addAccount);
router.post('/:_id', editAccount);
router.delete('/:_id', deleteAccount);

export default router;