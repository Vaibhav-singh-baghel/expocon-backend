import express from 'express'; 
import { createScanController, deleteScanController, getMultiScansController, getScansController, getSingleScansController, updateScanController } from '../controller/scan.controller.js';

const router = express.Router();

router.post('/create', createScanController);
router.get('/all-scans',  getScansController);
router.get('/single-scans',  getSingleScansController);
router.get('/multi-scans',  getMultiScansController);

router.put('/update',  updateScanController);
router.delete('/delete', deleteScanController);

export default router;