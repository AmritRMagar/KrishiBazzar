import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { Request, Response } from "express";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               username:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6, max: 10 })
      .withMessage("Password must be between 6 and 10 characters long"),
    body("username").notEmpty().withMessage("Username is required"),
    body("role").notEmpty().withMessage("Role is required"),
  ],
  async (req: Request, res: Response) :Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username, role } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
         res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          role,
        },
      });

      res
        .status(201)
        .json({ message: "Successfully registered", user: newUser });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;