import { Request, Response } from 'express';
import { Ingredient } from '../models/ingredient';

// Create an ingredient
export const createIngredient = async (req: Request, res: Response) => {
  const { name, quantity, unit, idRecipe } = req.body;

  if (!name || quantity === undefined || unit === undefined || idRecipe === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const ingredient = await Ingredient.create({ name, quantity, unit, idRecipe });
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get all ingredients
export const getAllIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an ingredient by ID
export const getIngredientById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an ingredient by ID
export const updateIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, quantity, unit, idRecipe } = req.body;

  try {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    // Update fields if provided
    if (name !== undefined) ingredient.name = name;
    if (quantity !== undefined) ingredient.quantity = quantity;
    if (unit !== undefined) ingredient.unit = unit;
    if (idRecipe !== undefined) ingredient.idRecipe = idRecipe;

    await ingredient.save();
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an ingredient by ID
export const deleteIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    await ingredient.destroy();
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
