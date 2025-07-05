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

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    prisma.user.findUnique({ where: { id: decoded.id } })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
        }

        req.user = { id: user.id, email: user.email, role: user.role };
        next();
      })
      .catch(() => {
        res.status(500).json({ message: "Server error validating user" });
      });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res
        .status(403)
        .json({ message: "You do not have permission to perform this action" });
      return;
    }
    next();
  };
};
