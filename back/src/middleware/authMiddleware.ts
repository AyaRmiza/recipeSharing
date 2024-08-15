import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ROLES } from '../helpers/constants';

// Define an interface for the JWT payload
interface UserPayload extends JwtPayload {
  role: string;
}

// Middleware to check user roles
export const authMiddleware = (roles: ROLES[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role; 

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    next();
  };
};

// Middleware to verify JWT token
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret") as UserPayload;
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
