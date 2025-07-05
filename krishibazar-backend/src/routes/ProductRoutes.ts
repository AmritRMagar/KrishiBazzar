import { Prisma } from "@prisma/client";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import multer from "multer";
import path from "path";
import prisma from "../config/prisma";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /product/add:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - stock
 *               - unit
 *               - image
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               stock:
 *                 type: integer
 *               unit:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product successfully created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// Initialize multer
const upload = multer({ storage: storage });

// Add Product Route
router.post(
  "/add",
  upload.single("image"),
  [
    body("title").isString().withMessage("Title is required"),
    body("description").isString().withMessage("Description is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
    body("stock").isInt({ gt: 0 }).withMessage("Stock must be a positive integer"),
    body("unit").isString().withMessage("Unit is required"),
  ],
  async (req: Request, res: Response) :Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
    }

    const { title, description, price, stock, unit } = req.body;
    const image = req.file?.filename;
    if (!image) {
       res.status(400).json({ message: "Image is required" });
    }

    try {
      const newProduct = await prisma.product.create({
        data: {
          title,
          description,
          price: parseFloat(price),
          stock: parseInt(stock),
          unit,
          image,
        } as Prisma.ProductCreateInput,
      });
      res.status(201).json({ message: "Product successfully created", product: newProduct });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               stock:
 *                 type: integer
 *               unit:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Product successfully updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

// Update Product Route
router.put(
  "/:id",
  [
    body("title").optional().isString().withMessage("Title must be a string"),
    body("description").optional().isString().withMessage("Description must be a string"),
    body("price").optional().isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
    body("stock").optional().isInt({ gt: 0 }).withMessage("Stock must be a positive integer"),
    body("unit").optional().isString().withMessage("Unit must be a string"),
    body("image").optional().isString().withMessage("Image must be a string"),
  ],
  async (req: Request, res: Response) :Promise<void> =>  {
    const { id } = req.params;
    const updates = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
       
    }

    try {
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: updates as Prisma.ProductUpdateInput,
      });
      res.status(200).json({ message: "Product successfully updated", product: updatedProduct });
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      res.status(404).json({ message: "Product not found" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Product ID
 *                   title:
 *                     type: string
 *                     description: Product title
 *                   description:
 *                     type: string
 *                     description: Product description
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: Product price
 *                   stock:
 *                     type: integer
 *                     description: Available stock quantity
 *                   unit:
 *                     type: string
 *                     description: Unit of measure for the product
 *                   image:
 *                     type: string
 *                     format: uri
 *                     description: URL of the product image
 *       500:
 *         description: Internal server error
 */

// Get All Products Route
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

// Get Product by ID Route
router.get("/:id", async (req: Request, res: Response) :Promise<void> => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) {
       res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

// Delete Product Route
router.delete("/:id", async (req: Request, res: Response) :Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
       res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;