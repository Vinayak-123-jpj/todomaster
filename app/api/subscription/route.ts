import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { SUBSCRIPTION_DURATION_DAYS, ERROR_MESSAGES } from "@/lib/constants";
import { errorResponse, successResponse, handleErrorResponse } from "@/lib/response";
import { NotFoundError } from "@/lib/errors";

export async function POST() {
  const { userId } = auth();

  if (!userId) {
    return errorResponse(ERROR_MESSAGES.UNAUTHORIZED, 401);
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const subscriptionEnds = new Date();
    subscriptionEnds.setDate(subscriptionEnds.getDate() + SUBSCRIPTION_DURATION_DAYS);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isSubscribed: true,
        subscriptionEnds,
      },
    });

    return successResponse({
      message: "Subscription successful",
      subscriptionEnds: updatedUser.subscriptionEnds,
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return errorResponse(ERROR_MESSAGES.UNAUTHORIZED, 401);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isSubscribed: true, subscriptionEnds: true },
    });

    if (!user) {
      throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const now = new Date();
    if (user.subscriptionEnds && user.subscriptionEnds < now) {
      await prisma.user.update({
        where: { id: userId },
        data: { isSubscribed: false, subscriptionEnds: null },
      });
      return successResponse({ isSubscribed: false, subscriptionEnds: null });
    }

    return successResponse({
      isSubscribed: user.isSubscribed,
      subscriptionEnds: user.subscriptionEnds,
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
}
