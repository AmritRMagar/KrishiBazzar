import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateJWT } from "../Middleware/auth";
const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /home:
 *   get:
 *     summary: Get Home Screen Data
 *     description: Fetches data required for the home screen including username and products.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched home screen data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: "User Name"
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Fresh Apples"
 *                       description:
 *                         type: string
 *                         example: "Crisp and juicy apples."
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 3.00
 *                       stock:
 *                         type: integer
 *                         example: 100
 *                       unit:
 *                         type: string
 *                         example: "kg"
 *                       image:
 *                         type: string
 *                         example: "https://example.com/apples.jpg"
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *       500:
 *         description: Server error.
 */

router.get("/home", authenticateJWT, async (req, res): Promise<void> =>  {
  try {
    const userId = req.user?.id;
    if (!userId) {
       res.status(401).json({ message: "Unauthorized" });
    }


    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
      },
    });

    if (!user) {
       res.status(404).json({ message: "User not found" });
       return;
    }

    // Fetch products
    const products = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        stock: true,
        unit: true,
        image: true,
      },
    });


    res.json({
      username: user.name,
      products,
    });
  } catch (error) {
    console.error("Error fetching home screen data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;