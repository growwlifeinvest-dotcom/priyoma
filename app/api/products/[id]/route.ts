import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/authorization";

// GET product by ID
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      return Response.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error) {
    console.error("Fetch product error:", error);
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT update product (Admin only)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authorizationError = await requireAdmin();
    if (authorizationError) return authorizationError;

    const body = await req.json();
    const { name, description, price, imageUrl, stock, categoryId } = body;
    const { id } = await params;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price: parseInt(price) }),
        ...(imageUrl && { imageUrl }),
        ...(stock && { stock: parseInt(stock) }),
        ...(categoryId && { categoryId }),
      },
    });

    return Response.json(product);
  } catch (error) {
    console.error("Update product error:", error);
    return Response.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE product (Admin only)
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authorizationError = await requireAdmin();
    if (authorizationError) return authorizationError;

    const { id } = await params;
    await prisma.product.delete({
      where: { id },
    });

    return Response.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    return Response.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
