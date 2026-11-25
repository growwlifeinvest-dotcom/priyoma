import prisma from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/authorization";

// DELETE remove item from cart
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthenticatedSession();
    if (session instanceof Response) return session;

    const { id: cartItemId } = await params;
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cart: { userId: session.user.id },
      },
    });

    if (!cartItem) {
      return Response.json({ error: "Cart item not found" }, { status: 404 });
    }

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthenticatedSession();
    if (session instanceof Response) return session;

    const body = await req.json();
    const { quantity } = body;
    const { id } = await params;

    if (!Number.isInteger(quantity) || quantity < 1) {
      return Response.json(
        { error: "Valid quantity is required" },
        { status: 400 }
      );
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
        cart: { userId: session.user.id },
      },
    });

    if (!cartItem) {
      return Response.json({ error: "Cart item not found" }, { status: 404 });
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity },
      include: { product: true },
    });

    return Response.json(updatedCartItem);
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Failed to update cart item" },
      { status: 500 }
    );
  }
}
