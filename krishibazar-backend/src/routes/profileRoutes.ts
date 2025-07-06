import express from "express";
import { body, validationResult } from "express-validator";
import prisma from "../config/prisma";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "default_secret_key_if_not_set";

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User Profile Management
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 address:
 *                   type: string
 *                 profileImage:
 *                   type: string
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */
router.get("/profile", async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return void res.status(401).json({ message: "Authorization token required" });

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, jwtSecret) as { id: number };

    const profile = await prisma.profile.findUnique({
      where: { userId: decodedToken.id },
    });

    if (!profile) return void res.status(404).json({ message: "Profile not found" });

    res.json(profile);
  } catch (error) {
    console.error("GET /profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update current user's profile
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
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 profile:
 *                   type: object
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
    body("name").optional().isString(),
    body("email").optional().isEmail(),
    body("phone").optional().isString(),
    body("address").optional().isString(),
    body("profileImage").optional().isString(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return void res.status(400).json({ errors: errors.array() });

    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return void res.status(401).json({ message: "Authorization token required" });

      const token = authHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, jwtSecret) as { id: number };

      const { name, email, phone, address, profileImage } = req.body;

      const existingProfile = await prisma.profile.findUnique({
        where: { userId: decodedToken.id },
      });

      if (!existingProfile) return void res.status(404).json({ message: "Profile not found" });

      const updatedProfile = await prisma.profile.update({
        where: { userId: decodedToken.id },
        data: {
          name: name ?? existingProfile.name,
          email: email ?? existingProfile.email,
          phone: phone ?? existingProfile.phone,
          address: address ?? existingProfile.address,
          profileImage: profileImage ?? existingProfile.profileImage,
        },
      });

      res.json({
        message: "Profile successfully updated",
        profile: updatedProfile,
      });
    } catch (error) {
      console.error("PUT /profile error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
