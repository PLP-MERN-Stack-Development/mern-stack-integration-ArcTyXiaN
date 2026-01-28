import asyncHandler from '../utils/asyncHandler.js';
import Post from '../models/Post.js';

export const getPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';

  const skip = (page - 1) * limit;

  let query = {};

  if (search) {
    query.$text = { $search: search };
  }

  const posts = await Post.find(query)
    .populate('author', 'name email')
    .populate('category', 'name')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments(query);

  res.json({
    posts,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

export const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'name email')
    .populate('category', 'name');

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

export const createPost = asyncHandler(async (req, res) => {
  const { title, content, category, featuredImage } = req.body;

  const post = await Post.create({
    title,
    content,
    category,
    featuredImage,
    author: req.user._id,
  });

  const populatedPost = await Post.findById(post._id)
    .populate('author', 'name email')
    .populate('category', 'name');

  res.status(201).json(populatedPost);
});

export const updatePost = asyncHandler(async (req, res) => {
  const { title, content, category, featuredImage } = req.body;

  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this post');
  }

  post.title = title || post.title;
  post.content = content || post.content;
  post.category = category || post.category;
  post.featuredImage = featuredImage !== undefined ? featuredImage : post.featuredImage;

  const updatedPost = await post.save();

  const populatedPost = await Post.findById(updatedPost._id)
    .populate('author', 'name email')
    .populate('category', 'name');

  res.json(populatedPost);
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this post');
  }

  await post.deleteOne();

  res.json({ message: 'Post removed' });
});