import express from 'express';
import authRoutes from './auth.route.js';
import libraryRoutes from './library.route.js';
import eventRoutes from './event.route.js';
import reviewRoutes from './review.route.js';


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/library',libraryRoutes);
router.use('/event',eventRoutes);
router.use('/review',reviewRoutes);

export default router; 

