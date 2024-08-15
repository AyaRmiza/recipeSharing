import { User } from '../models/user';

export const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      where: {
        role: 'user',
      },
      attributes: { exclude: ['password'] },
    });

    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};
