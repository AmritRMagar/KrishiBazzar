import express from "express";
import { body, validationResult } from "express-validator";
import prisma from "../config/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "default_secret_key_if_not_set";

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Profile management endpoints
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get the user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved profile
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */
router.get("/profile", async (req: Request, res: Response) :Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Authorization token required" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, jwtSecret) as { id: number };

    const profile = await prisma.profile.findUnique({
      where: { userId: decodedToken.id },
    });

    if (!profile) {
       res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update the user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               profileImage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile successfully updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/profile",
  [
    body("name").optional().isString().withMessage("Name must be a string"),
    body("email").optional().isEmail().withMessage("Email is invalid"),
    body("phone").optional().isString().withMessage("Phone must be a string"),
    body("address")
      .optional()
      .isString()
      .withMessage("Address must be a string"),
    body("profileImage")
      .optional()
      .isString()
      .withMessage("Profile image must be a string"),
  ],
  async (req: Request, res: Response) :Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
    }

    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
         res
          .status(401)
          .json({ message: "Authorization token required" });
          return;
      }

      const token = authHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, jwtSecret) as { id: number };

      const { name, email, phone, address, profileImage } = req.body;

      const existingProfile = await prisma.profile.findUnique({
        where: { userId: decodedToken.id },
      });

      if (!existingProfile) {
         res.status(404).json({ message: "Profile not found" });
      }

      const updatedProfile = await prisma.profile.update({
        where: { userId: decodedToken.id },
        data: { name, email, phone, address, profileImage },
      });

      res.json({
        message: "Profile successfully updated",
        profile: updatedProfile,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;