import { Router } from 'express';
import { 
  createPost, 
  getAllPosts, 
  getPostById, 
  updatePost, 
  deletePost 
} from '../controllers/postController';

const router = Router();

// Route to create a post
router.post('/createP', createPost);

// Route to get all posts
router.get('/allP', getAllPosts);

// Route to get a specific post by ID
router.get('/getidP', getPostById);

// Route to update a post by ID
router.put('/updateP', updatePost);

// Route to delete a post by ID
router.delete('/deleteP', deletePost);

export default router;
