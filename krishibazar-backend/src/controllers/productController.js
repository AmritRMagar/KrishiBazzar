const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create product (only by farmer)
exports.createProduct = async (req, res) => {
  const { name, description, price, quantity, category } = req.body;
  const user = req.user;

  if (user.role !== 'FARMER') {
    return res.status(403).json({ error: 'Only farmers can add products' });
  }

  const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category,
        image: imagePath,
        farmerId: user.id,
      },
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        farmer: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
