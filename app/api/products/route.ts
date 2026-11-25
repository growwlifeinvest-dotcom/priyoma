import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/authorization";

// GET all products
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");

    let where: any = {};

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
    });

    return Response.json(products);
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST create product (Admin only)
export async function POST(req: Request) {
  try {
    const authorizationError = await requireAdmin();
    if (authorizationError) return authorizationError;

    const body = await req.json();
    const { name, description, price, imageUrl, stock, categoryId } = body;

    if (!name || !price || !categoryId) {
      return Response.json(
        { error: "Name, price, and categoryId are required" },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return Response.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || "",
        price: parseInt(price),
        imageUrl: imageUrl || "https://via.placeholder.com/300",
        stock: stock ? parseInt(stock) : 0,
        categoryId,
      },
    });

    return Response.json(product, { status: 201 });
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
