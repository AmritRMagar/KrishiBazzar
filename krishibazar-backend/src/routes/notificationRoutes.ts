// src/routes/notifications.ts

import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Notification endpoints
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get notifications for a user
 *     tags: [Notification]
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   isRead:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.get("/", async (req: Request, res: Response) :Promise<void> => {
  const userId = parseInt(req.query.userId as string, 10);

  if (isNaN(userId)) {
    res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;