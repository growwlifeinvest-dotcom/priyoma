import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV !== "production") {
    throw new Error("Set NODE_ENV=production to run the production admin seed");
  }

  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set");
  }

  if (password.length < 16) {
    throw new Error("ADMIN_PASSWORD must be at least 16 characters long");
  }

  const existingAdmin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
    select: { id: true },
  });

  if (existingAdmin) {
    throw new Error("An admin account already exists; refusing to create another");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.$transaction(async (transaction) => {
    const admin = await transaction.user.create({
      data: {
        name: "Admin",
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    await transaction.cart.create({
      data: { userId: admin.id },
    });
  });

  console.log("Initial admin account created.");
}

main()
  .catch((error) => {
    console.error("Failed to create initial admin:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
