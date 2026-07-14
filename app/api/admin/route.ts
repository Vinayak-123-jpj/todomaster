import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE, SUBSCRIPTION_DURATION_DAYS } from "@/lib/constants";
import { adminUpdateSchema, deleteTodoSchema } from "@/lib/validations";
import { successResponse, handleErrorResponse } from "@/lib/response";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const page = parseInt(searchParams.get("page") || "1");

    if (!email) {
      return successResponse({ user: null, totalPages: 0, currentPage: 1 });
    }

    const [user, totalItems] = await Promise.all([
      prisma.user.findUnique({
        where: { email },
        include: {
          todos: {
            orderBy: { createdAt: "desc" },
            take: ITEMS_PER_PAGE,
            skip: (page - 1) * ITEMS_PER_PAGE,
          },
        },
      }),
      prisma.todo.count({ where: { user: { email } } }),
    ]);

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return successResponse({ user, totalPages, currentPage: page });
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    const validatedData = adminUpdateSchema.parse(body);

    if (validatedData.isSubscribed !== undefined && validatedData.email) {
      await prisma.user.update({
        where: { email: validatedData.email },
        data: {
          isSubscribed: validatedData.isSubscribed,
          subscriptionEnds: validatedData.isSubscribed
            ? new Date(Date.now() + SUBSCRIPTION_DURATION_DAYS * 24 * 60 * 60 * 1000)
            : null,
        },
      });
    }

    if (validatedData.todoId) {
      await prisma.todo.update({
        where: { id: validatedData.todoId },
        data: {
          completed: validatedData.todoCompleted,
          title: validatedData.todoTitle,
        },
      });
    }

    return successResponse({ message: "Update successful" });
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    const validatedData = deleteTodoSchema.parse(body);

    await prisma.todo.delete({
      where: { id: validatedData.todoId },
    });

    return successResponse({ message: "Todo deleted successfully" });
  } catch (error) {
    return handleErrorResponse(error);
  }
}
