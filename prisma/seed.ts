import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create categories
  console.log("📁 Creating categories...");
  const scented = await prisma.category.create({
    data: {
      name: "Scented Candles",
      description: "Premium scented candles with natural fragrances",
    },
  });

  const luxury = await prisma.category.create({
    data: {
      name: "Luxury Candles",
      description: "High-end luxury candles for special occasions",
    },
  });

  const gifts = await prisma.category.create({
    data: {
      name: "Gift Sets",
      description: "Beautiful gift sets for your loved ones",
    },
  });

  // Create products
  console.log("🕯️ Creating products...");
  await prisma.product.createMany({
    data: [
      {
        name: "Lavender Bliss",
        description: "Calming lavender scent perfect for relaxation",
        price: 499,
        imageUrl: "https://via.placeholder.com/300?text=Lavender+Bliss",
        stock: 50,
        categoryId: scented.id,
      },
      {
        name: "Rose Garden Premium",
        description: "Elegant rose fragrance with premium soy wax",
        price: 699,
        imageUrl: "https://via.placeholder.com/300?text=Rose+Garden",
        stock: 30,
        categoryId: luxury.id,
      },
      {
        name: "Winter Spice Collection",
        description: "Warm spiced scent for cozy winter nights",
        price: 599,
        imageUrl: "https://via.placeholder.com/300?text=Winter+Spice",
        stock: 25,
        categoryId: scented.id,
      },
      {
        name: "Vanilla Dream",
        description: "Sweet vanilla aroma that lasts for hours",
        price: 449,
        imageUrl: "https://via.placeholder.com/300?text=Vanilla+Dream",
        stock: 40,
        categoryId: scented.id,
      },
      {
        name: "Ocean Breeze",
        description: "Fresh ocean-inspired fragrance",
        price: 549,
        imageUrl: "https://via.placeholder.com/300?text=Ocean+Breeze",
        stock: 35,
        categoryId: luxury.id,
      },
      {
        name: "Luxury Gift Bundle",
        description: "Set of 3 premium candles with gift wrapping",
        price: 1499,
        imageUrl: "https://via.placeholder.com/300?text=Gift+Bundle",
        stock: 15,
        categoryId: gifts.id,
      },
    ],
  });

  // Create test users
  console.log("👥 Creating users...");
  const hashedAdminPassword = await bcrypt.hash("admin123", 10);
  const hashedUserPassword = await bcrypt.hash("user123", 10);

  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@priyoma.com",
      password: hashedAdminPassword,
      phone: "+91 9876543210",
      role: "ADMIN",
    },
  });

  const normalUser = await prisma.user.create({
    data: {
      name: "Test User",
      email: "user@priyoma.com",
      password: hashedUserPassword,
      phone: "+91 9876543211",
      role: "USER",
    },
  });

  // Create empty carts for users
  await prisma.cart.create({ data: { userId: adminUser.id } });
  await prisma.cart.create({ data: { userId: normalUser.id } });

  console.log("✅ Database seeded successfully!");
  console.log("\n📋 Test Credentials:");
  console.log("Admin - Email: admin@priyoma.com, Password: admin123");
  console.log("User - Email: user@priyoma.com, Password: user123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
