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

  // Create the Priyoma candle collections
  console.log("📁 Creating Priyoma categories...");
  const categoryNames = [
    ["Floral Candles", "Rose, lotus, hibiscus and handcrafted flower candles"],
    ["Floating Candles", "Floral candles designed for bowls and water decorations"],
    ["Sculptural Candles", "Modern bubble, knot, spiral and geometric candles"],
    ["Luxury Candles", "Premium pillars and artistic designer candles"],
    ["Container Candles", "Glass jar, ceramic jar and tin candles"],
    ["Gel Candles", "Ocean, beach, aquarium and seashell-inspired candles"],
    ["Festival Candles", "Diya, modak, laddoo and Ganpati candles"],
    ["Decorative Candles", "Heart, shell, star, moon and butterfly candles"],
    ["Scented Candles", "Lavender, rose, vanilla, jasmine and sandalwood candles"],
    ["Tea Light & Votive", "Mini tea lights and decorative votive candles"],
    ["Gift Sets", "Curated birthday, anniversary, wedding and baby shower gifts"],
    ["Seasonal Candles", "Valentine, Christmas, New Year and Mother's Day candles"],
  ] as const;

  const categories: Record<string, { id: string }> = {};
  for (const [name, description] of categoryNames) {
    categories[name] = await prisma.category.create({ data: { name, description } });
  }

  const image = (name: string) =>
    `https://placehold.co/600x600/f3e8ff/7e22ce?text=${encodeURIComponent(name)}`;

  const product = (
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string
  ) => ({
    name,
    description,
    price,
    stock,
    imageUrl: image(name),
    categoryId: categories[category].id,
  });

  console.log("🕯️ Creating Priyoma products...");
  await prisma.product.createMany({
    data: [
      product("Rose Elegance", "A beautiful rose-shaped candle symbolizing love and beauty.", 499, 30, "Floral Candles"),
      product("Lotus Serenity", "A lotus-inspired candle representing peace and purity.", 549, 25, "Floral Candles"),
      product("Pink Hibiscus Glow", "A delicate hibiscus candle designed to brighten your space.", 449, 28, "Floral Candles"),
      product("Daisy Bloom", "A cheerful daisy candle bringing freshness and happiness.", 399, 35, "Floral Candles"),
      product("Gerbera Delight", "A handcrafted gerbera flower candle for joyful moments.", 429, 32, "Floral Candles"),
      product("Sunflower Radiance", "A sunflower-inspired candle representing warmth and positivity.", 449, 28, "Floral Candles"),
      product("Tulip Charm", "An elegant tulip candle for graceful home decoration.", 499, 22, "Floral Candles"),
      product("Blue & White Daisy Box", "A set of six handmade daisy candles in a beautiful gift box.", 899, 15, "Gift Sets"),
      product("Floating Blossom", "A floral floating candle for beautiful table settings.", 349, 40, "Floating Candles"),
      product("Rose Floating Glow", "A romantic rose floating candle for bowls and celebrations.", 399, 35, "Floating Candles"),
      product("Lotus Floating Serenity", "A peaceful lotus floating candle inspired by mindful moments.", 399, 32, "Floating Candles"),
      product("Bubble Bliss", "A modern bubble-shaped candle for stylish interiors.", 599, 24, "Sculptural Candles"),
      product("The Perfect Knot", "A beautifully knotted candle representing connection.", 649, 20, "Sculptural Candles"),
      product("Spiral Glow", "A spiral-designed candle adding artistic elegance.", 699, 18, "Sculptural Candles"),
      product("Geometric Aura", "A contemporary geometric candle for modern homes.", 749, 16, "Sculptural Candles"),
      product("Sculpted Elegance", "An artistic candle designed to stand out.", 899, 12, "Sculptural Candles"),
      product("Minimalist Pillar", "A timeless pillar candle for simple, elegant spaces.", 499, 30, "Luxury Candles"),
      product("Designer Pillar", "A premium handcrafted pillar candle for sophisticated interiors.", 799, 18, "Luxury Candles"),
      product("Ocean Breeze", "A blue ocean-inspired candle bringing coastal charm.", 549, 30, "Gel Candles"),
      product("Sea Whisper", "A seashell-themed candle inspired by peaceful beaches.", 599, 24, "Gel Candles"),
      product("Blue Lagoon", "A beautiful blue gel candle inspired by clear water.", 649, 20, "Gel Candles"),
      product("Coastal Dreams", "A beach-inspired decorative candle for nature lovers.", 699, 18, "Gel Candles"),
      product("Shell Serenity", "A seashell-shaped candle celebrating ocean beauty.", 499, 25, "Decorative Candles"),
      product("Ocean Treasure", "A decorative ocean-themed candle with shell details.", 749, 16, "Gel Candles"),
      product("Heart Glow", "A heart-shaped candle made for love-filled moments.", 449, 35, "Decorative Candles"),
      product("Forever Yours", "A romantic candle gift for someone special.", 899, 14, "Gift Sets"),
      product("Love Notes", "A thoughtful candle collection celebrating affection.", 1299, 12, "Gift Sets"),
      product("Birthday Spark", "A cheerful candle gift for birthday celebrations.", 699, 20, "Gift Sets"),
      product("Sweet Surprise", "A beautiful handmade candle gift box.", 1499, 10, "Gift Sets"),
      product("Celebration Glow", "A decorative candle collection for memorable occasions.", 1199, 12, "Gift Sets"),
      product("Modak Blessings", "A modak-inspired candle for festive celebrations.", 549, 25, "Festival Candles"),
      product("Laddoo Glow", "A traditional laddoo-shaped candle for Diwali gifting.", 549, 25, "Festival Candles"),
      product("Floral Diya", "A diya candle decorated with a beautiful wax flower.", 399, 40, "Festival Candles"),
      product("Ganpati Blessings", "A Ganpati-inspired decorative candle collection.", 799, 16, "Festival Candles"),
      product("Festive Aura", "A special candle collection for joyful celebrations.", 1299, 12, "Festival Candles"),
      product("Divine Glow", "A traditional-inspired candle representing light and positivity.", 499, 30, "Festival Candles"),
      product("Lavender Bliss", "A calming lavender scented candle for relaxing moments.", 499, 40, "Scented Candles"),
      product("Vanilla Dream", "A warm vanilla fragrance for a cozy atmosphere.", 449, 40, "Scented Candles"),
      product("Rose Garden", "A romantic floral fragrance for beautiful spaces.", 549, 32, "Scented Candles"),
      product("Winter Spice", "A warm seasonal fragrance for cozy evenings.", 599, 25, "Scented Candles"),
      product("Jasmine Glow", "A floral-inspired fragrance for peaceful surroundings.", 499, 35, "Scented Candles"),
      product("Sandalwood Serenity", "A woody fragrance-inspired candle for a calming atmosphere.", 649, 28, "Scented Candles"),
      product("Lavender Travel Tin", "A compact lavender candle for peaceful personal spaces.", 349, 45, "Container Candles"),
      product("Vanilla Ceramic Jar", "A softly scented vanilla candle in a reusable ceramic jar.", 749, 20, "Container Candles"),
      product("Calm Tea Light Set", "Mini unscented tea lights for quiet everyday moments.", 299, 60, "Tea Light & Votive"),
      product("Festival Votive Set", "Decorative votive candles for warm festive tables.", 499, 35, "Tea Light & Votive"),
      product("Valentine Romance Box", "Heart-shaped candles and roses for a romantic evening.", 1399, 12, "Seasonal Candles"),
      product("Christmas Glow Collection", "Warm seasonal candles for a joyful holiday atmosphere.", 1499, 10, "Seasonal Candles"),
      product("New Year Spark Set", "A celebratory candle gift set to welcome new beginnings.", 1199, 14, "Seasonal Candles"),
      product("Mother's Day Bloom", "A floral candle collection made to celebrate every mom.", 999, 15, "Seasonal Candles"),
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
