import { Request, Response } from 'express';
import { Recipe } from '../models/recipe';


// Create a recipe
export const createRecipe = async (req: Request, res: Response) => {
  const { name, duration, description, urlImg, idIngredients, idUser } = req.body;

  if (!name || !duration || !description || !urlImg || !idUser || !idIngredients) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const recipe = await Recipe.create({ name, duration, description, urlImg,idIngredients, idUser });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all recipes
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.findAll({
      include: [
        { association: 'user' },
        // Ajouter d'autres associations ici si nécessaire
      ],
    });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a recipe by ID
export const getRecipeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findByPk(id, {
      include: [
        { association: 'user' },
        
      ],
    });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a recipe by ID
export const updateRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, duration, description, urlImg, idIngredients, idUser } = req.body;

  try {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Update fields if provided
    if (name !== undefined) recipe.name = name;
    if (duration !== undefined) recipe.duration = duration;
    if (description !== undefined) recipe.description = description;
    if (urlImg !== undefined) recipe.urlImg = urlImg;
    if (idIngredients !== undefined) recipe.idIngredients = idIngredients;
    if (idUser !== undefined) recipe.idUser = idUser;

    await recipe.save();
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a recipe by ID
export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    await recipe.destroy();
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
