import React from "react";
import { Button } from "./ui/button";
import Todo from "./todo";
import { getTodos, deleteCompletedTodos } from "@/lib/api";
import { queryClient } from "@/lib/query";
import { Collections } from "@/lib/types";
import { useQuery, useMutation } from "react-query";
import { Loader2 } from "lucide-react";

export default function TodoList(): ReturnType<React.FC> {
  const todosQuery = useQuery({
    queryKey: [Collections.Todos],
    queryFn: getTodos,
  });

  const deleteCompleteMutation = useMutation({
    mutationFn: () => deleteCompletedTodos(),
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Todos]);
    },
  });

  if (todosQuery.isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground text-sm flex">
          <Loader2 className="animate-spin mr-2 text-primary" size="1.2rem" />
          Loading...
        </p>
      </div>
    );
  }

  if (todosQuery.isSuccess && todosQuery.data?.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm">
        <p className="text-muted-foreground">No todos!</p>
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-hidden flex flex-col gap-3">
      <div className="flex flex-col gap-2 overflow-auto">
        {todosQuery.data?.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
      <Button
        variant="secondary"
        disabled={todosQuery.data?.filter((i) => i.complete).length === 0}
        onClick={() => deleteCompleteMutation.mutate()}
      >
        Delete Completed
      </Button>
    </div>
  );
}
