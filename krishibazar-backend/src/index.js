const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('KrishiBazar backend is running!');
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const farmerOrderRoutes = require('./routes/farmerOrderRoutes');
app.use('/api/farmer/orders', farmerOrderRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
