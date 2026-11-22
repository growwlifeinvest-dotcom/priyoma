import prisma from "@/lib/prisma";

// DELETE remove item from cart
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cartItemId = params.id;

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return Response.json({ message: "Item removed from cart" });
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}

// PUT update cart item quantity
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { quantity } = body;

    if (!quantity || quantity < 1) {
      return Response.json(
        { error: "Valid quantity is required" },
        { status: 400 }
      );
    }

    const cartItem = await prisma.cartItem.update({
      where: { id: params.id },
      data: { quantity },
      include: { product: true },
    });

    return Response.json(cartItem);
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Failed to update cart item" },
      { status: 500 }
    );
  }
}
