import { Request, Response } from "express";
import { registerUser, loginUser } from "../Service/authService";
import { User } from '../models/user';

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

export const manageUserActivation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
      user.isActive = !user.isActive;
      await user.save();
       res.status(200).json({ message:user.isActive? 'User account activated successfully' :'User account deactivated successfully'});
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

