import asyncHandler from '../utils/asyncHandler.js';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const getCommentsByPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const postExists = await Post.findById(postId);

  if (!postExists) {
    res.status(404);
    throw new Error('Post not found');
  }

  const comments = await Comment.find({ post: postId })
    .populate('author', 'name email')
    .sort({ createdAt: -1 });

  res.json(comments);
});

export const createComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  const postExists = await Post.findById(postId);

  if (!postExists) {
    res.status(404);
    throw new Error('Post not found');
  }

  const comment = await Comment.create({
    content,
    post: postId,
    author: req.user._id,
  });

  const populatedComment = await Comment.findById(comment._id).populate(
    'author',
    'name email'
  );

  res.status(201).json(populatedComment);
});

export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  if (comment.author.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this comment');
  }

  await comment.deleteOne();

  res.json({ message: 'Comment removed' });
});