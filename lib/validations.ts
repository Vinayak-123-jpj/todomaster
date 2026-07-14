import { z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim(),
});

export const updateTodoSchema = z.object({
  completed: z.boolean().optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim()
    .optional(),
});

export const updateSubscriptionSchema = z.object({
  email: z.string().email("Invalid email address"),
  isSubscribed: z.boolean(),
});

export const adminUpdateSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  isSubscribed: z.boolean().optional(),
  todoId: z.string().optional(),
  todoCompleted: z.boolean().optional(),
  todoTitle: z.string().max(200).optional(),
});

export const deleteTodoSchema = z.object({
  todoId: z.string().min(1, "Todo ID is required"),
});

export const searchUserSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type UpdateSubscriptionInput = z.infer<typeof updateSubscriptionSchema>;
export type AdminUpdateInput = z.infer<typeof adminUpdateSchema>;
export type DeleteTodoInput = z.infer<typeof deleteTodoSchema>;
export type SearchUserInput = z.infer<typeof searchUserSchema>;
