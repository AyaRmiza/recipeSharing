import { Router } from 'express';
import { 
  createRecipe, 
  getAllRecipes, 
  getRecipeById, 
  updateRecipe, 
  deleteRecipe 
} from '../controllers/recipeController';

const router = Router();

// Route to create a recipe
router.post('/createR', createRecipe);

// Route to get all recipes
router.get('/allR', getAllRecipes);

// Route to get a specific recipe by ID
router.get('/getidR', getRecipeById);

// Route to update a recipe by ID
router.put('/update', updateRecipe);

// Route to delete a recipe by ID
router.delete('/delete', deleteRecipe);

export default router;
