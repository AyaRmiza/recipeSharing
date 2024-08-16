import { Request, Response } from 'express';
import { Comment } from '../models/comment';

// Create a comment
export const createComment = async (req: Request, res: Response) => {
  const { content, idUser, idPost } = req.body;

  if (!content || !idUser || !idPost) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Ensure idUser and idPost are numbers
    const comment = await Comment.create({content,idUser,idPost});
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all comments
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a comment by ID
export const getCommentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a comment by ID
export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content, idUser, idPost } = req.body;

  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Update fields if provided
    if (content !== undefined) comment.content = content;
    if (idUser !== undefined) comment.idUser = parseInt(idUser, 10);
    if (idPost !== undefined) comment.idPost = parseInt(idPost, 10);

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment by ID
export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await comment.destroy();
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
