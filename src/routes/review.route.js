// import express from 'express';
// import authMiddleware from '../middlewares/authMiddleware.js';
// import { addComment } from '../controllers/reviewController.js';

// const router = express.Router();

// router.post('/libraries/:libraryId', authMiddleware, addComment);
// router.get('/:libraryId', getReviewsByLibrary);

// export default router;



import { Router } from 'express';
import {
  addComment,
  getReviewsByLibrary,
  deleteReview,
  updateReview,
} from '../controllers/reviewController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();


router.post('/:libraryId', authMiddleware, addComment);
router.get('/:libraryId', getReviewsByLibrary);
router.delete('/:reviewId', authMiddleware, deleteReview);
router.put('/:reviewId', authMiddleware, updateReview);

export default router;
