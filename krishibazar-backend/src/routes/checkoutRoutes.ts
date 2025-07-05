import express from "express";
import { Request, Response } from "express";
import prisma from "../config/prisma";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Checkout
 *   description: Checkout endpoints
 */

/**
 * @swagger
 * /checkout/place-order:
 *   post:
 *     summary: Place an order
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartItems
 *             properties:
 *               cartItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post("/place-order", async (req: Request, res: Response): Promise<void> => {
  const { cartItems } = req.body;

  // Validate cartItems
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    res.status(400).json({ message: "Invalid cart items" });
  }

  try {
    const total = cartItems.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    );

    const newOrder = await prisma.order.create({
      data: {
        items: cartItems, // Ensure the `items` field matches Prisma schema
        total,
      },
    });

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;