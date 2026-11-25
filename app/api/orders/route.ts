import prisma from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/authorization";
import { calculateCheckoutTotals } from "@/lib/pricing";

// POST create order
export async function POST(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (session instanceof Response) return session;

    const body = await req.json();
    const { shippingAddress } = body;

    if (!shippingAddress) {
      return Response.json(
        { error: "Shipping address is required" },
        { status: 400 }
      );
    }

    // Get user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return Response.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Calculate total
    const subtotal = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
    const { total: totalAmount } = calculateCheckoutTotals(subtotal);

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        shippingAddress,
        totalAmount,
        items: {
          createMany: {
            data: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
      },
      include: { items: { include: { product: true } } },
    });

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return Response.json(order, { status: 201 });
  } catch (error) {
    console.error("Create order error:", error);
    return Response.json({ error: "Failed to create order" }, { status: 500 });
  }
}

// GET orders for user
export async function GET() {
  try {
    const session = await getAuthenticatedSession();
    if (session instanceof Response) return session;

    const orders = await prisma.order.findMany({
      where:
        session.user.role === "ADMIN"
          ? undefined
          : { userId: session.user.id },
      include: {
        items: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error);
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
