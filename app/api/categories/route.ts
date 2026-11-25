import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/authorization";

// GET all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return Response.json(categories);
  } catch (error) {
    console.error("Fetch categories error:", error);
    return Response.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST create category (Admin only)
export async function POST(req: Request) {
  try {
    const authorizationError = await requireAdmin();
    if (authorizationError) return authorizationError;

    const body = await req.json();
    const { name, description } = body;

    if (!name) {
      return Response.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        description: description || null,
      },
    });

    return Response.json(category, { status: 201 });
  } catch (error) {
    console.error("Create category error:", error);
    return Response.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
