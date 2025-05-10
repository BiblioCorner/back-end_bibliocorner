import { Router } from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const router = Router();

router.post('/signup',upload.single('user_pic'), authController.signup);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, authController.getUserProfile);
router.put('/profile-update', authMiddleware, upload.single('user_pic'), authController.updateUserProfile);

export default router;

