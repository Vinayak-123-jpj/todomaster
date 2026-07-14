export const FREE_TODOS_LIMIT = 3;
export const SUBSCRIPTION_DURATION_DAYS = 30;
export const ITEMS_PER_PAGE = 10;

export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  DASHBOARD: "/dashboard",
  ADMIN_DASHBOARD: "/admin/dashboard",
  SUBSCRIBE: "/subscribe",
} as const;

export const API_ROUTES = {
  TODOS: "/api/todos",
  SUBSCRIPTION: "/api/subscription",
  ADMIN: "/api/admin",
  WEBHOOK: "/api/webhook/register",
} as const;

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Resource not found",
  INTERNAL_SERVER_ERROR: "Internal server error",
  INVALID_REQUEST: "Invalid request",
  USER_NOT_FOUND: "User not found",
  TODO_LIMIT_REACHED: `Free users can only create up to ${FREE_TODOS_LIMIT} todos. Please subscribe for more.`,
} as const;
