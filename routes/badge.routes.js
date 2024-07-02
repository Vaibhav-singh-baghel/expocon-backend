import express from 'express'; 
import { createBadgeController, deleteBadgeController, getBadgesController, updateBadgeController } from '../controller/badge.controller.js';


const router = express.Router();

router.post('/create', createBadgeController);
router.get('/all-badges',  getBadgesController);

router.put('/update',  updateBadgeController);
router.delete('/delete', deleteBadgeController);

export default router;