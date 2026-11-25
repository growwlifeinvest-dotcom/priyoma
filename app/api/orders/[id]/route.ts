import prisma from "@/lib/prisma";
import {
  getAuthenticatedSession,
  requireAdmin,
} from "@/lib/authorization";

// GET order by ID
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthenticatedSession();
    if (session instanceof Response) return session;

    const { id } = await params;
    const order = await prisma.order.findFirst({
      where: {
        id,
        ...(session.user.role === "ADMIN" ? {} : { userId: session.user.id }),
      },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      return Response.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return Response.json(order);
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Failed to fetch order" },
      { status: 500 }
    );
  }
}

// PUT update order status (Admin only)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authorizationError = await requireAdmin();
    if (authorizationError) return authorizationError;

    const body = await req.json();
    const { status, paymentStatus } = body;
    const { id } = await params;

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus }),
      },
      include: { items: { include: { product: true } } },
    });

    return Response.json(order);
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Failed to update order" },
      { status: 500 }
    );
  }
}
