const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all orders for the logged-in farmer
exports.getFarmerOrders = async (req, res) => {
  const user = req.user;

  if (user.role !== 'FARMER') {
    return res.status(403).json({ error: 'Only farmers can access this' });
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        product: {
          farmerId: user.id
        }
      },
      include: {
        product: true,
        customer: {
          select: { name: true, email: true }
        }
      }
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status (ACCEPTED or REJECTED)
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const user = req.user;

  if (user.role !== 'FARMER') {
    return res.status(403).json({ error: 'Only farmers can update orders' });
  }

  if (!["ACCEPTED", "REJECTED"].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const order = await prisma.order.findFirst({
      where: {
        id: parseInt(orderId),
        product: {
          farmerId: user.id
        }
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found or unauthorized' });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: { status }
    });

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
