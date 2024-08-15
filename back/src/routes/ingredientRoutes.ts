import { Router } from 'express';
import { 
  createIngredient, 
  getAllIngredients, 
  getIngredientById, 
  updateIngredient, 
  deleteIngredient 
} from '../controllers/ingredientController';

const router = Router();

// Route to create an ingredient
router.post('/createI', createIngredient);

// Route to get all ingredients
router.get('/allI', getAllIngredients);

// Route to get a specific ingredient by ID
router.get('/getidI', getIngredientById);

// Route to update an ingredient by ID
router.put('/updateI', updateIngredient);

// Route to delete an ingredient by ID
router.delete('/deleteI', deleteIngredient);

export default router;
