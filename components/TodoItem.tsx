"use client";

import { useState } from "react";
import { Todo } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TodoItemProps {
  todo: Todo;
  isAdmin?: boolean;
  onUpdate: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
}

export function TodoItem({
  todo,
  isAdmin = false,
  onUpdate,
  onDelete,
  disabled = false,
}: TodoItemProps) {
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const toggleComplete = async () => {
    const newCompletedState = !isCompleted;
    setIsCompleted(newCompletedState);
    onUpdate(todo.id, newCompletedState);
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-border/50">
      <CardContent className="flex items-center gap-4 p-4">
        <button
          onClick={toggleComplete}
          disabled={disabled}
          className={`flex-shrink-0 transition-all duration-200 ${
            isCompleted 
              ? "text-primary hover:text-primary/80" 
              : "text-muted-foreground hover:text-primary"
          }`}
          aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
        >
          {isCompleted ? (
            <CheckCircle2 className="h-6 w-6" />
          ) : (
            <Circle className="h-6 w-6" />
          )}
        </button>
        <span 
          className={`flex-1 text-base transition-all duration-200 ${
            isCompleted 
              ? "line-through text-muted-foreground" 
              : "text-foreground"
          }`}
          aria-label={`Todo: ${todo.title}`}
        >
          {todo.title}
        </span>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(todo.id)}
            disabled={disabled}
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            aria-label="Delete todo"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        {isAdmin && (
          <span className="text-xs text-muted-foreground/70 font-mono" aria-label={`User ID: ${todo.userId}`}>
            {todo.userId.slice(0, 8)}...
          </span>
        )}
      </CardContent>
    </Card>
  );
}
