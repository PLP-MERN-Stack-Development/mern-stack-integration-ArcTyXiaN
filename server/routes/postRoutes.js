import express from 'express';
import { body } from 'express-validator';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

const postValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required'),
  validate,
];

router.route('/')
  .get(getPosts)
  .post(protect, postValidation, createPost);

router.route('/:id')
  .get(getPostById)
  .put(protect, postValidation, updatePost)
  .delete(protect, deletePost);

export default router;