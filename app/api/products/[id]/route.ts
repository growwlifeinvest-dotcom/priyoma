import prisma from "@/lib/prisma";

// GET product by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true },
    });

    if (!product) {
      return Response.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT update product (Admin only)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, description, price, imageUrl, stock, categoryId } = body;

    const product = await prisma.product.update({
      where: { id: params.id },
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
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE product (Admin only)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return Response.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
