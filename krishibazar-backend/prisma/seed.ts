import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@x.com" },
    update: {},
    create: {
      email: "admin@x.com",
      username: "admin",
      password: "admin",
      role: Role.ADMIN,
      name: "Admin User",
      profileImage: "xhttps://i.redd.it/bcyq3rjk2w071.png",
    },
  });

  const sellerUser = await prisma.user.upsert({
    where: { email: "seller@x.com" },
    update: {},
    create: {
      email: "seller@x.com",
      username: "seller",
      password: "seller",
      role: Role.SELLER,
      name: "Seller User",
      profileImage: "https://example.com/seller.jpg",
    },
  });

  const buyerUser = await prisma.user.upsert({
    where: { email: "buyer@x.com" },
    update: {},
    create: {
      email: "buyer@x.com",
      username: "buyer",
      password: "buyer",
      role: Role.BUYER,
      name: "Buyer User",
      profileImage: "https://example.com/buyer.jpg",
    },
  });

  // Create categories
  const electronicsCategory = await prisma.category.create({
    data: {
      title: "Electronics",
      image: "https://example.com/electronics.jpg",
    },
  });

  const clothingCategory = await prisma.category.create({
    data: {
      title: "Clothing",
      image: "https://example.com/clothing.jpg",
    },
  });

  // Create products
  await prisma.product.createMany({
  data: [
    {
      title: "Smartphone",
      image: "https://example.com/smartphone.jpg",
      price: 599.99,
      categoryId: electronicsCategory.id,
      description: "A powerful smartphone",
      stock: 50,
      unit: "pcs",
    },
    {
      title: "Laptop",
      image: "https://example.com/laptop.jpg",
      price: 999.99,
      categoryId: electronicsCategory.id,
      description: "A fast and reliable laptop",
      stock: 30,
      unit: "pcs",
    },
    {
      title: "T-Shirt",
      image: "https://example.com/tshirt.jpg",
      price: 19.99,
      categoryId: clothingCategory.id,
      description: "Comfortable cotton T-Shirt",
      stock: 100,
      unit: "pcs",
    },
    {
      title: "Jeans",
      image: "https://example.com/jeans.jpg",
      price: 49.99,
      categoryId: clothingCategory.id,
      description: "Stylish denim jeans",
      stock: 80,
      unit: "pcs",
    },
  ],
});

  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });