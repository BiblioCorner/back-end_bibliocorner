import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { addComment } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/libraries/:libraryId', authMiddleware, addComment);

export default router;

