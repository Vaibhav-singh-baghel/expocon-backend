import express from 'express'; 
import { createHowUsController, deleteHowUsController, getHowUsesController, updateHowUsController } from '../controller/howUs.controller.js';


const router = express.Router();

router.post('/create', createHowUsController);
router.get('/all-howUs',  getHowUsesController);

router.put('/update',  updateHowUsController);
router.delete('/delete', deleteHowUsController);

export default router;