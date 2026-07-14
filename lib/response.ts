import { NextResponse } from "next/server";
import { handleApiError } from "./errors";

export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status: number = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function validationErrorResponse(errors: Record<string, string[]>) {
  return NextResponse.json(
    { error: "Validation failed", details: errors },
    { status: 400 }
  );
}

export function handleErrorResponse(error: unknown) {
  const errorData = handleApiError(error);
  return NextResponse.json(
    { error: errorData.error, code: errorData.code },
    { status: errorData.status }
  );
}
