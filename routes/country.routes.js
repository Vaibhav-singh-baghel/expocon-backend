import express from 'express'; 
import { createCountryController, deleteCountryController, getCountriesController, updateCountryController } from '../controller/country.controller.js';


const router = express.Router();

router.post('/create', createCountryController);
router.get('/all-countries',  getCountriesController);

router.put('/update',  updateCountryController);
router.delete('/delete', deleteCountryController);

export default router;