import express from 'express';
import {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
}from "../controllers/commentController"

const router = express.Router();

// Routes pour les commentaires
router.post('/createC', createComment);
router.get('/allC', getAllComments);
router.get('/byidC', getCommentById);
router.put('/updateC', updateComment);
router.delete('/deleteC', deleteComment);

export default router;
