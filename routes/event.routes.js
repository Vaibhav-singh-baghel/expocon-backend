import express from 'express'; 
import { createEventController, deleteEventController, getBadgeController, getEventsController, getLatestBanner, updateEventController } from '../controller/event.controller.js';
import formidable from 'express-formidable';


const router = express.Router();


router.post('/create', formidable() , createEventController);
router.get('/all-events',  getEventsController);
router.get('/get-badge',  getBadgeController);
router.get('/latest-banner',  getLatestBanner);

router.put('/update/:eid', formidable(), updateEventController);
router.delete('/delete', deleteEventController);

export default router;