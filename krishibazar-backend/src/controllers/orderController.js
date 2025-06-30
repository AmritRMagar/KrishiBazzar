const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.placeOrder = async (req, res) => {
  const { productId, quantity } = req.body;
  const user = req.user;

  if (user.role !== 'CUSTOMER') {
    return res.status(403).json({ error: 'Only customers can place orders' });
  }

  try {
    const order = await prisma.order.create({
      data: {
        productId,
        customerId: user.id,
        quantity: parseInt(quantity),
      },
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCustomerOrders = async (req, res) => {
  const user = req.user;

  try {
    const orders = await prisma.order.findMany({
      where: { customerId: user.id },
      include: {
        product: {
          include: {
            farmer: { select: { name: true, email: true } }
          }
        }
      }
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
