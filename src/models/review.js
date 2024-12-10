import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  likes_count: {
    type: Number,
    default: 0,
  },
  liked_by: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  library_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Library',
    required: true,
  },
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;