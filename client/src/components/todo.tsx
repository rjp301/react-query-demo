import { Collections, TodosResponse } from "@/lib/types";
import React from "react";
import { Button } from "./ui/button";
import { useMutation } from "react-query";
import { deleteTodo, updateTodoComplete } from "@/lib/api";
import { queryClient } from "@/lib/query";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Check } from "lucide-react";

interface Props {
  todo: TodosResponse;
}

const Todo: React.FC<Props> = (props) => {
  const { todo } = props;

  const completeMutation = useMutation({
    mutationFn: () => updateTodoComplete(todo.id, !todo.complete),
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Todos]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Todos]);
    },
  });

  return (
    <Card
      className={cn(
        "flex rounded-md p-2 gap-2 items-center text-sm",
        todo.complete && "bg-card/50"
      )}
    >
      <Button
        variant={todo.complete ? "secondary" : "ghost"}
        size="icon"
        onClick={() => completeMutation.mutate()}
      >
        <Check size="1rem" />
      </Button>
      <span
        className={cn(
          "flex-1",
          todo.complete && "line-through text-muted-foreground"
        )}
      >
        {todo.label}
      </span>
      <Button
        size="sm"
        variant="ghost"
        className="text-muted-foreground"
        onClick={() => deleteMutation.mutate()}
      >
        delete
      </Button>
    </Card>
  );
};

export default Todo;
