import { clerkClient, auth } from "@clerk/nextjs/server";
import { UnauthorizedError, ForbiddenError } from "./errors";

export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const user = await clerkClient.users.getUser(userId);
    return user.publicMetadata.role === "admin";
  } catch (error) {
    return false;
  }
}

export async function requireAdmin(): Promise<string> {
  const { userId } = auth();

  if (!userId) {
    throw new UnauthorizedError();
  }

  if (!(await isAdmin(userId))) {
    throw new ForbiddenError();
  }

  return userId;
}
