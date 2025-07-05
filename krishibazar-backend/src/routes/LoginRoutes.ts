import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma"; // Import Prisma client
import { Request, Response } from "express";

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "default_secret_key_if_not_set";

// Admin credentials
const adminUsername = "admin@gmail.com";
const adminPassword = "admin123";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
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
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6, max: 10 })
      .withMessage("Password must be between 6 and 10 characters long"),
  ],
  async (req: Request, res: Response) :Promise<void> =>  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     res.status(400).json({ errors: errors.array() });
     return;
    }

    const { email, password } = req.body;

    try {
      if (email === adminUsername && password === adminPassword) {
        const token = jwt.sign(
          { email: adminUsername, role: "admin" },
          jwtSecret,
          { expiresIn: "1h" }
        );

        res.json({ message: "Successfully logged in", token });
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (!existingUser) {
         res.status(404).json({ message: "User not found" });
         return;
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password || ""
      );
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          role: existingUser.role,
          user: existingUser.username,
        },
        jwtSecret,
        { expiresIn: "1h" }
      );

      res.json({ message: "Successfully logged in", token });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;