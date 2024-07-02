import express from 'express'; 
import { createStateController, deleteStateController, getStatesController, updateStateController } from '../controller/state.controller.js';


const router = express.Router();

router.post('/create', createStateController);
router.get('/all-states',  getStatesController);

router.put('/update',  updateStateController);
router.delete('/delete', deleteStateController);

export default router;