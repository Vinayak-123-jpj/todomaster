import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE, ERROR_MESSAGES } from "@/lib/constants";
import { createTodoSchema } from "@/lib/validations";
import { successResponse, errorResponse, handleErrorResponse } from "@/lib/response";
import { NotFoundError, ForbiddenError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return errorResponse(ERROR_MESSAGES.UNAUTHORIZED, 401);
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";

  try {
    const [todos, totalItems] = await Promise.all([
      prisma.todo.findMany({
        where: {
          userId,
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        orderBy: { createdAt: "desc" },
        take: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
      }),
      prisma.todo.count({
        where: {
          userId,
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return successResponse({
      todos,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return errorResponse(ERROR_MESSAGES.UNAUTHORIZED, 401);
  }

  try {
    const body = await req.json();
    const validatedData = createTodoSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { todos: true },
    });

    if (!user) {
      throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (!user.isSubscribed && user.todos.length >= ITEMS_PER_PAGE) {
      throw new ForbiddenError(ERROR_MESSAGES.TODO_LIMIT_REACHED);
    }

    const todo = await prisma.todo.create({
      data: { title: validatedData.title, userId },
    });

    return successResponse(todo, 201);
  } catch (error) {
    return handleErrorResponse(error);
  }
}
