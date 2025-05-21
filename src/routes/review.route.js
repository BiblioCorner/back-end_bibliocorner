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
import authenticate from '../middleware/authenticate.js';

const router = Router();


router.post('/:libraryId', authenticate, addComment);
router.get('/:libraryId', getReviewsByLibrary);
router.delete('/:reviewId', authenticate, deleteReview);
router.put('/:reviewId', authenticate, updateReview);

export default router;
