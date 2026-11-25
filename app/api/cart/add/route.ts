import prisma from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/authorization";

// POST add item to cart
export async function POST(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (session instanceof Response) return session;

    const body = await req.json();
    const { productId, quantity } = body;

    if (!productId || !Number.isInteger(quantity) || quantity < 1) {
      return Response.json(
        { error: "Product ID and a valid quantity are required" },
        { status: 400 }
      );
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: session.user.id },
      });
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return Response.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Check if item already in cart
    let cartItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (cartItem) {
      // Update quantity
      cartItem = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity },
        include: { product: true },
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
        include: { product: true },
      });
    }

    return Response.json(cartItem, { status: 201 });
  } catch (error) {
    console.error("Add cart item error:", error);
    return Response.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}
