import express from 'express';
import { body } from 'express-validator';
import {
  getCategories,
  createCategory,
} from '../controllers/categoryController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(
    protect,
    [
      body('name').trim().notEmpty().withMessage('Category name is required'),
      validate,
    ],
    createCategory
  );

export default router;