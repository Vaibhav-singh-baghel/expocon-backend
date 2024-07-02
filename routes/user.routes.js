import express from 'express';
import { requireSignIn } from '../middleware/authMiddleware.js';
import { deleteUserController, getUserByToken, loginController, registerController, updateUserController } from '../controller/user.controller.js';

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);

router.put('/update', requireSignIn,  updateUserController);
router.delete('/delete', requireSignIn, deleteUserController);



// middleware 
router.get('/user-auth', requireSignIn, getUserByToken);

export default router;