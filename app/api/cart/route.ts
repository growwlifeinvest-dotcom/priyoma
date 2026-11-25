import prisma from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/authorization";

// GET cart for user
export async function GET() {
  try {
    const session = await getAuthenticatedSession();
    if (session instanceof Response) return session;
    const userId = session.user.id;

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
  } catch (error) {
    console.error("Fetch cart error:", error);
    return Response.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}
