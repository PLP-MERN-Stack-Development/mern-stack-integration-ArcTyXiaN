import express from 'express';
import { body } from 'express-validator';
import {
  getCommentsByPost,
  createComment,
  deleteComment,
} from '../controllers/commentController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.route('/posts/:postId/comments')
  .get(getCommentsByPost)
  .post(
    protect,
    [
      body('content').trim().notEmpty().withMessage('Comment content is required'),
      validate,
    ],
    createComment
  );

router.route('/comments/:id')
  .delete(protect, deleteComment);

export default router;