import express from 'express'; 
import { createCertificateController, deleteCertificateController, getCertificatesController, updateCertificateController } from '../controller/certificate.controller.js';


const router = express.Router();

router.post('/create', createCertificateController);
router.get('/all-certificates',  getCertificatesController);

router.put('/update',  updateCertificateController);
router.delete('/delete', deleteCertificateController);

export default router;