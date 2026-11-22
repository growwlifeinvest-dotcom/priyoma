import prisma from "@/lib/prisma";

// POST create order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, shippingAddress } = body;

    if (!userId || !shippingAddress) {
      return Response.json(
        { error: "userId and shippingAddress are required" },
        { status: 400 }
      );
    }

    // Get user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
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
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
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
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}

// GET orders for user
export async function GET(req: Request) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return Response.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(orders);
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
