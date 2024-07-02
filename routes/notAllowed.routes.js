import express from 'express'; 
import { createNotAllowedController, deleteNotAllowedController, getNotAllowedsController, updateNotAllowedController } from '../controller/notAllowed.controller.js';


const router = express.Router();

router.post('/create', createNotAllowedController);
router.get('/all-notAlloweds',  getNotAllowedsController);

router.put('/update',  updateNotAllowedController);
router.delete('/delete', deleteNotAllowedController);

export default router;