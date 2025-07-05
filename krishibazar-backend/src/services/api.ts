import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prismaclient"; 

const jwtSecret = process.env.JWT_SECRET || "default_secret_key_if_not_set";

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};


export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to perform this action" });
    }
    next();
  };
};