import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { ERROR_MESSAGES } from "@/lib/constants";
import { updateTodoSchema } from "@/lib/validations";
import { errorResponse, successResponse, handleErrorResponse } from "@/lib/response";
import { NotFoundError, ForbiddenError } from "@/lib/errors";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();

  if (!userId) {
    return errorResponse(ERROR_MESSAGES.UNAUTHORIZED, 401);
  }

  try {
    const body = await req.json();
    const validatedData = updateTodoSchema.parse(body);
    const todoId = params.id;

    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      throw new NotFoundError("Todo not found");
    }

    if (todo.userId !== userId) {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: validatedData,
    });

    return successResponse(updatedTodo);
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();

  if (!userId) {
    return errorResponse(ERROR_MESSAGES.UNAUTHORIZED, 401);
  }

  try {
    const todoId = params.id;

    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      throw new NotFoundError("Todo not found");
    }

    if (todo.userId !== userId) {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    await prisma.todo.delete({
      where: { id: todoId },
    });

    return successResponse({ message: "Todo deleted successfully" });
  } catch (error) {
    return handleErrorResponse(error);
  }
}
