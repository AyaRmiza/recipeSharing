import { Request, Response } from 'express';
import { Post } from '../models/post';

// Create a post
export const createPost = async (req: Request, res: Response) => {
  const { title, description, idUser } = req.body;

  if (!title || !description || !idUser) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const post = await Post.create({ title, description, idUser });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({ include: ['user', 'comments', 'recipes'] });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a post by ID
export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id, { include: ['user', 'comments', 'recipes'] });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post by ID
export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, idUser } = req.body;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Update fields if provided
    if (title !== undefined) post.title = title;
    if (description !== undefined) post.description = description;
    if (idUser !== undefined) post.idUser = idUser;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a post by ID
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.destroy();
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
