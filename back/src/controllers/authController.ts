import { Request, Response } from "express";
import { registerUser, loginUser } from "../Service/authService";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await registerUser(name, email, password);
    res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
