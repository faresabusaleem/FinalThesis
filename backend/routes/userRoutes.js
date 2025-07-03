import express from 'express';
import { registerUser, loginUser, getMe, updateBio } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);          
router.put('/bio', protect, updateBio);     

export default router;
