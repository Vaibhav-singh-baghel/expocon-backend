import express from 'express'; 
import { createAttendeeController, deleteAttendeeController, getAttendeeController, isAttendeeAllowed, updateAttendeeController} from '../controller/attendee.controller.js';


const router = express.Router();

router.post('/create', createAttendeeController);
router.post('/all-attendee',  getAttendeeController);
router.put('/update',  updateAttendeeController);
router.delete('/delete', deleteAttendeeController);

router.post('/is-allowed',  isAttendeeAllowed);


export default router;