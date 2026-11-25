import type { Session } from "next-auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getAuthenticatedSession(): Promise<Session | Response> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return session;
}

export async function requireAdmin(): Promise<Response | null> {
  const session = await getAuthenticatedSession();

  if (session instanceof Response) {
    return session;
  }

  if (session.user.role !== "ADMIN") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}
