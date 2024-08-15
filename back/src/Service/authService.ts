import { User } from "../models/user";
import { cryptPassword } from "../helpers/bcryptPass";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ROLES } from "../helpers/constants"; 

// Fonction pour enregistrer un nouvel utilisateur
export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await cryptPassword(password);
  return User.create({
    name,
    email,
    password: hashedPassword,
    role: ROLES.USER,
    isActive: false,
  });
};

// Fonction pour connecter un utilisateur
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User doesn't exist");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || "your_jwt_secret",
    { expiresIn: "1h" }
  );

  return { user, token };
};
