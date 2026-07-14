import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE, SUBSCRIPTION_DURATION_DAYS } from "@/lib/constants";
import { adminUpdateSchema, deleteTodoSchema } from "@/lib/validations";
import { errorResponse, successResponse, handleErrorResponse } from "@/lib/response";
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

    const [user, totalTodos] = await Promise.all([
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
      prisma.todo.count({
        where: { user: { email } },
      }),
    ]);

    if (!user) {
      return successResponse({ user: null, totalPages: 0, currentPage: 1 });
    }

    const totalPages = Math.ceil(totalTodos / ITEMS_PER_PAGE);

    return successResponse({
      user,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    const validatedData = adminUpdateSchema.parse(body);

    if (validatedData.todoId !== undefined && validatedData.todoCompleted !== undefined) {
      const updatedTodo = await prisma.todo.update({
        where: { id: validatedData.todoId },
        data: { completed: validatedData.todoCompleted },
      });
      return successResponse(updatedTodo);
    }

    if (validatedData.isSubscribed !== undefined && validatedData.email) {
      const updatedUser = await prisma.user.update({
        where: { email: validatedData.email },
        data: {
          isSubscribed: validatedData.isSubscribed,
          subscriptionEnds: validatedData.isSubscribed
            ? new Date(Date.now() + SUBSCRIPTION_DURATION_DAYS * 24 * 60 * 60 * 1000)
            : null,
        },
      });
      return successResponse(updatedUser);
    }

    return errorResponse("Invalid request", 400);
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
