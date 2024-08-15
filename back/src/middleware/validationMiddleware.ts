import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Validation des données pour l'inscription
export const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 6 characters long"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation des données pour la connexion
export const loginValidation = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
