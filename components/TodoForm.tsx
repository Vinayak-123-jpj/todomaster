"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TodoFormProps {
  onSubmit: (title: string) => void;
  disabled?: boolean;
}

export function TodoForm({ onSubmit, disabled = false }: TodoFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 h-11 text-base transition-all focus:ring-2"
        required
        maxLength={200}
        disabled={disabled}
        aria-label="Todo title"
      />
      <Button 
        type="submit" 
        disabled={disabled || !title.trim()}
        className="h-11 px-6 transition-all hover:scale-105 active:scale-95"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  );
}
