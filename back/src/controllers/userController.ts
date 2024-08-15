import { Request, Response } from 'express';
import { getAllUsers } from '../Service/userService';

export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
