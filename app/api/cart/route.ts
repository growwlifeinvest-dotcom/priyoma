import prisma from "@/lib/prisma";

// GET cart for user
export async function GET(req: Request) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return Response.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart) {
      // Create cart if doesn't exist
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: { product: true },
          },
        },
      });
    }

    return Response.json(cart);
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
